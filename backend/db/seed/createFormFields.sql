CREATE TABLE form_fields (
    id SERIAL PRIMARY KEY,
    business_id UUID REFERENCES businesses(id),
    field_name VARCHAR(255) NOT NULL,
    field_label VARCHAR(255),
    field_type VARCHAR(50),
    is_required BOOLEAN,
    is_enabled BOOLEAN,
    field_order INTEGER
);