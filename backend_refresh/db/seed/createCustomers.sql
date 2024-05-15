create table customers(
    id uuid primary key,
    first_name varchar not null,
    last_name varchar not null,
    phone_number varchar not null,
    status varchar not null,
    business_id uuid references businesses(id)
)