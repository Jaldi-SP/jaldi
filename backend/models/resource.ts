import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class Resource {
    @jsonMember(String)
    id: string;

    @jsonMember(String)
    name: string;

    @jsonMember(String)
    description: string;

    @jsonMember(String)
    business_id: string;

    constructor(
        id: string,
        name: string,
        description: string,
        business_id: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.business_id = business_id;
    }
}
