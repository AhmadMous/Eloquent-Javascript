// write two functions,
// reverseArray and reverseArrayInPlace . The first, reverseArray , takes an array
// as argument and produces a new array that has the same elements in the
// inverse order. The second, reverseArrayInPlace , does what the reverse
// method does: it modifies the array given as argument by reversing its ele-
// ments. Neither may use the standard reverse method.
// Thinking back to the notes about side effects and pure functions in
// “Functions and Side Effects” on page 54, which variant do you expect to be
// useful in more situations? Which one runs faster?

reverseArray = function(arr)
{

    let length = arr.length;
    let newarr = Array(length);

    console.log(newarr);

    for(let i = length - 1; i >= 0; i--)
    {  // traverse initial array from the end
        newarr.push(arr[i]);               // pushing the values to start of new array
    }
    console.log(newarr);

    return newarr;
}

swap = function(x, y)
{
    temp = [x, y]
    let z = x;
    x = y;
    y = z;
}

function reverseArrayInPlace(arr)
{
    let length = arr.length;
    let limit = arr.length / 2;

    for (let i = 0; i <= limit; i++)
    {
        console.log(arr[i], arr[length -1 - i]);
        swap(arr[i], arr[length - i]);
        console.log(arr[i], arr[length -1 - i]);
    }
    return arr;
}
