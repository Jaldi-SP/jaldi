"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const typedjson_1 = require("typedjson");
let Customer = class Customer {
    constructor(id, first_name, last_name, phone_number, status, business_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.status = status;
        this.business_id = business_id;
    }
};
exports.Customer = Customer;
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], Customer.prototype, "id", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], Customer.prototype, "first_name", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], Customer.prototype, "last_name", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], Customer.prototype, "phone_number", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], Customer.prototype, "status", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], Customer.prototype, "business_id", void 0);
exports.Customer = Customer = __decorate([
    typedjson_1.jsonObject,
    __metadata("design:paramtypes", [String, String, String, String, String, String])
], Customer);
