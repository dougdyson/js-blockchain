const { Wallet } = require('./wallet');
const { Blockchain } = require('./blockchain');

const minerWallet = new Wallet('4d545846f94d031cf5682607f72f98106b29735802a350376a0c84f35bdb1a42');
const someWallet  = new Wallet('e64c724907b31a43496df63d8634049c71129de932a80617dbd0672ed5e8a16b');

const blockchain = new Blockchain('BTC', 100);

blockchain.minePendingTransactions(minerWallet.publicKey);

const transaction = minerWallet.newTransaction(someWallet.publicKey, 50);

blockchain.addPendingTransaction(transaction);

blockchain.minePendingTransactions(minerWallet.publicKey);
blockchain.minePendingTransactions(minerWallet.publicKey);

blockchain.getAddressBalance(minerWallet.publicKey); //?
blockchain.getAddressBalance(someWallet.publicKey); //?

blockchain;//?