INSERT INTO resources (id, business_id, name, description)
VALUES ($1, $2, $3, $4)
RETURNING *;
