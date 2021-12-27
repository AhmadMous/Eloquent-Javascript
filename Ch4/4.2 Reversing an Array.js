// write two functions,
// reverseArray and reverseArrayInPlace . The first, reverseArray , takes an array
// as argument and produces a new array that has the same elements in the
// inverse order. The second, reverseArrayInPlace , does what the reverse
// method does: it modifies the array given as argument by reversing its ele-
// ments. Neither may use the standard reverse method.
// Thinking back to the notes about side effects and pure functions in
// “Functions and Side Effects” on page 54, which variant do you expect to be
// useful in more situations? Which one runs faster?

reverseArray = function(arr){
    let newarr = [];                       // initialize new array
    for(let i=arr.length-1; i >= 0; i--){  // traverse initial array from the end
        newarr.push(arr[i]);               // pushing the values to start of new array
    }
    return newarr;                         // return the new array
}

function reverseArrayInPlace(arr){         // it's more practical to use function than create new one
    arr = reverseArray(arr);               // but we can traverse from start filling end or vice versa
    return arr;                            // reaching the middle, using a temp var for swapping
}
