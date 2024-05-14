insert into businesses(
    id,
    name,
    username,
    password
) values (
    $1,
    $2,
    $3,
    $4
)
returning *;