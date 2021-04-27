const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class TxOut {
    /**
     * @param {string} address 
     * @param {number} amount 
     */
    constructor(address, amount) {
        this.address = address;
        this.amount = amount;
    }
}

class TxIn {
    /**
     * @param {string} txOutId 
     * @param {number} txOutIndex 
     * @param {string} signature 
     */
    constructor(txOutId, txOutIndex, signature) {
        this.txOutId = txOutId;
        this.txOutIndex = txOutIndex;
        this.signature = signature;
    }
}

class UnspentTxOut {
    /**
     * @param {string} txOutId 
     * @param {number} txOutIndex 
     * @param {string} address 
     * @param {number} amount 
     */
    constructor(txOutId, txOutIndex, address, amount) {
        this.txOutId = txOutId;
        this.txOutIndex = txOutIndex;
        this.address = address;
        this.amount = amount;
    }
}

class Transaction {
    /**
     * @param {string} id 
     * @param {TxIn[]} txIns 
     * @param {TxOut[]} txOuts 
     */
    constructor(id, txIns, txOuts) {
        this.id = id;
        this.txIns = txIns;
        this.txOuts = txOuts;
    }
}

/**
 * @param {Transaction} transaction 
 */
const getTransactionId = (transaction) => {
    const txInContent = transaction.txIns
        .map((txIn) => txIn.txOutId + txIn.txOutIndex)
        .reduce((a, b) => a + b, '');
    
    const txOutContent = transaction.txOuts
        .map((txOut) => txOut.address + txOut.amount)
        .reduce((a, b) => a + b, '');
    
    return SHA256(txInContent + txOutContent).toString();
}

/**
 * @param {Transaction} transaction 
 * @param {UnspentTxOut[]} aUnspentTxOuts 
 * @returns {boolean}
 */
const isValidTransaction = (transaction, aUnspentTxOuts) => {
    if (getTransactionId(transaction) !== transaction.id) {
        console.log('Invalid tx id: ' + transaction.id);
        return false;
    }

    const hasValidTxIns = transaction.txIns
        .map((txIn) => validateTxIn(txIn, transaction, aUnspentTxOuts))
        .reduce((a, b) => a && b, true);
    if (!hasValidTxIns) {
        console.log('Some of the txIns are invalid tx: ' + this.id);
        return false;
    }

    const totalTxInValues = transaction.txIns
        .map((txIn) => getTxInAmount(txIn, aUnspentTxOuts))
        .reduce((a, b) => a + b, 0);
    
    const totalTxOutValues = transaction.txOuts
        .map((txOut) => txOut.amount)
        .reduce((a, b) => a + b, 0);
    
    if (totalTxInValues !== totalTxOutValues) {
        return false;
    }

    return true;
}

/**
 * @param {TxIn} txIn 
 * @param {Transaction} transaction 
 * @param {UnspentTxOut[]} aUnspentTxOuts 
 * @returns {boolean}
 */
const validateTxIn = (txIn, transaction, aUnspentTxOuts) => {
    const referencedUTxOut = aUnspentTxOuts.find((uTxO) => uTxO.txOutId === txIn.txOutId && uTxO.txOutIndex === txIn.txOutIndex);
    if (referencedUTxOut == null) {
        console.log('Referenced txOut not found: ' + JSON.stringify(txIn));
        return false;
    }

    const address = referencedUTxOut.address;
    const key = ec.keyFromPublic(address, 'hex');
    const validSignature = key.verify(transaction.id, transaction.signature);
    if (!validSignature) {
        console.log('Invalid txIn signature: %s txId: %s address: %s', txIn.signature, transaction.id, referencedUTxOut.address);
        return false;
    }

    return true;
}

/**
 * @param {TxIn} txIn 
 * @param {UnspentTxOut[]} aUnspentTxOuts 
 * @returns {number}
 */
const getTxInAmount = (txIn, aUnspentTxOuts) => {
    return findUnspentTxOut(txIn.txOutId, txIn.txOutIndex, aUnspentTxOuts).amount;
}

/**
 * @param {string} transactionId 
 * @param {number} index 
 * @param {UnspentTxOut[]} aUnspentTxOuts 
 * @returns 
 */
const findUnspentTxOut = (transactionId, index, aUnspentTxOuts) => {
    return aUnspentTxOuts.find((uTxO) => uTxO.txOutId === transactionId && uTxO.txOutIndex === index);
}

/**
 * @param {string} aPrivateKey 
 * @returns {string}
 */
const getPublicKey = (aPrivateKey) => {
    return ec.keyFromPrivate(aPrivateKey, 'hex').getPublic().encode('hex');
}

/**
 * 
 * @param {Transaction} transaction
 * @param {string} privateKey 
 * @param {UnspentTxOut} aUnspentTxOuts 
 * @returns {string}
 */
const signTxIn = (transaction, privateKey, aUnspentTxOuts) => {
    const dataToSign = transaction.id;

    if (getPublicKey(privateKey) !== aUnspentTxOuts.address) {
        console.log("Does not match key");
        throw Error();
    }

    const key = ec.keyFromPrivate(privateKey, 'hex');
    const signature = toHexString(key.sign(dataToSign).toDER());

    return signature;
}

const toHexString = (byteArray) => {
    return Array.from(byteArray, (byte) => {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

module.exports = { Transaction, TxIn, TxOut, UnspentTxOut, getTransactionId, getPublicKey, signTxIn };