DELETE FROM business_form_fields 
WHERE business_id = $1 AND form_field_id = $2;
