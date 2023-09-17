var express = require('express');
const config = require("../services/config");
var router = express.Router();
const walletService = require("../services/walletService");
const auth = require("../services/authorization");

router.get('/create', function(req, res, next) {
    const wallet = walletService.createWallet();
    res.send(wallet);
});

router.get('/:address/balance', async function (req, res, next) {
    const balance = await walletService.getWalletBalance(req.params['address']);
    res.send(balance);
});

router.post('/token/transfer', async function (req, res, next) {
    if (auth.authorizeAppToken(req.header('X-App-Token')) === false) {
        res.json({message: "Invalid App Token"});
    }
    resp = await walletService.transferToken(req.body.senderUserId, req.body.mnemonic, req.body.sender, req.body.receiver, req.body.amount, req.body.programId, req.body.tokenDecimals)
    res.json(resp);
});

router.post('/token/swap', async function (req, res, next) {
    if (auth.authorizeAppToken(req.header('X-App-Token')) === false) {
        res.json({message: "Invalid App Token"});
    }
    resp = {status:"SUBMITTED"}
    walletService.swaptoken(req.body.encryptedMnemonic, req.body.sender, req.body.receiver, req.body.amount, req.body.toProgramId, req.body.tokenDecimals)
    res.json(resp);
});

module.exports = router;