const { Block } = require('./block');
const { Transaction } = require('c:/users/thanh dat/desktop/blockchainjs/src/blockchain');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransaction = [];
        this.miningReward = 100;
    }

    /**
     * @returns {Block} 
     */
    createGenesisBlock() {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    /**
     * Returns the latest block in our chain
     * @returns {Block}
     */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Takes all the pending transactions, puts them in a block and starts the mining process.
     * Its also add a transaction to send the mining to the given address.
     * @param {string} miningRewardAddress 
     */
    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransaction.push(rewardTx);

        const block = new Block(Date.now(), this.pendingTransaction, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined !');
        this.chain.push(block);

        this.pendingTransaction = [];
    }

    /**
     * Add a new transaction to the list of pending transactions.
     * @param {Transaction} transaction 
     */
    addTransaction(transaction) {
        if (!transaction.formAddress || !transaction.toAddress) {
            throw new Error('Transaction must include form and to address !');
        }

        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to chain');
        }

        this.pendingTransaction.push(transaction);
    }

    /**
     * Returns the balance of a given wallet address
     * @param {string} address 
     * @returns {number}
     */
    getBalanceOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.formAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    /**
     * @returns {boolean}
     */
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.isValidNewBlock(previousBlock)) {
                return false;
            }
        }
        return true;
    }
}

module.exports = { Blockchain };