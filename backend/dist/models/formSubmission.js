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
exports.FormSubmission = void 0;
const typedjson_1 = require("typedjson");
let FormSubmission = class FormSubmission {
    constructor(id, business_id, customer_id, form_data, created_at) {
        this.id = id;
        this.business_id = business_id;
        this.customer_id = customer_id;
        this.form_data = form_data;
        this.created_at = created_at;
    }
};
exports.FormSubmission = FormSubmission;
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], FormSubmission.prototype, "id", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], FormSubmission.prototype, "business_id", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], FormSubmission.prototype, "customer_id", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(Object),
    __metadata("design:type", Object)
], FormSubmission.prototype, "form_data", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], FormSubmission.prototype, "created_at", void 0);
exports.FormSubmission = FormSubmission = __decorate([
    typedjson_1.jsonObject,
    __metadata("design:paramtypes", [String, String, String, Object, String])
], FormSubmission);
