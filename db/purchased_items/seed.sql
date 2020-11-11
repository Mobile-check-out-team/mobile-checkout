create table if not exists purchased_items(
    invoice_number int references invoice(invoice_number),
    purchased_items int references inventory(inventory_id),
    quantity_purchased int
);