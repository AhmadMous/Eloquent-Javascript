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
    let newarr = [];
    for(let i=arr.length-1; i >= 0; i--){
        newarr.push(arr[i]);
    }
    return newarr;
}

function reverseArrayInPlace(arr){
    arr = reverseArray(arr);
    return arr;
}
