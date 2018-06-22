import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { ComponentContainerDirective } from "./component.container.directive";
import { ModuleContainerDirective } from "./module.container.directive";
import { ComponentProvider } from './component.provider';

@NgModule({
    declarations: [ComponentContainerDirective, ModuleContainerDirective],
    exports: [ComponentContainerDirective, ModuleContainerDirective],
	providers: [ComponentProvider]
})
export class ExtendModule {
}
