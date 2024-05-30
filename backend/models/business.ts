import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export class Business {
    @jsonMember(String)
    id: string;

    @jsonMember(String)
    name: string;

    @jsonMember(String)
    username: string;

    @jsonMember(String)
    password: string;

    @jsonMember(String)
    phone_number?: string;

    @jsonMember(String)
    email?: string;

    constructor(id: string, name: string, username: string, password: string, phone_number?: string, email?: string) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.phone_number = phone_number;
        this.email = email;
    }
}
