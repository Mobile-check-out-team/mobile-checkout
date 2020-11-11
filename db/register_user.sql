INSERT INTO checkout_users(
    first_name,
    last_name,
    email,
    password
)
VALUES(
    ${firstName},
    ${lastName},
    ${email},
    ${hash}
)

returning user_id, first_name, last_name, email;