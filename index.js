const { createHash } = require('crypto');

const hash = createHash('sha256');

// create genesis block
const block = [{id: '1', timestamp: Date.now(), data: [{description: 'genesis block'}], hash: '', prevHash: 0}]

const blockHash = block[0].id + block[0].prevHash + block[0].timestamp + block[0].data.toString();  

hash.update(blockHash)//?
block[0].hash = hash.digest('hex'); //?

block[0] //?