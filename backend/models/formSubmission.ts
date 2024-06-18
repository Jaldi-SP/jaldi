import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class FormSubmission {
    @jsonMember(String)
    id: string;

    @jsonMember(String)
    business_id: string;

    @jsonMember(String)
    customer_id: string;

    @jsonMember(Object)
    form_data: object;

    @jsonMember(String)
    created_at: string;

    constructor(
        id: string,
        business_id: string,
        customer_id: string,
        form_data: object,
        created_at: string
    ) {
        this.id = id;
        this.business_id = business_id;
        this.customer_id = customer_id;
        this.form_data = form_data;
        this.created_at = created_at;
    }
}
