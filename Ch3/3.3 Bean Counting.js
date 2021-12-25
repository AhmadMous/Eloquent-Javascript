// Write a function countBs that takes a string as its only argument and
// returns a number that indicates how many uppercase “B” characters there
// are in the string.


function countBs(string){     //old function only counts Bs
    n = string.length;
    counter = 0;
    for (let i=0; i<n ;i++){
      if (string[i] === "B"){
        counter++;
      }
    }
    return counter;
  }

  function countChar(string, target){   //new general function
    n = string.length;                  //count number of characters in string
    counter = 0;                        //counter for repetition of target character
    for (let i=0; i<n ;i++){            //iterate over all characters un string
      if (string[i] === target){
        counter++;                      //if there's a match, increment counter
      }
    }
    return counter;                     //return number of times target char repeated
  }

  function countBs(string){            //reworked CountBs that calls countChar
    return countChar(string, "B")      //function returns what countChar returns with target being B
  }