const { Blockchain } = require('./blockchain');


const simplechain = new Blockchain;

simplechain.addTransaction('Bob', 'Alice', 100);

simplechain.addTransaction('Alice', 'Bob', 150);

console.log(simplechain);

console.log(simplechain.getAddressBalance('Bob'));  //?
