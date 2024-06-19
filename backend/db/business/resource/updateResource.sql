UPDATE resources 
SET name = $1, description = $2 
WHERE id = $3 AND business_id = $4 
RETURNING *;
