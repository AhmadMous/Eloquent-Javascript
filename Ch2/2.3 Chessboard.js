// Write a program that creates a string that represents an 8×8 grid, using new-
// line characters to separate lines. At each position of the grid there is either a
// space or a # character. The characters should form a chessboard.

// When you have a program that generates this pattern, define a binding
// size = 8 and change the program so that it works for any size , outputting a
// grid of the given width and height.

let text = "";
let counter = 1;                //this counter keeps track of where we are
let size = 8;
for (let i=1; i<=size; i++){    //must loop size (8) times, once for every row
  for (let j=1; j<=size; j++){  //must loop again for same number of columns
  	if (counter%2){             // if we are at an even tile
  		text += " ";}           //then print an empty space
  	else{                       //
    	text += "#";}           //else print a #
    counter++;                  //increment counter after every print
  }
  	text += "\n";               //add a new line char after every line is finished
	counter++;}                 //add to the counter after every line
	console.log(text);          //so that the rows are alternating
