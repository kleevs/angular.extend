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
    let ComponentProvider = class ComponentProvider {
        constructor(componentFactoryResolver, injector) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.injector = injector;
        }
        create(component) {
            const componentRef = this.componentFactoryResolver
                .resolveComponentFactory(component)
                .create(this.injector);
            componentRef.instance.__ref__ = componentRef;
            return componentRef.instance;
        }
    };
    ComponentProvider = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof core_1.ComponentFactoryResolver !== "undefined" && core_1.ComponentFactoryResolver) === "function" && _a || Object, typeof (_b = typeof core_1.Injector !== "undefined" && core_1.Injector) === "function" && _b || Object])
    ], ComponentProvider);
    exports.ComponentProvider = ComponentProvider;
    var _a, _b;
});
//# sourceMappingURL=component.provider.js.map