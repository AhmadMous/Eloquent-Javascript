// The values added to the top scope must be functions

// Group arguments into an array using rest notation and return it
topScope.array = (...values) => values;

// Method for checking length simply activates length method on javascript array prototype
topScope.length = array => array.length;

// Function that accepts an array and index and returns the item in that array at input index
topScope.element = (array, i) => array[i];