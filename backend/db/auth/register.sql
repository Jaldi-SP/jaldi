insert into businesses(
    id,
    name,
    username,
    password,
    phone_number,
    email,
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
)
returning *;