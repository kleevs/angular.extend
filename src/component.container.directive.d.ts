import { ViewContainerRef } from "@angular/core";
export declare class ComponentContainerDirective {
    private viewContainerRef;
    private last;
    content: any;
    constructor(viewContainerRef: ViewContainerRef);
    change(content: any): void;
}
