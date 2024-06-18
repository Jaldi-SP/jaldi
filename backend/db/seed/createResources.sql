CREATE TABLE resources (
    id UUID PRIMARY KEY,
    business_id UUID REFERENCES businesses(id) ON DELETE CASCADE ON UPDATE CASCADE,
    resource_name VARCHAR(255) NOT NULL,
    resource_description TEXT
);
