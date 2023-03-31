const express = require('express');
const { Transaction, User } = require('../models');
const router = express.Router();

router.post('/createTransaction', (req, res) => {
    const payload = req.body
    Transaction.create(payload)
        .then(function (item) {
            res.status(200).json({ success: true, Item: item });
        }).catch(function (err) {
            res.status(400).json({ success: false, err });
        });
})

router.post('/getUserTransaction', (req, res) => {
    Transaction.findAll({ where: { user: { id: req.body.userId } } })
        .then(transactions => {
            return res.status(200).json({ success: true, transactions });
        }).catch(err => {
            return res.json({ success: false, err });
        })
})

router.post('/getAllTransaction', (req, res) => {
    Transaction.findAll({ where: { user: { domain: req.body.domain } } })
        .then(transactions => {
            return res.status(200).json({ success: true, transactions });
        }).catch(err => {
            return res.json({ success: false, err });
        })
})

router.post('/deleteTransaction', (req, res) => {
    Transaction.destroy({ where: { id: req.body.transactionId } })
        .then(doc => {
            return res.status(200).json({ success: true, doc });
        }).catch(err => {
            return res.json({ success: false, err });
        })
})

router.post('/getTransactionById', (req, res) => {
    Transaction.findAll({ where: { id: req.body.transactionId } })
        .then(transaction => {
            return res.status(200).json({ success: true, transaction });
        }).catch(err => {
            return res.json({ success: false, err });
        })
})


module.exports = router;
