const { createHmac } = require('crypto');

const blockchain = [];

const calculateHash = (data) => createHmac('sha256', 'secret').update(data).digest('hex');

// add a new block
const newBlock = (data) => {
  const id        = blockchain.length - 1;
  const timestamp = Date.now();
  const prevHash  = (blockchain.length === 0) ? null : blockchain[blockchain.length - 1].hash
  const nonce     = Math.floor(Math.random() * id)
  const hash      = calculateHash(id + timestamp + prevHash + data);
  return {id, timestamp, prevHash, nonce, hash, data}
}

// create genesis block
blockchain.push(newBlock('genesis block'));

// create some more blocks
blockchain.push(newBlock('second block'));
blockchain.push(newBlock('third block'));
blockchain.push(newBlock('fourth block'));


// =============================================
// TESTING
// =============================================
const bc = blockchain[1];

bc.data; //?
bc.hash //?

bc.data = 'hack';
bc.data; //?
const hashableFields = bc.id + bc.timestamp + bc.prevHash + bc.data;
const hack = calculateHash(hashableFields); //?

(bc.hash === hack) ? true : false //?