// Use the reduce method in combination with the concat method to “flatten”
// an array of arrays into a single array that has all the elements of the original
// arrays.
// var arrays = [[1, 2, 3], [4, 5], [6]];
// → [1, 2, 3, 4, 5, 6]

let newarr = arrays.reduce((a,b) => a.concat(b), []); // reduce the arrays with concat as a combination 
                                                      // and an empty array as a start point