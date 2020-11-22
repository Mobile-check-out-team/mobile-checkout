require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const authCtrl = require("./authController");
const invCtrl = require("./inventoryController");
const nodeMailerCtrl = require("./nodeMailerController");
const stripeCtrl = require('./stripeController');

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const app = express();
// const stripe = require("stripe")(STRIPE_SECRET);

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
app.get('/api/orders', invCtrl.getOrders)
app.get('/api/orders/single/', invCtrl.singleOrder)

//Purchased_Items
app.post('/api/purchasedItem', invCtrl.purchasedItem);

//Stripe Element Post Request
app.post('/api/charge', stripeCtrl.charge);

//Reverse-Geo
app.post('/api/geoLocation', invCtrl.getReverseGeo)

//Tax-rate taxjar
app.post('/api/taxRate', invCtrl.getTaxRate)

