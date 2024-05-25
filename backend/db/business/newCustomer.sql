INSERT INTO customers (id, first_name, last_name, phone_number, status, business_id)
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;