const newBlockchain = require('./blockchain');
const addBlock      = require('./blockchain');

const bc = newBlockchain(1); //?

bc.push(addBlock('second block', bc));

bc[1]; //?

