// Analogous to the some method, arrays also have an every method. This one
// returns true when the given function returns true for every element in the
// array. In a way, some is a version of the || operator that acts on arrays, and
// every is like the && operator.
// Implement every as a function that takes an array and a predicate func-
// tion as parameters. Write two versions, one using a loop and one using the
// some method.

// Iterative method using a for loop
function every(array, test) {

    // Loop over elements
    for (let i = 0; i < array.length; i++)
    {

        // Test returns false for at least one element
        if (!test(array[i]))
        {
            return false;
        }
    }

    // No element fails the test
    return true;
  }


// If it fails for some item, return false
function every(array, test)
{
    return !array.some(item => !test(item));
}