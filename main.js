const { newBlockchain, addBlock } = require('./blockchain');

const chain = newBlockchain(1);

const newBlock = (transaction) => {
  const lastHash = chain[chain.length - 1].hash;
  chain.push(addBlock(transaction, lastHash));
};

newBlock('second block');

for (const block of chain) {
  console.log(block.transaction);
};
