const { createWallet } = require('./wallet');
const { getPublicKey } = require('./transaction');
const { Blockchain, minePendingTransactions, sendTransaction, getBalance, isChainValid } = require('./blockchain');

let blockchain = new Blockchain();
let transactions = [];  // from-to-amount-time

module.exports = {
    initWallet: async (req, res) => {
        try {
            const privateKey = createWallet();
            const publicKey = getPublicKey(privateKey);
            res.status(200).json({
                message: "OK",
                privateKey: privateKey,
                publicKey: publicKey
            });
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    },

    getBalanceOfAddress: async (req, res) => {
        try {
            const address = req.body.address;
            const balance = getBalance(address, blockchain.unspentTxOut);
            res.status(200).json({
                message: "OK",
                balance: balance
            })
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    },

    newTransaction: async (req, res) => {
        try {
            const { sender, receiver, amount } = req.body;
            const successful = sendTransaction(sender, receiver, amount, blockchain);

            if (successful) {
                res.status(200).json({
                    message: "OK"
                });
            } else {
                res.status(501).json({
                    message: "Cannot perform the transaction"
                });
            }
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    },

    mineBlock: async (req, res) => {
        try {
            const privateKey = req.body.privateKey;
            const rewardAddress = getPublicKey(privateKey);

            const result = minePendingTransactions(rewardAddress, blockchain);
            if (result === undefined || result === null) {
                res.status(501).json({
                    message: 'Block mined is not valid',
                });
                return;
            }

            for (const element of result[1]) {
                element.push(result[2]);
                transactions.push(element);
            }

            res.status(200).json({
                message: 'OK',
                hash: result[0]
            });
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    },

    getAllTransactions: async (req, res) => {
        try {
            const SIZE = 10;
            let page = req.query.page;
            if (page === undefined) {
                page = 1;
            } else {
                page = parseInt(page);
            }

            let totalPages = Math.ceil(transactions.length / SIZE);
            if (page > totalPages) page = totalPages;
            
            const result = [];
            if (transactions.length !== 0) {
                for (let i = 0; i < SIZE; i++) {
                    const idx = (page - 1) * 10 + i;
                    if (idx >= transactions.length) break;
                    const data = {
                        from: transactions[idx][0],
                        to: transactions[idx][1],
                        amount: transactions[idx][2],
                        time: transactions[idx][3]
                    };
                    result.push(data);
                }
            }

            res.status(200).json({
                message: 'OK',
                data: result,
                curPage: page,
                totalPages: totalPages
            });
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    },

    getTransactionsOfAddress: async (req, res) => {
        try {
            const SIZE = 10;
            const address = req.query.address;
            console.log(address);
            let page = req.query.page;
            if (page === undefined) {
                page = 1;
            } else {
                page = parseInt(page);
            }

            const totalTransactions = [];
            for (const tx of transactions) {
                if (tx[0] === address || tx[1] === address) {
                    totalTransactions.push(tx);
                }
            }

            let totalPages = Math.ceil(totalTransactions.length / SIZE);
            if (page > totalPages) page = totalPages;

            const result = [];
            for (let i = 0; i < SIZE; i++) {
                const idx = (page - 1) * 10 + i;
                if (idx >= totalTransactions.length) break;
                const data = {
                    from: totalTransactions[idx][0],
                    to: totalTransactions[idx][1],
                    amount: totalTransactions[idx][2],
                    time: totalTransactions[idx][3]
                };
                result.push(data);
            }

            res.status(200).json({
                message: 'OK',
                data: result,
                curPage: page,
                totalPages: totalPages
            });
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    },

    getAllBlocks: async (req, res) => {
        try {
            const SIZE = 10;
            let page = req.query.page;
            if (page === undefined) {
                page = 1;
            } else {
                page = parseInt(page);
            }

            let totalPages = Math.ceil(blockchain.chain.length / SIZE);
            if (page > totalPages) page = totalPages;

            const result = [];
            for (let i = 0; i < SIZE; i++) {
                const idx = (page - 1) * 10 + i;
                if (idx >= blockchain.chain.length) break;
                
                const block = blockchain.chain[idx];
                const latestTransaction = block.transactions[block.transactions.length - 1];
                const miner = latestTransaction.txOuts[latestTransaction.txOuts.length - 1].address;
                const reward = latestTransaction.txOuts[latestTransaction.txOuts.length - 1].amount;

                const data = {
                    index: block.index,
                    time: block.timestamp.toLocaleString(),
                    numberOfTransaction: block.transactions.length,
                    miner: miner,
                    reward: reward
                }
                result.push(data);
            }

            res.status(200).json({
                message: 'OK',
                data: result,
                curPage: page,
                totalPages: totalPages
            });
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    },

    getBlocksOfAddress: async (req, res) => {
        try {
            const address = req.query.address;
            const SIZE = 10;
            let page = req.query.page;
            if (page === undefined) {
                page = 1;
            } else {
                page = parseInt(page);
            }

            const blocks = [];
            for (const block of blockchain.chain) {
                const latestTransaction = block.transactions[block.transactions.length - 1];
                const miner = latestTransaction.txOuts[latestTransaction.txOuts.length - 1].address;
                const reward = latestTransaction.txOuts[latestTransaction.txOuts.length - 1].amount;

                if (miner !== address) {
                    continue;
                }

                const data = {
                    index: block.index,
                    time: block.timestamp.toLocaleString(),
                    numberOfTransaction: block.transactions.length,
                    miner: miner,
                    reward: reward
                }
                blocks.push(data);
            }

            let totalPages = Math.ceil(blocks.length / SIZE);
            const mod = blocks.length % SIZE;
            if (page > totalPages) page = totalPages;

            let result;
            const idx = (page - 1) * 10;
            if (idx === 0) idx += 1;
            let sub = 0;
            if (page === totalPages && page === 1) sub = 1
            if (page === totalPages) {
                result = blocks.slice(idx, idx + mod - sub);
            } else {
                result = blocks.slice(idx, idx + SIZE);
            }

            res.status(200).json({
                message: 'OK',
                data: result,
                curPage: page,
                totalPages: totalPages
            });
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    }
}