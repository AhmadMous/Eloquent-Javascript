// Analogous to the some method, arrays also have an every method. This one
// returns true when the given function returns true for every element in the
// array. In a way, some is a version of the || operator that acts on arrays, and
// every is like the && operator.
// Implement every as a function that takes an array and a predicate func-
// tion as parameters. Write two versions, one using a loop and one using the
// some method.

function every(array, test) {
    for (let i = 0; i < array.length; i++){
        if (!test(array[i])) return false;
    }
    return true;
  }

function every(array, test){                  // every returns true when no element in array returns false when tested
    return !array.some(item => !test(item));  // it is enough for one item to fail the test or succeed !test for some to return true for the some function
}                                             // then ! will make that true false, 1 fail then every is false
                                              // meanwhile if some returns false then that false will be changed to true because if none fails then all pass