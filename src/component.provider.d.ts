import { Injector, Type, ComponentFactoryResolver } from '@angular/core';
export declare class ComponentProvider {
    private componentFactoryResolver;
    private injector;
    constructor(componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    create<T>(component: Type<T> & {
        prototype: T;
    }): T;
}
