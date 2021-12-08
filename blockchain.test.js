import { Blockchain } from "./blockchain";

test('creates a genesis block', () => {
  const testChain = new Blockchain;
  const testBlock = {timestamp: Date.now(), hash: '', prevHash: '', toAddress: 'genesis-block', fromAddress: '', amount: 0}
  testBlock.hash = testChain.calculateHash(timestamp + prevHash + toAddress + fromAddress + amount);
  expect(testChain.addGenesisBlock).toEqual(testBlock)
});