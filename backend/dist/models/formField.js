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
exports.FormField = void 0;
const typedjson_1 = require("typedjson");
let FormField = class FormField {
    constructor(id, business_id, field_name, field_label, field_type, is_required, is_enabled, field_order) {
        this.id = id;
        this.business_id = business_id;
        this.field_name = field_name;
        this.field_label = field_label;
        this.field_type = field_type;
        this.is_required = is_required;
        this.is_enabled = is_enabled;
        this.field_order = field_order;
    }
};
exports.FormField = FormField;
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], FormField.prototype, "id", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], FormField.prototype, "business_id", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], FormField.prototype, "field_name", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], FormField.prototype, "field_label", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(String),
    __metadata("design:type", String)
], FormField.prototype, "field_type", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(Boolean),
    __metadata("design:type", Boolean)
], FormField.prototype, "is_required", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(Boolean),
    __metadata("design:type", Boolean)
], FormField.prototype, "is_enabled", void 0);
__decorate([
    (0, typedjson_1.jsonMember)(Number),
    __metadata("design:type", Number)
], FormField.prototype, "field_order", void 0);
exports.FormField = FormField = __decorate([
    typedjson_1.jsonObject,
    __metadata("design:paramtypes", [String, String, String, String, String, Boolean, Boolean, Number])
], FormField);
