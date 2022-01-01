// Write a function that computes the dominant writing direction in a string of
// text. Remember that each script object has a direction property that can be
// "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).
// The dominant direction is the direction of a majority of the characters
// that have a script associated with them. The characterScript and countBy func-
// tions defined earlier in the chapter are probably useful here.

// {
//     name: "Coptic",
//     ranges: [[994, 1008], [11392, 11508], [11513, 11520]],        // this is what a script object looks like
//     direction: "ltr",
//     year: -200,
//     living: false,
//     link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
// }

function characterScript(code) {                           // Input: character code
    for (let script of SCRIPTS) {                          // Output: script object
        if (script.ranges.some(([from, to]) => {           // function: find to which script object code belongs to, if none then return null
            return code >= from && code < to;
     }))    {
            return script;
            }
        }
    return null;
  }

function countBy(items, groupName) {                        // Inputs: A collection, a function that defines groupnames
    let counts = [];                                        // output: array of objects specifying groupnames and counts of each group
    for (let item of items) {                               // function: make counted groups out of a collection
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1) {
            counts.push({name, count: 1});
        } else {
            counts[known].count++;
        }
    }
    return counts;
}

 // we need 3 groups ttb, rtl, and ltr..e.g. object {name: ltr, count: 13}

function dominantDirection(text){
    let scripts = countBy(text, char => {                           // we want to make a counted group called scripts using countBy
        let script = characterScript(char.codePointAt(0));          // the function for naming must return possibilities for each script direction (rtl, ltr, and ttb)
        return script? script.direction : "none";                   // a matched script returns its direction and the name prop of an object will hold it
    }).filter(({name}) => name != "none");                          // the group "none" is for characters not part of a script, these don't help in figuring dominant direction so we filter them out

    function highest(obja,objb){                                    // creating a function to compare objects and return the one with highest count, aka mostly used direction
        if (obja.count > objb.count) return obja;                   
        else return objb;
    }
    let answer = scripts.reduce(highest ,{name: "none", count: 0}); // create answer to be the object which is one with highest count, we find it by reducing scripts with highest function
    return answer.name;                                             // we return this object's name property value, which is either ltr, rtl, or ttb
 }