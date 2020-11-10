INSERT INTO app_user(
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