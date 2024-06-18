DELETE FROM services 
WHERE id = $1 AND business_id = $2 
RETURNING *;
