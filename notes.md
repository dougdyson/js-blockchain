# js-blockchain
Super simple blockchain (simulating network consensus)

[x] learn blockchain fundamentals
[X] transaction flow
[] ethereum vs blockchain vs cadence
[] conduct experiments?

## A Story of a Tool and a Rabbit Hole
I use Quokka, which is an awesome inline real-time JS evaluation tool, allowing me see variable values right in the IDE in real time without having to console.log out.

However, after some hours, I discovered Quokka updates use both Date.now() and Math.random().

## Classes
I used OOP with a blockchain class, instead of a functional approach. This was due to having to reference the previous hash, which is the last element in the array. Classes make app development speedy when done but feel there is more code than necessary. Tripped up more than once by missing a 'this'.  If I refactored this project, it would be with a functional programming approach.

## Next Steps
Going to take this code and create a React front-end, with Jest tests and Storybook.
