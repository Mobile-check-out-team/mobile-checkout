INSERT INTO checkout_users(
    first_name,
    last_name,
    email,
    password,
    stripe_id
)
VALUES(
    ${firstName},
    ${lastName},
    ${email},
    ${hash},
    ${customerId}
)

returning user_id, first_name, last_name, email, stripe_id;