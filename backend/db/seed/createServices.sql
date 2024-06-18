CREATE TABLE services (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE ON UPDATE CASCADE
);
