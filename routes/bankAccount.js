const express = require('express');
const { BankAccount } = require('../models');
const router = express.Router();

router.post('/addBankAccount', (req, res) => {
    const payload = req.body
    BankAccount.create(payload)
        .then(function (item) {
            res.status(200).json({ success: true, Item: item });
        }).catch(function (err) {
            res.status(400).json({ success: false, err });
        });
})

router.post('/getUserBankAccount', (req, res) => {
    BankAccount.findAll({ where: { userId: req.body.userId } })
        .then(acc => {
            return res.status(200).json({ success: true, acc });
        }).catch(err => {
            return res.json({ success: false, err });
        })
})

router.post('/deleteBankAccount', (req, res) => {
    BankAccount.destroy({ where: { id: req.body.accountId } })
        .then(doc => {
            return res.status(200).json({ success: true, doc });
        }).catch(err => {
            return res.json({ success: false, err });
        })
})

module.exports = router;