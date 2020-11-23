create table if not exists checkout_purchased_item(
    invoice_number int references checkout_invoice(invoice_number),
    purchased_item int references checkout_inventory(inventory_id),
    quantity_purchased int,
    line_item int
);