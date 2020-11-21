SELECT ch.invoice_date, ch.invoice_number, ch.total, ch.numItems, ci.description, ci.img_url, ci.price, ch.user_id 
FROM checkout_inventory ci
JOIN checkout_invoice ch
ON ch.user_id = ci.inventory_id
where ch.user_id = $1;