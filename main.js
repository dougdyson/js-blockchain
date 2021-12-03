const { Blockchain } = require('./blockchain');

const powDifficulty = 1
const blockchain    = new Blockchain(powDifficulty);

blockchain.chain; //?
blockchain.addBlock('second block');
