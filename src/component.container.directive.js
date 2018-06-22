var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const core_1 = require("@angular/core");
    let ComponentContainerDirective = class ComponentContainerDirective {
        constructor(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
            this.last = [];
        }
        set content(value) { this.change(value); }
        ;
        change(content) {
            var array = content instanceof Array && content || [content];
            this.last.forEach((view) => {
                var componentRef = view.__ref__;
                this.viewContainerRef.remove(this.viewContainerRef.indexOf(componentRef.hostView));
            });
            this.last = array.map((view) => {
                if (view && view.__ref__) {
                    var componentRef = view.__ref__;
                    this.viewContainerRef.insert(componentRef.hostView);
                    return view;
                }
            }).filter(_ => !!_);
        }
    };
    __decorate([
        core_1.Input('component-container'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ComponentContainerDirective.prototype, "content", null);
    ComponentContainerDirective = __decorate([
        core_1.Directive({
            selector: '[component-container]',
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _a || Object])
    ], ComponentContainerDirective);
    exports.ComponentContainerDirective = ComponentContainerDirective;
    var _a;
});
//# sourceMappingURL=component.container.directive.js.map