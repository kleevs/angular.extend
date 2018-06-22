import { Directive, ViewContainerRef, Input, EmbeddedViewRef, ComponentRef } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Directive({
    selector: '[module-container]',
})
export class ModuleContainerDirective {
    private last = [];
    @Input('module-container') set content(value: any) { this.change(value); };

    constructor(private viewContainerRef: ViewContainerRef) {}

    change(content: any){
        var array = content instanceof Array && content || [content];
        this.last.forEach((view) => {});

        this.viewContainerRef.element.nativeElement.innerHTML = '';
        this.last = array.filter(_ => !!_)
        .map((view) => {
            var selector = view.__annotations__
                .map(annotation => annotation.bootstrap).filter(_ => _).reduce((a, b) => a.concat(b))
                .map(bootstrap => bootstrap.__annotations__).filter(_ => _).reduce((a, b) => a.concat(b))
                .map(a => a.selector).filter(_ => _)[0];
            this.viewContainerRef.element.nativeElement.innerHTML += `<${selector}></${selector}>`;
            return view;
        }).map((view) => {
            platformBrowserDynamic().bootstrapModule(view);
        }).filter(_ => !!_);
    }
}