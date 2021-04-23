const SHA256 = require('crypto-js/sha256');

class Block {
    /**
     * @param {number} index
     * @param {number} timestamp
     * @param {Transaction[]} transactions
     * @param {string} previousHash
     * @param {number} difficulty
     */
    constructor(index, timestamp, transactions, previousHash = '', difficulty) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.difficulty = difficulty;
        this.hash = this.calculateHash();
    }

    /**
     * Return the SHA256 of this block
     * @return {string}
     */
    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString('hex');
    }

    /**
     * Starts the mining process on the block. It changes the 'nonce' until the
     * hash of the block starts with enough zeros (=difficulty)
     * @return {string}
     */
    mineBlock() {
        while (this.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
        return this.hash;
    }

    /**
     * Check if the new block is valid
     * @param {Block} previousBlock 
     * @returns {boolean}
     */
    isValidNewBlock(previousBlock) {
        if (previousBlock.hash !== this.previousHash) {
            return false;
        }

        if (this.calculateHash() !== this.hash) {
            return false;
        }

        return true;
    }
}