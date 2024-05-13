insert into businesses(
    name,
    username,
    password
) values (
    $1,
    $2,
    $3
)
returning *;