// this file is just a debugging exercise (but I learned some stuff too!)

const { createHmac } = require('crypto');

// why array? debugging a blockchain issue in another file
const array = [];

const calculateHash = (data) => createHmac('sha256', 'secret').update(data).digest('hex');

// add a block!
array.push({hash: calculateHash('a').toString(), data: 'a'});

// here's the hash
array[0]; //?

// hack the block data!
array[0].data = 'b';
calculateHash('b'); //?
// hash won't match for hacked data
(array[0].hash != calculateHash(array[0].data)) //?