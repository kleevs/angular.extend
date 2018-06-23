import { 
    Component, ElementRef, NgModule, Type, ModuleWithProviders, 
    Injectable, ComponentFactoryResolver, Injector, Directive, EventEmitter,
    ViewContainerRef, ComponentRef, Input, Output, SchemaMetadata, Provider } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { parseDate, toStringDate } from '../date';

  
  @Directive({
    selector: '[myHref]',
  })
  export class HrefDirective {
    private last = [];
    @Input('myHref') set content(value: Date) { this.set(value); };
  
    constructor(private elementRef: ElementRef) {
    }

    set(value: Date) { 
        this.elementRef.nativeElement.href = value;
    }
  }