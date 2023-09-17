const { Keypair, sendAndConfirmTransaction, SystemProgram, Connection, clusterApiUrl, Transaction, PublicKey} = require("@solana/web3.js");
const bip39 = require("bip39");
var config = require('./config');
const LAMPORTS_PER_SOL = 1000000000;

function createWallet(){
    // let keypair = Keypair.generate();
    // console.log(keypair)
    // // var publicKey = keypair._keypair.publicKey.toString();
    // // var privateKey = keypair._keypair.secretKey.toString();
    // var publicKey = keypair.publicKey.toBase58()
    // var privateKey = keypair.secretKey
    // console.log(publicKey)
    // console.log(privateKey)
    // const str = bs58.encode(privateKey)
    // console.log(str);
    // console.log(bs58.decode(
    //     str
    // ))
    // const keypair1 = Keypair.fromSecretKey(
    //     bs58.decode(
    //         str
    //     )
    // );
    // console.log(keypair1)

    const mnemonic = bip39.generateMnemonic();
    console.log(mnemonic)
    const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
    const keypair = Keypair.fromSeed(seed.slice(0, 32));
    return {
        publicKey: keypair.publicKey.toBase58(),
        mnemonic: mnemonic.split('').reverse().join('')
    }
}
async function transferToken(senderUserId, mnemonic, sender, receiver, amount, programId, tokenDecimals) {
    if(programId){
        //call token transfer
    } else {
        return transferSolana(sender, receiver, amount, mnemonic)
    }
}

async function transferSolana(fromAddress, toAddress, amount, fromPneumonic) {
    let mnemonic;
    let connection = new Connection(clusterApiUrl(config.env));
    try {
        mnemonic = fromPneumonic.split('').reverse().join('')
        console.log(mnemonic)
        const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
        const keypair = Keypair.fromSeed(seed.slice(0, 32));
        console.log(keypair.publicKey.toBase58())
        const transferTransaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: new PublicKey(toAddress),
                lamports: amount * LAMPORTS_PER_SOL,
            })
        );
        console.log(keypair)
        let resp = await sendAndConfirmTransaction(connection, transferTransaction, [keypair]);
        return {transactionId: resp}
    } catch (e) {
        console.log(e)
    }
}

async function getWalletBalance(address) {
    let connection = new Connection(clusterApiUrl(config.env));
    let balance = await connection.getBalance(new PublicKey(address));
    console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL}`)
    return {address: address, balance: balance/LAMPORTS_PER_SOL}
}
module.exports = { createWallet, transferSolana, transferToken, getWalletBalance};