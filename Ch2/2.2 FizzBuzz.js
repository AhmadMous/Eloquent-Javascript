// Write a program that uses console.log to print all the numbers from 1 to 100,
// with two exceptions. For numbers divisible by 3, print "Fizz" instead of the
// number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.
// When you have that working, modify your program to print "FizzBuzz"
// for numbers that are divisible by both 3 and 5 (and still print "Fizz" or
// "Buzz" for numbers divisible by only one of those).

for (let i=1; i <=100; i++){ //loop 100 times
    let text = "";           //create empty string for each iteration
    if ((i%3)==0){           //if it's a multiple of 3 add Fizz to string
      text += "Fizz";}
    if ((i%5)==0){
      text += "Buzz";}       //if it's a multiple of 5 add Buzz to string
    if (text==0){
      console.log(i);}       //if it's an empty string just print the number
    else{
      console.log(text);}    //if it isn't an empty string then print it
  }