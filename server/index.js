require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const authCtrl = require("./authController");
const invCtrl = require("./inventoryController");
const nodeMailerCtrl = require("./nodeMailerController");
const stripeCtrl = require('./stripeController');

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, STRIPE_SECRET} = process.env;
const app = express();
const stripe = require("stripe")(STRIPE_SECRET);

//FOR req.body
app.use(express.json());

//USER SESSION
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

//DATABASE CONNECTION
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
  app.listen(SERVER_PORT, () =>
    console.log(`Server connected to port ${SERVER_PORT}`)
  );
});

//Auth Endpoints
app.post("/api/register", authCtrl.register);
app.post("/api/login", authCtrl.login);
app.post("/api/logout", authCtrl.logout);

//NodeMailer
app.post("/api/email", nodeMailerCtrl.email);

//Inventory
app.get("/api/item/:upc", invCtrl.getItem);

//Invoice
app.post('/api/invoice', invCtrl.createInvoice)

// //Cart
// app.get("/api/getCart", invCtrl.getCart);
// app.post("/api/saveCart", invCtrl.saveCart);

//Purchased_Items
app.post('/api/purchasedItem', invCtrl.purchasedItem);

//Stripe Element Post Request
app.post('/api/charge', stripeCtrl.charge);

//Stripe API Post Request
// app.post("/createSession", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "Scan and Go Cart",
//             images: [
//               "https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG37.png",
//             ],
//           },
//           unit_amount: req.body.price * 100,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `http://localhost:3000/#/ExitPass`,
//     cancel_url: `http://localhost:3000/#/checkout/cancel`,
//   });
//   res.json({ id: session.id });
// });

// app.listen(SERVER_PORT, () => console.log(`Server connected to port ${SERVER_PORT}`))
