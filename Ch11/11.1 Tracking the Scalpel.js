// Pretty much the same as the solution, this is simply LL traversal
async function locateScalpel(nest)
{
    // Get name of first nest
    let current = nest.name;
    while(1)
    {
        let next = await anyStorage(nest, current, "scalpel");

        // Node storage points to itself, scalpel found!
        if (next == current) return current;

        // Update nest to next name to next one
        current = next;
    }
}

// 
function locateScalpel2(nest)
{
    // Helper function that recursively traverses the path
    function recurse(current)
    {
        // Access storage of current nest
        return anyStorage(nest, current, "scalpel")

        // If storage points to same nest, return current nest name
        .then(next => {
            if (next == current) return current;
            else return recurse(next);
        })
    }

    // Execute the helper function
    return recurse(next.loop)
}