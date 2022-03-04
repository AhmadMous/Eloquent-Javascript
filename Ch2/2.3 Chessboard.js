// Write a program that creates a string that represents an 8×8 grid, using new-
// line characters to separate lines. At each indicator of the grid there is either a
// space or a # character. The characters should form a chessboard.

// When you have a program that generates this pattern, define a binding
// size = 8 and change the program so that it works for any size , outputting a
// grid of the given width and height.

// Start with an empty string
let text = "";

// Indicates whether we print " " or "#", to create alternating pattern
let indicator = 1;

// Size of the chessboard
let size = 8;

// Loop with i for number of rows
for (let i = 1; i <= size; i++)
{
	// Loop with j for number of columns, aka length of row
	for (let j = 1; j <= size; j++)
	{
		// If indicator is odd, print " "
		if (indicator % 2)
		{
			text += " ";
		}

		// Else print "#"
		else
		{
			text += "#";
		}

		// Increment indicator after every character in row, to switch parity
		indicator++;
	}

	// Add a new line to string after we are done with row
	text += "\n";

	// Increment indicator after every new line
	indicator++;
}

// Print our resultant string
console.log(text);
