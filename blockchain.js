const { createHmac } = require('crypto');

const blockchain = [];

const calculateHash = (data) => createHmac('sha256', 'secret').update(data).digest('hex');

// add a new block
const newBlock = (data) => {
  const id        = blockchain.length - 1;
  const timestamp = Date.now();
  const prevHash  = (blockchain.length === 0) ? null : blockchain[blockchain.length - 1].hash
  const nonce     = Math.floor(Math.random() * id)
  const hash      = calculateHash(id + prevHash + nonce + data).toString();
  return {id, timestamp, prevHash, nonce, hash, data}
}

// create genesis block
blockchain.push(newBlock({description: 'genesis block'}));

// create some more blocks
blockchain.push(newBlock({description: 'second block'}))
blockchain.push(newBlock({description: 'third block'}))
blockchain.push(newBlock({description: 'fourth block'}))


// =============================================
// TESTING
// =============================================

// HACK TEST
// here's the block hash
const bc = blockchain[1]
const hashableFields = (bc.id + bc.timestamp + bc.prevHash + bc.nonce + bc.data).toString()
bc.hash; //?

// hack the genesis block data!
bc.data.description = 'hack'; //?
const hackHash = calculateHash((hashableFields).toString())
hackHash

// hash won't match for hacked data
bc.hash != calculateHash(hashableFields) //?

// PREVIOUS HASH CHECK
