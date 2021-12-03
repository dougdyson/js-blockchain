const { newBlockchain, newBlock } = require('./blockchain');

const chain = newBlockchain(1);

const addBlock = (transaction) => {
  const lastHash = chain[chain.length - 1].hash;
  chain.push(newBlock(transaction, lastHash));
};

addBlock('second block');

for (const block of chain) {
  console.log(block);
};
