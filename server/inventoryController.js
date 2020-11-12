module.exports = {
  getItem: async (req, res) => {
    const { upc } = req.params;
    const db = req.app.get("db");
    const invObj = await db.get_item(upc);
    console.log("I am invObj", invObj[0]);
    res.status(200).send(invObj[0]);
  },
  getCart: async (req, res) => {
    res.status(200).send(req.session.user);
  },
  saveCart: async (req, res) => {
    req.session.user.cart = req.body.cart;
    res.sendStatus(200);
  },
};
