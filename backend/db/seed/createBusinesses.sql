create table businesses(
    id uuid primary key,
    name varchar not null,
    username varchar not null unique,
    password varchar not null,
    phone_number text unique,
    email text unique
)