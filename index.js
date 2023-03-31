require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const db = require("./models");

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use('/api/user', require('./routes/user'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/transaction', require('./routes/transaction'));
app.use('/api/account', require('./routes/bankAccount'));

db.sequelize.sync().then(() => {
    app.listen(8000, () => {
        console.log("Server running on port 8000");
    });
});