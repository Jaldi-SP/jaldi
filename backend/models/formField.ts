import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class FormField {
    @jsonMember(String)
    id: string;

    @jsonMember(String)
    business_id: string;

    @jsonMember(String)
    field_name: string;

    @jsonMember(String)
    field_label: string;

    @jsonMember(String)
    field_type: string;

    @jsonMember(Boolean)
    is_required: boolean;

    @jsonMember(Boolean)
    is_enabled: boolean;

    @jsonMember(Number)
    field_order: number;

    constructor(
        id: string,
        business_id: string,
        field_name: string,
        field_label: string,
        field_type: string,
        is_required: boolean,
        is_enabled: boolean,
        field_order: number
    ) {
        this.id = id;
        this.business_id = business_id;
        this.field_name = field_name;
        this.field_label = field_label;
        this.field_type = field_type;
        this.is_required = is_required;
        this.is_enabled = is_enabled;
        this.field_order = field_order;
    }
}
