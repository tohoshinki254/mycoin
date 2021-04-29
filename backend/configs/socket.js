const blockchain = require('../src/main').blockchain;
const transactions = require('../src/main').transactions;

module.exports = {
    configSocket: async (socket, io) => {
        socket.on('get-block-list', async () => {
            socket.emit('block-list', blockchain.chain);
        });

        socket.on('get-transaction-list', async () => {
            socket.emit('transaction_list', transactions);
        });

        
    }
}