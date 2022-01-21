# js-blockchain
Super simple blockchain (simulating network consensus)

[x] learn blockchain fundamentals
[X] transaction flow
[] ethereum vs blockchain vs cadence <-- good idea!
[] conduct experiments?

## A Story of a Tool and a Rabbit Hole
I use Quokka, which is an awesome inline real-time JS evaluation tool, allowing me see variable values right in the IDE in real time without having to console.log out.

However, after some hours, I discovered Quokka updates use both Date.now() and Math.random() and reinterpret my code every keystroke, which defeats the purpose.

## Classes
I used OOP with a blockchain class, instead of a functional approach. This was due to having to reference the previous hash, which is the last element in the array. As per some examples, classes make app development speedy when done but feel there is more code than necessary. Tripped up more than once by missing a 'this'.  If I refactored this project, it would be with a functional programming approach.

## Next Steps
Going to take this code and create a React front-end, with Jest tests and Storybook. Will refactor to functional programming from classes.

Also, going to have some fun with mining and make it so that the user has to press a button a number times, depending upon the blockchain's PoW difficulty. A great opportunity to incorporate some fun animations too! Plus drag-and-drop between wallets would be cool! Need a way to display pending transactions in the design.

Also, make sure to check pendingTransactions when getting available balance for an address. How is this done in Bitcoin? Ethereum?

Maybe examine PoS!
