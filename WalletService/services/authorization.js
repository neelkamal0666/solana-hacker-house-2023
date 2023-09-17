require('dotenv').config()
var config = require('./config');

function authorizeRequest(authToken){
    var apiEndpoint = process.env.USERSERVICE_API +'/authorize';
    console.log(apiEndpoint)
    return fetch(apiEndpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': authToken,
        },})
        .then(res => res.json())
        .then(json => {
            console.log(json)
            console.log(json.userId);
            return json.userId;
        }).catch(err => {
            console.error(err)
            return null;
        });
}

function authorizeAppToken(appToken) {
    if(appToken === config.EVM_APP_TOKEN){
        return true
    }
    return false;
}

module.exports = { authorizeRequest, authorizeAppToken };