import { Directive, ViewContainerRef, Input, EmbeddedViewRef, ComponentRef } from "@angular/core";

@Directive({
    selector: '[component-container]',
})
export class ComponentContainerDirective {
    private last = [];
    @Input('component-container') set content(value: any) { this.change(value); };

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