// Write a program that uses console.log to print all the numbers from 1 to 100,
// with two exceptions. For numbers divisible by 3, print "Fizz" instead of the
// number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.
// When you have that working, modify your program to print "FizzBuzz"
// for numbers that are divisible by both 3 and 5 (and still print "Fizz" or
// "Buzz" for numbers divisible by only one of those).

// Loop 100 times using "number", starting from 1 till 100, inclusive
for (let number = 1; number <= 100; number++)
{
  // Create new empty string for the new number
  let text = "";

  // 3 divides number -> number is a multiple of 3
  if ((number % 3) == 0)
  {           
    // Concatanate "Fizz" to text variable
    text += "Fizz";
  }

  // 5 divides number -> number is a multiple of 5
  if ((number % 5) == 0)
  {
    // Concatanate "Buzz" to text variable
    text += "Buzz";
  }

  // text -> true if (text != ""), aka multiple of 3, 5, or both
  if (text)
  {
    console.log(text);
  }

  // "number" is a multiple of neither, just print it
  else
  {
    console.log(number);
  }

  // Succint version of last if, else: console.log(text || number);
  // If text -> true, text is printed and OR (||) will short circuit
  // If text -> false, number will be used as a fall back value
  // Short circuit: an operator(like || here) returns after first sufficient value (true for example)
}