import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class Service {
    @jsonMember(String)
    id: string;

    @jsonMember(String)
    name: string;

    @jsonMember(String)
    description: string;

    @jsonMember(Number)
    duration: number;

    @jsonMember(String)
    business_id: string;

    constructor(
        id: string,
        name: string,
        description: string,
        duration: number,
        business_id: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.business_id = business_id;
    }
}
