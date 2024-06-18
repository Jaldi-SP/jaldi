INSERT INTO services (id, business_id, name, description, duration)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;
