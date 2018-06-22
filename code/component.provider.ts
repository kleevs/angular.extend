import {
    Injectable,
    Injector,
    Type,
    ComponentFactoryResolver
} from '@angular/core';

@Injectable()
export class ComponentProvider {
  
  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private injector: Injector
  ) { }
  
  create<T>(component: Type<T> & { prototype: T }): T {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory<T>(component)
      .create(this.injector);
    
    (<any>componentRef.instance).__ref__ = componentRef;
    return componentRef.instance;
  }
}