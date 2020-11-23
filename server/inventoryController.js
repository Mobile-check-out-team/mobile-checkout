const Taxjar = require('taxjar');
const reverse = require('reverse-geocode');
const {TAXJAR_SANDBOX_API_KEY} = process.env;
const client = new Taxjar({
  apiKey: TAXJAR_SANDBOX_API_KEY
});

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
    const {user_id, date, total, numItems, tax_rate} = req.body
    const db = req.app.get('db');
    const invoice = await db.invoice.create_invoice(user_id, date, total, numItems, tax_rate);
    res.status(200).send(invoice[0]);
  },
  getOrders: async(req,res) =>{
    const db = req.app.get('db')
    const {user_id} = req.session.user;
    let orders = await db.invoice.get_invoices(user_id);
    res.status(200).send(orders);
  },
  singleOrder: async(req,res) => {
    const db = req.app.get('db');
    const {invoiceNumber} = req.params;
    const invoice = await db.invoice.get_single_invoice(invoiceNumber)
    // order.forEach( el => {
    //     return el.date = el.date.toLocaleString().split(',')
    // })
    console.log(invoice)
    res.status(200).send(invoice);
  },
  purchasedItem: async (req, res) => {
    const {cartArray, invoiceNumber} = req.body;
    const db = req.app.get('db');
    for(let i=0; i < cartArray.length; i++){
      const itemNumber = cartArray[i].inventory_id;
      const qty = cartArray[i].qty;
      const line_item = i + 1
      await db.purchased_items.add_purchased_item(invoiceNumber, itemNumber, qty, line_item)
    }
    res.sendStatus(200);
  },
  getReverseGeo: async(req, res) => {
    const {latitude, longitude} = req.body;
    console.log(latitude)
    const locationObj = await reverse.lookup(latitude, longitude, 'us');
    res.status(200).send(locationObj);
  },
  getTaxRate: async(req,res) => {
    console.log('hit')
    const {zipCode} = req.body;
    console.log(zipCode)
    const rates = await client.ratesForLocation(zipCode)
    console.log(rates)
    res.status(200).send(rates);
  }
};

