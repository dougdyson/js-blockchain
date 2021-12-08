const { Wallet } = require('./wallet');
const { Blockchain } = require('./blockchain');

const fromWallet = new Wallet('4d545846f94d031cf5682607f72f98106b29735802a350376a0c84f35bdb1a42')
const toWallet   = new Wallet('e64c724907b31a43496df63d8634049c71129de932a80617dbd0672ed5e8a16b');

const transaction = fromWallet.newTransaction(toWallet.publicKey, 50);

const blockchain = new Blockchain;

blockchain.addPendingTransaction(transaction);

blockchain.minePendingTransactions(toWallet.publicKey);

blockchain.minePendingTransactions(toWallet.publicKey);

blockchain.getAddressBalance(toWallet.publicKey); //?

blockchain