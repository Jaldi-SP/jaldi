insert into businesses(
    id,
    name,
    username,
    password,
    phone_number
) values (
    $1,
    $2,
    $3,
    $4,
    $5
)
returning *;