const { Block, mineBlock, isValidNewBlock } = require('./block');
const { Transaction, TxIn, TxOut, UnspentTxOut, getTransactionId, getPublicKey } = require('./transaction');

class Blockchain {
    /**
     * @param {Block[]} chain
     * @param {number} difficulty
     * @param {Transaction[]} pendingTransaction
     * @param {number} miningReward
     * @param {UnspentTxOut[]} unspentTxOut
     */
    constructor() {
        this.chain = [createGenesisBlock(this.miningReward)];
        this.difficulty = 4;
        this.pendingTransaction = [];
        this.miningReward = 100;
        this.unspentTxOut = [];
    }
}

/**
 * @param {string} address
 * @param {number} reward
 * @returns {Transaction}
 */
const createCoinbaseTransaction = (address, reward) => {
    const txIns = new TxIn('', 0, '');
    const txOuts = new TxOut(address, reward);
    const coinBaseTx = new Transaction('', txIns, txOuts);
    coinBaseTx.id = getTransactionId(coinBaseTx);
    return coinBaseTx;
}

/**
 * @param {number} reward
 * @returns {Block} 
 */
const createGenesisBlock = (reward) => {
    const transaction = createCoinbaseTransaction('', reward)
    const genesis = new Block(0, Date.now(), transaction, "0");
    genesis.calculateHash();
    return genesis;
}

/**
 * @param {Blockchain} blockchain
 * @returns {Block}
 */
const getLatestBlock = (blockchain) => {
    return blockchain.chain[blockchain.chain.length - 1];
}

/**
 * @param {string} miningRewardAddress 
 * @param {Blockchain} blockchain
 */
const minePendingTransactions = (miningRewardAddress, blockchain) => {
    const rewardTx = createCoinbaseTransaction(miningRewardAddress, blockchain.miningReward);
    blockchain.pendingTransaction.push(rewardTx);

    const latestBlock = getLatestBlock(blockchain);
    const block = new Block(latestBlock.index + 1, Date.now(), blockchain.pendingTransaction, latestBlock.hash, '');
    mineBlock(block, blockchain.difficulty);

    console.log('Block successfully mined !');
    blockchain.chain.push(block);

    blockchain.pendingTransaction = [];
}

/**
 * @param {string} fromAddress 
 * @param {string} toAddress 
 * @param {number} amount 
 * @param {UnspentTxOut[]} aUnspentTxOuts
 * @param {Blockchain} blockchain
 */
const sendTransaction = (privateKey, receiverAddress, amount, aUnspentTxOuts, blockchain) => {
    const senderAddress = getPublicKey(privateKey);
    const senderUnspentTxOuts = aUnspentTxOuts.filter((uTxO) => uTxO.address === senderAddress);

    const currentAmount = 0;
    const usedUnspentTxOuts = [];
    for (const txOut of senderUnspentTxOuts) {
        currentAmount += txOut.amount;
        usedUnspentTxOuts.push(txOut);
        if (currentAmount >= amount) {
            break;
        }
    }

    if (currentAmount < amount) {
        return false;
    }

    /**
     * @param {UnspentTxOut} unspentTxOut 
     * @returns {TxIn}
     */
    const toUnsignedTxIn = (unspentTxOut) => {
        return new TxIn(unspentTxOut.txOutId, unspentTxOut.txOutIndex, '');
    }

    /**
     * @param {string} senderAddress 
     * @param {string} receiverAddress 
     * @param {number} amount 
     * @param {number} leftAmount 
     * @returns {TxOut[]}
     */
    const createTxOuts = (senderAddress, receiverAddress, amount, leftAmount) => {
        const txOut = new TxOut(receiverAddress, amount);
        if (leftAmount === 0) {
            return [txOut];
        } else {
            const leftOverTx = new TxOut(senderAddress, leftAmount);
            return [txOut, leftOverTx];
        }
    }

    const txIns = usedUnspentTxOuts.map(toUnsignedTxIn);
    const txOuts = createTxOuts(senderAddress, receiverAddress, amount, currentAmount - amount);
    const tx = new Transaction('', txIns, txOuts);
    tx.id = getTransactionId(tx);

    blockchain.chain.push(tx);
}

/**
 * @param {string} address 
 * @param {UnspentTxOut[]} aUnspentTxOuts 
 * @returns {number}
 */
const getBalance = (address, aUnspentTxOuts) => {
    const balance = 0;
    for (const uTxO of aUnspentTxOuts) {
        if (uTxO.address === address) {
            balance += uTxO.amount;
        }
    }
    return balance;
}

/**
 * @param {Blockchain} blockchain
 * @returns {boolean}
 */
const isChainValid = (blockchain) => {
    for (let i = 1; i < blockchain.chain.length; i++) {
        const currentBlock = blockchain.chain[i];
        const previousBlock = blockchain.chain[i - 1];

        if (!isValidNewBlock(currentBlock, previousBlock)) {
            return false;
        }
    }
    return true;
}

module.exports = { Blockchain, minePendingTransactions, sendTransaction, getBalance, isChainValid };