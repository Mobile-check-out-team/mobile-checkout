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
  getCart: async (req, res) => {
    req.session.user = { ...req.session.user, cart: [] };

    res.status(200).send(req.session.user);
  },
  saveCart: async (req, res) => {
    //find a way to save cart.
    req.session.user = { ...req.session.user };
    res.sendStatus(200);
  },
};
