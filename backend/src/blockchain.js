const { Block, mineBlock, isValidNewBlock, calculateHashForBlock } = require('./block');
const { Transaction, TxIn, TxOut, UnspentTxOut, getTransactionId, getPublicKey, signTxIn } = require('./transaction');
class Blockchain {
    /**
     * @param {Block[]} chain
     * @param {number} difficulty
     * @param {Transaction[]} pendingTransaction
     * @param {number} miningReward
     * @param {UnspentTxOut[]} unspentTxOut
     */
    constructor() {
        this.difficulty = 4;
        this.pendingTransaction = [];
        this.pendingTxOuts = [];
        this.infoTransaction = [];
        this.miningReward = 100;
        this.unspentTxOut = [];
        this.chain = [createGenesisBlock(this.miningReward, this)];
    }
}

/**
 * @param {string} address
 * @param {number} reward
 * @param {Blockchain} blockchain
 * @returns {Transaction}
 */
const createCoinbaseTransaction = (address, reward, blockchain) => {
    const txIns = [new TxIn('', 0, '')];
    const txOuts = [new TxOut(address, reward)];
    const coinBaseTx = new Transaction('', txIns, txOuts);
    coinBaseTx.id = getTransactionId(coinBaseTx);

    let idx = 0
    for (const txOut of txOuts) {
        const data = {
            txOutId: coinBaseTx.id,
            txOutIndex: idx,
            address: txOut.address,
            amount: txOut.amount
        }
        blockchain.unspentTxOut.push(data);
        idx++;
    }

    return coinBaseTx;
}

/**
 * @param {number} reward
 * @returns {Block} 
 */
const createGenesisBlock = (reward, blockchain) => {
    const transaction = [createCoinbaseTransaction('', reward, blockchain)];
    const genesis = new Block(0, new Date(), transaction, "0");
    genesis.hash = calculateHashForBlock(genesis);
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
 * @returns {string}
 */
const minePendingTransactions = (miningRewardAddress, blockchain) => {
    const rewardTx = createCoinbaseTransaction(miningRewardAddress, blockchain.miningReward, blockchain);
    blockchain.pendingTransaction.push(rewardTx);

    const latestBlock = getLatestBlock(blockchain);
    const block = new Block(latestBlock.index + 1, '', blockchain.pendingTransaction, latestBlock.hash, '');
    const newHash = mineBlock(block, blockchain.difficulty);

    if (isValidNewBlock(block, latestBlock)) {
        for (const txOut of blockchain.pendingTxOuts) {
            blockchain.unspentTxOut.push(txOut);
        }        

        blockchain.chain.push(block);
        blockchain.pendingTransaction = [];
        blockchain.pendingTxOuts = [];
        
        const info = [];
        for (const element of blockchain.infoTransaction) {
            info.push(element);
        }
        blockchain.infoTransaction = [];
        return [block.index, blockchain.miningReward, info, block.timestamp];
    }
}

/**
 * @param {string} fromAddress 
 * @param {string} toAddress 
 * @param {number} amount 
 * @param {UnspentTxOut[]} aUnspentTxOuts
 * @param {Blockchain} blockchain
 */
const sendTransaction = (privateKey, receiverAddress, amount, blockchain) => {
    const senderAddress = getPublicKey(privateKey);

    if (senderAddress === receiverAddress) {
        return false;
    }

    let currentAmount = 0;
    let usedUnspentTxOuts = [];
    let remainTxOuts = [];
    for (const uTxO of blockchain.unspentTxOut) {
        if (uTxO.address !== senderAddress) {
            remainTxOuts.push(uTxO);
        } else {
            if (currentAmount < amount) {
                currentAmount += uTxO.amount;
                usedUnspentTxOuts.push(uTxO);
            } else {
                remainTxOuts.push(uTxO);
            }
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

    for (let i = 0; i < txIns.length; i++) {
        txIns[i].signature = signTxIn(tx, privateKey, usedUnspentTxOuts[i]);
    }

    blockchain.unspentTxOut = remainTxOuts;
    let idx = 0;
    for (const txOut of txOuts) {
        const unSpent = {
            txOutId: tx.id,
            txOutIndex: idx,
            address: txOut.address,
            amount: Number(txOut.amount)
        };
        if (txOut.address === senderAddress) {
            blockchain.unspentTxOut.push(unSpent);
        } else {
            blockchain.pendingTxOuts.push(unSpent);
        }
        idx++;
    }

    blockchain.pendingTransaction.push(tx);
    blockchain.infoTransaction.push([senderAddress, receiverAddress, amount]);
    return true;
}

/**
 * @param {string} address 
 * @param {UnspentTxOut[]} aUnspentTxOuts 
 * @returns {number}
 */
const getBalance = (address, aUnspentTxOuts) => {
    let balance = 0;
    for (const uTxO of aUnspentTxOuts) {
        if (uTxO.address === address) {
            balance += Number(uTxO.amount);
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