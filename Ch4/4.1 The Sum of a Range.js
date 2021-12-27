// Write a range function that takes two arguments, start and end , and
// returns an array containing all the numbers from start up to (and includ-
// ing) end .
// Next, write a sum function that takes an array of numbers and returns the
// sum of these numbers. Run the example program and see whether it does
// indeed return 55.
// As a bonus assignment, modify your range function to take an optional
// third argument that indicates the “step” value used when building the array.
// If no step is given, the elements go up by increments of one, corresponding
// to the old behavior. The function call range(1, 10, 2) should return [1, 3, 5,
// 7, 9] . Make sure it also works with negative step values so that range(5, 2, -1)
// produces [5, 4, 3, 2] .
//i[0] -- 5, i[1] -- 4, i[3] -- 3,i[4] -- 2

range = (start, end, step = 1) =>{
 let arr = [];                                  // initialize empty array
 n = Math.abs(end - start);                     // find distance between two points
 for(let i=0; i<=(n/Math.abs(step)); i++){      // iterate over array for the number of steps needed to cover the distance
     if (i==0){                                 // if this is the first item in array, make it equal start            
         arr.push(start);
     }
     else{                                      // else the item must equal previous item + the steps
        arr.push(arr[i-1]+step);
     }
 }
return arr;                                     // return array representing the range
}

function sum(arr){                              // iterates over array adding every number to a sumt variable representing total and returning that
    let sumt = 0;
    for (let i = 0; i<arr.length; i++){
        sumt += arr[i];
    }
    return sumt;
}