// Write a range function that takes two arguments, start and end , and
// returns an array containing all the numbers from start up to (and includ-
// ing) end .
// Next, write a sum function that takes an array of numbers and returns the
// sum of these numbers. Run the example program and see whether it does
// indeed return 55.
// As a bonus assignment, modify your range function to take an optional
// third argument that indicates the “step” value used when building the array.
// If no step is given, the elements go up by increments of one, corresponding
// to the old behavior. The function call range(1, 10, 2) should return [1, 3, 5,
// 7, 9] . Make sure it also works with negative step values so that range(5, 2, -1)
// produces [5, 4, 3, 2] .
// i[0] -- 5, i[1] -- 4, i[3] -- 3,i[4] -- 2

// Note: this does not cover edge cases
range = (start, end, step = 1) =>
{
	// Initialize empty array
	let array = []; 

	// Iterate over numbers, by starting with "start" and adding "step"
	for (let number = start;; number += step)
	{
		// Add current number to array
		array.push(number);

		// Once number equals end boundary and is added, break out of loop
		if (!(number - end))
		{
			break;
		}
	}

// Return array representing the range
return array;
}

// Loop over array adding every number to total
function sum(array)
{
	let sumTotal = 0;
	for (let i = 0; i < array.length; i++)
	{
		sumTotal += array[i];
	}
	
	return sumTotal;
}