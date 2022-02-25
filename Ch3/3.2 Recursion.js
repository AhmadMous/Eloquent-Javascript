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

function isEven(x)
{
  // 0 remaining means number is even
  if (x == 0)
  {
    return true;
  }

  // 1 remaining means number is odd
  if (x == 1)
  {
    return false;
  }

  // Convert negative numbers to positive then call function again
  if (x < 0)
  {
    return isEven(x * -1);
  }

  // Reduce the size of the problem then call function again
  return isEven(x - 2); 
}