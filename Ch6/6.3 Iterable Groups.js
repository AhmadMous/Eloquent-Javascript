// Make the Group class from the previous exercise iterable. Refer to the section
// about the iterator interface earlier in the chapter if you aren’t clear on the
// exact form of the interface anymore.
// If you used an array to represent the group’s members, don’t just return
// the iterator created by calling the Symbol.iterator method on the array. That
// would work, but it defeats the purpose of this exercise.
// It is okay if your iterator behaves strangely when the group is modified
// during iteration.

class Group
{
    // Constructor of empty group
    constructor()
    {
        this.contents = [];
        this.size = 0;              
    }

    // Adds a value to the group
    add(value)
    {
        // If value isn´t in group, add it
        if ((this.contents.indexOf(value)) === (-1))
        {
            this.contents.push(value);
            this.size++;
        }
    }

    // Deletes value from a group
    delete(value)
    {
        // Find possible index of value in contents array
        let index = this.contents.indexOf(value);

        // If it does exist, remove it
        if (index !== -1)
        {
            this.contents.splice(index, 1);
            this.size--;
        }
    }

    // Getter for length
    get length()
    {
        return this.size;
    }

    // Returns whether value is in contents array
    has(value)
    {
        return this.contents.includes(value);
    }
    
    // Returns group iterator feom input group
    [Symbol.iterator]()
    {
        return new GroupIterator(this);
    }

    // Static method that creates new group containing elements of iterable
    static from(iterable)
    {
        // Create new group        
        let g = new Group;

        // Iterate over elements of iterable, adding to the group
        for (let element of iterable)
        {
            g.add(element);
        }

        // Return new group
        return g;
    }
}

// Class for iterator of group class
class GroupIterator
{
    constructor(group)
    {                 
        // Bindings for current index and input group
        this.current = 0;
        this.group = group;
    }

    // Next method
    next()
    {
        // End of items reached if index reaches size of group
        if (this.current === this.group.size)
        {
            // Returns object signifying we are done iterating
            return {done: true}
        }

        // Binding for object we will return with the next()
        let value = 
        {
            // Grabs current value then increments index
            value : this.group.contents[this.current++],
            done: false
        }

        return value;                                  
    }
}