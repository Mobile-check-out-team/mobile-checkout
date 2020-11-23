SELECT *
FROM checkout_invoice ci
JOIN checkout_purchased_item cpi ON cpi.invoice_number = ci.invoice_number
JOIN checkout_inventory coi ON coi.inventory_id = cpi.purchased_item
WHERE ci.invoice_number = $1;