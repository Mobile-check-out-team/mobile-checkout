const bcrypt = require("bcryptjs");
const {STRIPE_SECRET} = process.env;
const stripe = require('stripe')(STRIPE_SECRET)

module.exports = {
  register: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const db = req.app.get("db");
    const foundUser = await db.users.check_user({ email });
    if (foundUser[0]) {
      return res.status(400).send("Email already in use");
    }
    const customer = await stripe.customers.create({
      email: email,
      name: `${firstName} ${lastName}`,
      description: 'My First Test Customer'
    });
    const customerId = customer.id
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    const newUser = await db.users.register_user({
      firstName,
      lastName,
      email,
      hash,
      customerId
    });
    req.session.user = newUser[0];
    console.log("registered");
    res.status(201).send(req.session.user);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get("db");
    const foundUser = await db.users.check_user({ email });
    if (!foundUser[0]) {
      return res.status(400).send("Email is not found");
    }
    const authenticated = bcrypt.compareSync(password, foundUser[0].password);
    if (!authenticated) {
      return res.status(401).send("Password is incorrect");
    }
    delete foundUser[0].password;
    req.session.user = foundUser[0];
    console.log("logged in");
    res.status(202).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    console.log("logout complete");
    res.sendStatus(200);
  },
};
