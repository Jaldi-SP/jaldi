import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class Business {
    @jsonMember
    id: string;

    @jsonMember
    name: string;

    @jsonMember
    username: string;

    @jsonMember
    password: string;

    @jsonMember
    phone_number?: string;

    constructor(
        id: string,
        name: string,
        username: string,
        password: string,
        phone_number?: string
    ) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.phone_number = phone_number;
    }
}
