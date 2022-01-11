// Say you have a function primitiveMultiply that in 20 percent of cases mul-
// tiplies two numbers and in the other 80 percent of cases raises an excep-
// tion of type MultiplicatorUnitFailure . Write a function that wraps this clunky
// function and just keeps trying until a call succeeds, after which it returns the
// result.
// Make sure you handle only the exceptions you are trying to handle.



// class MultiplicatorUnitFailure extends Error {}

// function primitiveMultiply(a, b) {
//   if (Math.random() < 0.2) {
//     return a * b;
//   } else {
//     throw new MultiplicatorUnitFailure("Klunk");
//   }
// }

// (number, number) -> (number)
function reliableMultiply(a, b) {
    // for an infinite loop
    for (;;){
        // try to simply return other function
        try {
            return primitiveMultiply(a,b);
        }
        // if there is an error
        catch (error) {
            // if its not an instance of error we expected in primitiveMultiply
            if (!(error instanceof MultiplicatorUnitFailure)){
                // then throw it
                throw error;
            }
        }
    }
}