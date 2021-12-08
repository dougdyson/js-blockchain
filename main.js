const { Wallet } = require('./wallet');
const { Blockchain } = require('./blockchain');

const fromWallet = new Wallet('4d545846f94d031cf5682607f72f98106b29735802a350376a0c84f35bdb1a42')
const toWallet = new Wallet('e64c724907b31a43496df63d8634049c71129de932a80617dbd0672ed5e8a16b');

const toAddress = toWallet.publicKey;
const fromAddress = fromWallet.publicKey;

const blockchain = new Blockchain; //?

const tx1 = fromWallet.newTransaction(toAddress, 50);

tx1 //?

blockchain.addPendingTransaction(tx1);

blockchain.minePendingTransactions(toAddress);

blockchain.minePendingTransactions(toAddress); //?

blockchain.getAddressBalance(toAddress); //?

blockchain