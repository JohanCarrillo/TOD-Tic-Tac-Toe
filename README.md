# TOD-Tic-Tac-Toe
This project was made as a proposed exercise in The Odin Project. The purpose 
of the project was to put in practice the acquired concepts in factory functions.

## How to use
The rules of the game are the common ones, the first player to align 3 of its
symbols in a row, column or diagonal wins.
The game starts randomly selecting between the player or the computer. All the 
computer plays are done selecting randomly an empty box from the game board, the 
decision of the computer has a delay of 0.3 seconds, so if it initially chose a
marked box it has to make the selection again until it finds an empty box, so 
please be patience if you that the computer play is taking a bit.
If you want to replay just click the replay button at the end of the match.

## Technical aspects and personal conclusions
Since javascript doesn't really have an OO environment, the factory functions 
dynamics is a powerful alternative. It simmulates private and public properties
and methods, it lets you inherate from other function factories, and you don't 
have to deal with the prototype thing that I'm still struggling with.

## Future purposes
Initially the game was intended to have 2 more features, one that allow the player
to set a nickname and choose it's own symbol. The other was to program an AI that
is harder to beat that just the random selection it has now.
This two things weren't implemented due to my lack of knowledge and my still newby
programming habiities, also the time it took to just create this simple version 
of the program was more than I planed due to my struggling with many things
that were new to me and the way javascript works (it is an asynchronous language,
which is something completely new to me).