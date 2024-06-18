CREATE TABLE business_form_fields (
    id UUID PRIMARY KEY,
    business_id UUID REFERENCES businesses(id) NOT NULL,
    form_field_id INTEGER REFERENCES form_fields(id) NOT NULL,
);
