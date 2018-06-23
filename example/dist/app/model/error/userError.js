"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var businessError_1 = require("../../../tools/error/businessError");
var UserError = /** @class */ (function (_super) {
    __extends(UserError, _super);
    function UserError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserError;
}(businessError_1.BusinessError));
exports.UserError = UserError;
//# sourceMappingURL=userError.js.map