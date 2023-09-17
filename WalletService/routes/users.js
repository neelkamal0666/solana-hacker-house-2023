var express = require('express');
var router = express.Router();
var auth = require('../services/authorization');
const crypto = require ("crypto");
var config = require('../services/config');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(config.BLOCKCHAIN_SERVICE)
    res.send('respond with a resource');
});

function decipher(){
  var pk = 'l3aC1HapkQjl3Tv56V4aE3BWMhNHQ8CPlTUE8ro+Ya8vRItVvbE/CwC4unXcDgADIWo7YQ4lgx4NlVQ6MKZ+PeZc69KfmsE1WE5n2KpSlVM='
  var key = '1a55d5587c74e736cdaa2fad4c9c386e'
  var msg = decrypt(pk, key)
  console.log('Decrypted' + msg);

}

module.exports = router;
