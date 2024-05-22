import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class Customer {
    @jsonMember(String)
    id: string;

    @jsonMember(String)
    first_name: string;

    @jsonMember(String)
    last_name: string;

    @jsonMember(String)
    phone_number: string;

    @jsonMember(String)
    status: string;

    @jsonMember(String)
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
