const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

/**
 * @returns {string}
 */
const createWallet = () => {
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
}

module.exports = { createWallet };