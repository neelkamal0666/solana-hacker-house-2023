require('dotenv').config()
var config = require('./config');

function fetchAbi(url){
    return fetch(url, {
        method: 'GET'})
        .then(res => res.json())
        .then(json => {
            return json;
        }).catch(err => {
            console.error(err)
            return null;
        });
}

function fetchUserSecret(userId, authToken){
    var apiEndpoint = config.USERSERVICE_API +"/internal/user/"+userId+"/key";
    console.log(apiEndpoint)
    return fetch(apiEndpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': authToken,
            'X-Internal-Token': "G9MD21Z9-NQ37-484I-9DB6-D39C4GJ474A1",
        },})
        .then(res => res.json())
        .then(json => {
            console.log(json)
            return json.key;
        }).catch(err => {
            console.error(err)
            return null;
        });
}

function updateMintStatus(tokenId, transactionHash, nftId) {
    var apiEndpoint = config.BLOCKCHAIN_SERVICE +"/nft/mint/status/update";
    const data = {
        transactionId: transactionHash,
        blockchainNftId: tokenId,
        nftId: nftId,
        transactionStatus: "SEALED"
    };
    console.log(data)
    return fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-App-Token': config.X_APP_TOKEN,
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(json => {
            return json;
        }).catch(err => {
            console.error(err)
            return null;
        });
}

function updateTokenDistribution(basketId, userId, token, amount, transactionId, transactionHash, takerAddress) {
    var apiEndpoint = config.BLOCKCHAIN_SERVICE +"/crypto/basket/"+basketId+"/token/distribution/"+userId+"/update";
    console.log(apiEndpoint)
    const data = {
        token: token,
        amount: amount,
        transactionId: transactionId,
        blockchainTransactionId: transactionHash,
        address: takerAddress,
        transactionStatus: 'SEALED'
    };
    console.log(data)
    return fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-App-Token': config.X_APP_TOKEN,
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(json => {
            return json;
        }).catch(err => {
            console.error(err)
            return null;
        });
}

function updateTransaction(transactionId, transactionHash, takerAddress, tokenAmount, transactionStatus) {
    var apiEndpoint = config.BLOCKCHAIN_SERVICE +"/transaction/history/update";
    console.log(apiEndpoint)
    const data = {
        transactionId: transactionId,
        blockchainTransactionId: transactionHash,
        address: takerAddress,
        amount: tokenAmount,
        transactionStatus: transactionStatus
    };
    console.log(data)
    return fetch(apiEndpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-App-Token': config.X_APP_TOKEN,
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(json => {
            return json;
        }).catch(err => {
            console.error(err)
            return null;
        });
}

function updateContractAddress(collectionId, address, abi) {
    var apiEndpoint = config.BLOCKCHAIN_SERVICE +"/collection/update";
    console.log(apiEndpoint)
    const data = {
        collectionId: collectionId,
        contractAddress: address,
        abi: abi
    };
    console.log(data)
    return fetch(apiEndpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-App-Token': config.X_APP_TOKEN,
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(json => {
            return json;
        }).catch(err => {
            console.error(err)
            return null;
        });
}


module.exports = { fetchAbi, fetchUserSecret, updateMintStatus, updateTokenDistribution, updateTransaction, updateContractAddress };