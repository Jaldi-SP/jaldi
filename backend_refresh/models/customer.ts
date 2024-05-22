import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class Customer {
    @jsonMember
    id: string;

    @jsonMember
    first_name: string;

    @jsonMember
    last_name: string;

    @jsonMember
    phone_number: string;

    @jsonMember
    status: string;

    @jsonMember
    business_id: string;

    constructor(
        id: string,
        first_name: string,
        last_name: string,
        phone_number: string,
        status: string,
        business_id: string
    ) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.status = status;
        this.business_id = business_id;
    }
}
