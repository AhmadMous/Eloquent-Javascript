// Numbers Again
// Write an expression that matches only JavaScript-style numbers. It must sup-
// port an optional minus or plus sign in front of the number, the decimal dot,
// and exponent notation— 5e-3 or 1E10 —again with an optional sign in front
// of the exponent. Also note that it is not necessary for there to be digits in
// front of or after the dot, but the number cannot be a dot alone. That is, .5
// and 5. are valid JavaScript numbers, but a lone dot isn’t.

// The solution has been tested on https://eloquentjavascript.net/code/#9.3

let number = /^[+-]?((\d+(\.\d*)?)|(\d*\.\d+))([eE][+-]?\d+)?$/;

// Pattern matching breakdown
// ^: signifies start of string, on the other side $ signifies its end
// [+-]?: any item or sign in the set is optional, and can be matched
// $1, $2, and $3 are called subgroupings or capture groups
// $1: (\d+(\.\d*)?): 1 or more digits, followed by a possible period and 0 or more digits
// $2: (\d*\.\d+): 0 or more digits, followed by a period, and 1 or more digits
// $3: ([eE][+-]?\d+): either E or E, a possible sign, and 1 or more digits

// either $1 matches or $2 (since | between them), but not both, making a lone period fail the match
// $3 is optional (since its followed by ?), it can match or be omitted