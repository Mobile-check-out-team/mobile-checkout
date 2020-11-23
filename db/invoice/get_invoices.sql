-- SELECT * FROM checkout_invoice
-- WHERE user_id = $1
-- ORDER BY invoice_date DESC;
SELECT * FROM checkout_invoice ci
JOIN checkout_purchased_item cpi ON cpi.invoice_number = ci.invoice_number
JOIN checkout_inventory coi ON coi.inventory_id = cpi.purchased_item
WHERE user_id = $1
AND cpi.line_item = 1
ORDER BY invoice_date DESC;