const express = require('express');
const router = express.Router();
const controller = require('../src/main');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/wallet', async (req, res) => {
  controller.initWallet(req, res);
});

router.post('/access', async (req, res) => {
  controller.accessWallet(req, res);
});

router.post('/balance', async (req, res) => {
  controller.getBalanceOfAddress(req, res);
});

router.post('/transaction', async (req, res) => {
  controller.newTransaction(req, res);
});

router.post('/mineBlock', async (req, res) => {
  controller.mineBlock(req, res);
});

router.get('/transaction', async (req, res) => {
  controller.getAllTransactions(req, res);
});

router.get('/address-transaction', async (req, res) => {
  controller.getTransactionsOfAddress(req, res);
});

router.get('/block', async (req, res) => {
  controller.getAllBlocks(req, res);
});

router.get('/address-block', async (req, res) => {
  controller.getBlocksOfAddress(req, res);
});

module.exports = router;
