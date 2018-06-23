import { 
    Component, ElementRef, NgModule, Type, ModuleWithProviders, 
    Injectable, ComponentFactoryResolver, Injector, Directive, EventEmitter,
    ViewContainerRef, ComponentRef, Input, Output, SchemaMetadata, Provider } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { parseDate, toStringDate } from '../date';

  
  @Directive({
    selector: '[myDate]',
  })
  export class DateDirective {
    private last = [];
    @Input('myDate') set setDate(value: Date) { this.set(value); };
    @Output('myDateChange') 
    change: EventEmitter<number> = new EventEmitter<number>();

  
    constructor(private elementRef: ElementRef) {
        (<Element>this.elementRef.nativeElement).addEventListener('change', () => {
            var str = this.elementRef.nativeElement.value;
            try {
                str = parseDate(str);
            } catch (e) {}
            this.change.emit(str || ''); 
        });
    }

    set(value: Date) { 
        try {
            this.elementRef.nativeElement.value = toStringDate(value);
        } catch (e) {
            this.elementRef.nativeElement.value = value || '';
        }
    }
  }