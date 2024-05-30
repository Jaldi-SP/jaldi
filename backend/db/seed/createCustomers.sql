CREATE TABLE customers (
    id UUID PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    phone_number TEXT NOT NULL,
    status VARCHAR NOT NULL,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE ON UPDATE CASCADE
)