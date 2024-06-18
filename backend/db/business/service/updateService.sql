UPDATE services 
SET name = $1, description = $2, duration = $3
WHERE id = $4 AND business_id = $5
RETURNING *;
