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

        // update list blocks realtime
        socket.on('new-block-mined', () => {
            socket.broadcast.emit('reload-list-blocks');
        });

        // update list transactions realtime
        socket.on('new-transaction-created', () => {
            socket.broadcast.emit('reload-list-transactions');
        });
    }
}