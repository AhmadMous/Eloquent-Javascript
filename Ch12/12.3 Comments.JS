// Function that skips spaces AND comments
function skipSpace(string) {

    // Matches starting spaces or comments repeatedly till these run out
    let skippable = string.match(/^(\s|#.*)*/);

    // Return the string with wholev match of skipper charachters removed
    return string.slice(skippable[0].length);
  }