// Write a function countBs that takes a string as its only argument and
// returns a number that indicates how many uppercase “B” characters there
// are in the string.

// Old function only counts Bs
function countBs(string)
{
  // Counts number of times 'B' is found in string
  counter = 0;
  
  // Loop over the string's characters
  for (let i = 0; i < string.length ; i++)
  {
    // If a character === "B"
    if (string[i] === "B")
    {
      // Increment counter
      counter++;
    }
  }

  // After last iteration, return the counter
  return counter;
}

// General character counting function
function countChar(string, target)
{
  // Counts number of times target is found in string
  counter = 0;

  // Loop over the string's characters
  for (let i = 0; i < string.length ; i++)
  {
    // If a character === target
    if (string[i] === target)
    {

      // Increment counter
      counter++;
    }
  }

  // After last iteration, return the counter
  return counter;
}

// Reworked CountBs that calls countChar with "B" as target
function countBs(string)
{
  return countChar(string, "B")
}