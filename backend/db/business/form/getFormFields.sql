SELECT 
    ff.id,
    ff.field_name,
    ff.field_label,
    ff.field_type,
    ff.is_required,
    ff.field_order,
    CASE WHEN bff.form_field_id IS NOT NULL THEN TRUE ELSE FALSE END AS is_enabled
FROM 
    form_fields ff
LEFT JOIN 
    business_form_fields bff 
ON 
    ff.id = bff.form_field_id 
AND 
    bff.business_id = $1;
