// The standard JavaScript environment provides another data structure called
// Set . Like an instance of Map, a set holds a collection of values. Unlike Map,
// it does not associate other values with those—it just tracks which values
// are part of the set. A value can be part of a set only once—adding it again
// doesn’t have any effect.
// Write a class called Group (since Set is already taken). Like Set , it has add ,
// delete , and has methods. Its constructor creates an empty group, add adds a
// value to the group (but only if it isn’t already a member), delete removes its
// argument from the group (if it was a member), and has returns a Boolean
// value indicating whether its argument is a member of the group.
// Use the === operator, or something equivalent such as indexOf , to deter-
// mine whether two values are the same.
// Give the class a static from method that takes an iterable object as argu-
// ment and creates a group that contains all the values produced by iterating
// over it.

// Class group definition
class Group
{
    // Initializes empty group
    constructor()
    {
        this.contents = [];
        this.size = 0;
    }

    // Adds a value
    add(value)
    {
        // Assure value is not in group
        if ((this.contents.indexOf(value)) === (-1))
        {
            this.contents.push(value);
            this.size++;
        }
    }

    // Deletes a value
    delete(value)
    {
        // Return index of value in contents array, or -1 if it doesn´t exist
        let index = this.contents.indexOf(value);

        // If value exists in contents array, remove it
        if (index !== -1)
        {
            this.contents.splice(index, 1);
            this.size--;
        }
    }

    // Returns the size of contents array
    get length()
    {
        return this.size;
    }

    // Checks whether value is in contents array
    has(value)
    {
        return this.contents.includes(value);
    }
    
    // (iterable) => (group containing values produced by iterating over iterable)
    static from(iterable)
    {
        // Create new group
        let g = new Group;

        // Iterate over iterable
        for (let element of iterable)
        {
            // Add each item you iterate over to group
            g.add(element);
        }

        // Return the now-filled group
        return g;
    }
}