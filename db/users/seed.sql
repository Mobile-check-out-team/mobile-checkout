create table if not exists checkout_users (
    user_id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(250),
    password varchar(250),
    stripe_id varchar(100)
);


