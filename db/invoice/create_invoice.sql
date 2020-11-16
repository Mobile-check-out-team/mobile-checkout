INSERT INTO checkout_invoice (user_id, invoice_date, total, numItems)
VALUES ($1, $2, $3, $4)
returning invoice_number, user_id, invoice_date, total, numItems;