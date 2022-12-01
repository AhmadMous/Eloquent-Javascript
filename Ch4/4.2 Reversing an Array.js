// write two functions,
// reverseArray and reverseArrayInPlace . The first, reverseArray , takes an array
// as argument and produces a new array that has the same elements in the
// inverse order. The second, reverseArrayInPlace , does what the reverse
// method does: it modifies the array given as argument by reversing its ele-
// ments. Neither may use the standard reverse method.
// Thinking back to the notes about side effects and pure functions in
// “Functions and Side Effects” on page 54, which variant do you expect to be
// useful in more situations? Which one runs faster?


// Create new reversed array and return it
reverseArray = function(arr)
{

    // Create new array of same length as old array
    let length = arr.length;
    let newarr = Array(length);

    // Loop over new array inserting elements in reverse order
    for(let i = 0; i < length; i++)
    {
        newarr[i] = arr[length - 1 - i];
    }

    // Return new reversed array
    return newarr;
}

// Reverses array without creating a new array
function reverseArrayInPlace(arr)
{
    // Limit prevents us from traversing more than half the array
    let length = arr.length;
    let limit = Math.floor(arr.length / 2);

    // Traverse half the array, reversing elements with other half
    for (let i = 0; i <= limit; i++)
    {
        let temp = arr[i];
        arr[i] = arr[length - i - 1];
        arr[length - i - 1] = temp;
    }

    return arr;
}