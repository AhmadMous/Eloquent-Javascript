// Here’s another way to define whether a positive whole number is even
// or odd:
// • Zero is even.
// • One is odd.
// • For any other number N, its evenness is the same as N − 2.
// Define a recursive function isEven corresponding to this description.
// The function should accept a single parameter (a positive, whole number)
// and return a Boolean.
// Test it on 50 and 75. See how it behaves on −1. Why? Can you think of a
// way to fix this?
// console.log(isEven(50));
// // → true
// console.log(isEven(75));
// // → false
// console.log(isEven(-1));
// // → ??

function isEven(x){
    if (x < 0)
      return isEven(x*-1); //if it's negative convert it to positive then call function again
    if (x == 0)
      return true;
    else if (x == 1)
      return false;
    else return isEven(x-2); //if it's neither 0 nor 1 calling function with (x-2) will yield same result.
  }