INSERT INTO business_form_fields (id, business_id, form_field_id) 
VALUES ($1, $2, $3) 
ON CONFLICT DO NOTHING;
