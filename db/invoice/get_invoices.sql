SELECT * FROM checkout_invoice
WHERE user_id = $1
ORDER BY invoice_date DESC;