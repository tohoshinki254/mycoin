const { Transaction, TxIn, TxOut, UnspentTxOut, isValidTransaction } = require('./transaction');
const SHA256 = require('crypto-js/sha256');

class Block {
    /**
     * @param {number} index
     * @param {number} timestamp
     * @param {Transaction[]} transactions
     * @param {string} previousHash
     */
    constructor(index, timestamp, transactions, previousHash = '', hash) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = hash;
    }
}

/**
 * @param {Block} block 
 * @returns {string}
 */
const calculateHashForBlock = (block) => {
    return SHA256(block.index + block.timestamp + block.previousHash + block.transactions + block.nonce).toString();
}

/**
 * @param {Block} block 
 * @param {UnspentTxOut[]} aUnspentTxOuts
 * @returns {boolean}
 */
const hasValidTransactions = (block, aUnspentTxOuts) => {
    for (const tx of block.transactions) {
        if (!isValidTransaction(tx, aUnspentTxOuts)) {
            return false;
        }
    }
    
    return true;
}

/**
 * @param {Block} block 
 * @param {number} difficulty 
 * @returns {string}
 */
const mineBlock = (block, difficulty) => {
    while (block.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
        block.nonce++;
        block.hash = calculateHashForBlock(block);
    }

    console.log("Block mined: " + block.hash);
    return block.hash;
}

/**
 * @param {Block} currentBlock 
 * @param {Block} previousBlock 
 * @returns 
 */
const isValidNewBlock = (currentBlock, previousBlock) => {
    if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
    }

    if (calculateHashForBlock(currentBlock) !== currentBlock.hash) {
        return false;
    }

    return true;
}

module.exports = { Block, calculateHashForBlock, mineBlock, hasValidTransactions, isValidNewBlock };