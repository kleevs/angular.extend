import { 
  Component, NgModule, Type, ModuleWithProviders, 
  Injectable, ComponentFactoryResolver, Injector, Directive,
  ViewContainerRef, ComponentRef, Input, SchemaMetadata, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

let registeredView: { component: any; key: any }[] = [];

export function View<T>(options: {
  template?: string,
  html?: string,
  imports?: Array<Type<any> | ModuleWithProviders | any[]>;
  declarations?: Array<Type<any> | any[]>;
}) { 
  return (constructor: Function & { prototype: T }) => {
    var bootstrap: any = Component({
      template: options.template,
      templateUrl: options.html,
      styles: ['']
    })(constructor) || constructor;

    var key = bootstrap;
		while (key && key.constructor !== key) {
			registeredView.unshift({
        key: key,
        component: bootstrap
      });
		  key = Object.getPrototypeOf(key);
		}

    return bootstrap;
  }
}

@Injectable()
export class ViewProvider {
  
  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private injector: Injector
  ) { }
  
  create<T>(type: Function & { prototype: T }): T {
    var component = registeredView.filter(item => item.key === type).map(item => item.component)[0];
    if (component) {
      const componentRef = this.componentFactoryResolver
        .resolveComponentFactory<T>(component)
        .create(this.injector);
      
      (<any>componentRef.instance).__ref__ = componentRef;
      return componentRef.instance;
    }
  }
}

@Directive({
  selector: '[view]',
})
export class ViewContainerDirective {
  private last = [];
  @Input('view') set content(value: any) { this.change(value); };

  constructor(private viewContainerRef: ViewContainerRef) {}

  change(content: any){
      var array = content instanceof Array && content || [content];
      this.last.forEach((view) => {
          var componentRef = <ComponentRef<any>>view.__ref__;
          this.viewContainerRef.remove(this.viewContainerRef.indexOf(componentRef.hostView));
      });

      this.last = array.map((view) => {
          if (view && view.__ref__) {
              var componentRef = <ComponentRef<any>>view.__ref__;
              this.viewContainerRef.insert(componentRef.hostView);
              return view;
          }
      }).filter(_ => !!_);
  }
}



export function bootstrap<M>(selector: string, module: Type<M>) {
  @Component({
    selector: selector,
    template: '<app [view]=root></app>'
  })
  class MainComponent {
    root: any;
    constructor() {

    }
  }

  @NgModule({
    declarations: [ViewContainerDirective],
    exports: [ViewContainerDirective],
    providers: [ViewProvider],
    bootstrap: [MainComponent]
  })
  class ViewModule {
  }
}

export function ViewModule(options: {
    providers?: Provider[];
    declarations?: Array<Type<any> | any[]>;
    imports?: Array<Type<any> | ModuleWithProviders | any[]>;
    exports?: Array<Type<any> | any[]>;
    entryComponents?: Array<Type<any> | any[]>;
    bootstrap?: Array<Type<any> | any[]>;
    schemas?: Array<SchemaMetadata | any[]>;
    id?: string;
}) { 
  return (constructor: Function) => {
    var views = registeredView.map(_ => _.component).filter((value, index, self) => self.indexOf(value) === index);
    var entryComponents = options.entryComponents || [];
    var declarations = options.declarations || [];
    var providers = options.providers || [];
    entryComponents = entryComponents.concat(views);
    declarations = declarations.concat([ViewContainerDirective]).concat(views);
    providers = providers.concat([ViewProvider]);
    return NgModule({
      providers: providers,
      declarations: declarations,
      imports: options.imports,
      exports: options.exports,
      entryComponents: entryComponents,
      bootstrap: options.bootstrap,
      schemas: options.schemas,
      id: options.id,
    })(constructor);
  }
}