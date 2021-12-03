const { Blockchain, Block } = require('./blockchain');

const chain = newBlockchain(1);



for (const block of chain) {
  console.log(block);
};
