CREATE TABLE business_form_fields (
    id UUID PRIMARY KEY,
    business_id UUID REFERENCES businesses(id),
    form_field_id INTEGER REFERENCES form_fields(id),
    is_enabled BOOLEAN DEFAULT false
);
