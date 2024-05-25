UPDATE customers
SET first_name = $2, last_name = $3, phone_number = $4, status = $5
WHERE id = $1 AND business_id = $6
RETURNING *;
