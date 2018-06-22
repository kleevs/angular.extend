import { Component, NgModule, Type, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

export function View<T>(options: {
  template?: string,
  html?: string,
  imports?: Array<Type<any> | ModuleWithProviders | any[]>;
  declarations?: Array<Type<any> | any[]>;
}) { 
  var selector = `selector-view-${Math.random() * 1000}${(new Date()).getTime()}`;

  return (constructor: Function & { prototype: T }) => {
    var bootstrap: any = Component({
      selector: selector,
      template: options.template,
      templateUrl: options.html,
      styles: ['']
    })(constructor) || constructor;
    NgModule({
      imports: [BrowserModule],
      declarations: options.declarations,
      bootstrap: [bootstrap],
    })(bootstrap)

    return bootstrap;
  }
}