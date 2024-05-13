create table businesses(
    id serial primary key,
    name varchar not null,
    username varchar not null unique,
    password varchar not null
)

create table customers(
    id serial primary key,
    first_name varchar not null,
    last_name varchar not null,
    phone_number varchar not null,
    status varchar not null,
    business_id integer references businesses(id)
)