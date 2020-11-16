create table if not exists checkout_invoice (
    invoice_number serial primary key,
    user_id int references checkout_users(user_id),
    invoice_date date,
    total decimal,
    numItems int
);