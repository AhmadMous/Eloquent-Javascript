// Write a function that computes the dominant writing direction in a string of
// text. Remember that each script object has a direction property that can be
// "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).
// The dominant direction is the direction of a majority of the characters
// that have a script associated with them. The characterScript and countBy func-
// tions defined earlier in the chapter are probably useful here.


// Form of script
// {
//     name: "Coptic",
//     ranges: [[994, 1008], [11392, 11508], [11513, 11520]],        
//     direction: "ltr",
//     year: -200,
//     living: false,
//     link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
// }


// Function: find to which script object code belongs to, if none then return null
// (character code) => script object
function characterScript(code)
{
    // Loop over possible scripts
    for (let script of SCRIPTS)
    {

        // Check if code is included in a script's possible ranges
        if (script.ranges.some(([from, to]) => {           
            return code >= from && code < to;
        }))

        // Return matching scipt
        {
            return script;
        }
    }

    return null;
}


// Function: make counted groups out of a collection
// (collection) => objects specifying groupnames and counts of each group
function countBy(items, groupName)
{

    // Create new array to store counts
    let counts = [];                                        
    for (let item of items)
    {

        // groupName creates a name for group element belongs to
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);

        // name not in array, push it in
        if (known == -1)
        {
            counts.push({name, count: 1});
        }

        // name is in array, increment it
        else
        {
            counts[known].count++;
        }
    }

    return counts;
}

 // Return dominant direction of the text
function dominantDirection(text)
{

    // Group values according to their direction
    let groupName = (char) =>
    {
        // Return script object if it exists, or null if it doesn't
        let script = characterScript(char.codePointAt(0));

        // If script exists, return its direction, else return none
        return script? script.direction : "none"; 
    }

    // Create counted groups using countBy
    let scripts = countBy(text, groupName);

    // Filter out irrelevant code that has no direction
    let filteredScripts = scripts.filter(({name}) => name != "none")

    // Return object with higher count
    function highest(obja, objb)
    {
        if (obja.count > objb.count)
        {
            return obja;
        }
        else
        {
            return objb;
        }
    }

    // Reduce to object with highest count,and return its name
    return filteredScripts.reduce(highest ,{name: "none", count: 0}).name;
 }