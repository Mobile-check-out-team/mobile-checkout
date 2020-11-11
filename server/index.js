require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./authController');
const nodeMailerCtrl = require('./nodeMailerController');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const app = express();

//FOR req.body
app.use(express.json());

//USER SESSION
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

//DATABASE CONNECTION
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
});

//Auth Endpoints
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.post('/api/logout', authCtrl.logout);
//NodeMailer
app.post('/api/email', nodeMailerCtrl.email);

app.listen(SERVER_PORT, () => console.log(`Server connected to port ${SERVER_PORT}`))