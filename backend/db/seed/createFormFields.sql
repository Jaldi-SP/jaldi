CREATE TABLE form_fields (
    id SERIAL PRIMARY KEY,
    field_name VARCHAR(255) NOT NULL,
    field_label VARCHAR(255),
    field_type VARCHAR(50),
    is_required BOOLEAN,
    field_order INTEGER
);