create table if not exists checkout_purchased_items(
    invoice_number int references checkout_invoice(invoice_number),
    purchased_items int references checkout_inventory(inventory_id),
    quantity_purchased int
);