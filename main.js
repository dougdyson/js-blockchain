const { Wallet } = require('./wallet');
const { Blockchain } = require('./blockchain');

// pass in private key to create a new wallet
const minerWallet = new Wallet('4d545846f94d031cf5682607f72f98106b29735802a350376a0c84f35bdb1a42');
const toWallet    = new Wallet('e64c724907b31a43496df63d8634049c71129de932a80617dbd0672ed5e8a16b');

// pass initial pow difficulty to create new blockchain
const blockchain = new Blockchain('SMPL', 1, 100);

// mine and reward
blockchain.minePendingTransactions(minerWallet.publicKey);
blockchain.minePendingTransactions(minerWallet.publicKey);

// sign transaction to transfer amount between wallets
const transaction = minerWallet.signTransaction(toWallet.publicKey, 50);

// make transfer transaction pending for mining
// TODO: make this an array
blockchain.addPendingTransaction(transaction);

blockchain.minePendingTransactions(minerWallet.publicKey);
blockchain.getAddressBalance(minerWallet.publicKey); //?
blockchain.getAddressBalance(toWallet.publicKey); //?

// console log blockchain data
console.log(blockchain);