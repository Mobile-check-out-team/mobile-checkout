create table if not exists checkout_inventory (
    inventory_id serial primary key,
    description varchar(100),
    img_url text,
    price decimal,
    upc text
);