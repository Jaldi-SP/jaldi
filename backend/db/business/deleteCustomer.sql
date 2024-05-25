DELETE FROM customers WHERE id = $1 AND business_id = $2 RETURNING *;
