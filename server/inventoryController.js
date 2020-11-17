module.exports = {
  getItem: async (req, res) => {
    const { upc } = req.params;
    const db = req.app.get("db");
    const invObj = await db.inventory.get_item(upc);
    if (!invObj[0]) {
      return res.status(400).send("UPC is not in the system");
    }
    res.status(200).send(invObj[0]);
  },
  createInvoice: async(req, res) => {
    const {user_id, date, total, numItems} = req.body
    const db = req.app.get('db');
    const invoice = await db.invoice.create_invoice(user_id, date, total, numItems);
    res.status(200).send(invoice[0]);
  },
  // getCart: async (req, res) => {
  //   req.session.user = { ...req.session.user, cart: [] };

  //   res.status(200).send(req.session.user);
  // },
  // saveCart: async (req, res) => {
  //   //find a way to save cart.
  //   req.session.user = { ...req.session.user };
  //   res.sendStatus(200);
  // },
  purchasedItem: async (req, res) => {
    const {cartArray, invoiceNumber} = req.body
    const db = req.app.get('db');
    for(let i=0; i < cartArray.length; i++){
      const itemNumber = cartArray[i].inventory_id;
      const qty = cartArray[i].qty;
      await db.purchased_items.add_purchased_item(invoiceNumber, itemNumber, qty)
    }
    res.sendStatus(200);
  }
};
