// Write a new class PGroup , similar to the Group class from “Groups” on
// page 113, which stores a set of values. Like Group , it has add , delete , and has
// methods.
// Its add method, however, should return a new PGroup instance with the
// given member added and leave the old one unchanged. Similarly, delete
// creates a new instance without a given member.
// The class should work for values of any type, not just strings. It does not
// have to be efficient when used with large amounts of values.
// The constructor shouldn’t be part of the class’s interface (though you’ll
// definitely want to use it internally). Instead, there is an empty instance,
// PGroup.empty , that can be used as a starting value.
// Why do you need only one PGroup.empty value, rather than having a func-
// tion that creates a new, empty map every time?

class PGroup
{
    // Initialize empty array for storage
    constructor(content = [])
    {
        this.content = content;
        Object.freeze(this.content);
    }

    // Returns new PGroup instance wth the given member added
    add(value)
    {
        // If value doesn't exist in group
        if ((this.content.indexOf(value)) === (-1))
        {
            // return new group with value added
            return new PGroup(this.content.concat(value));
        }

        // Else return new group with same content
        else
        return new PGroup(this.content);
    }

    // Returns new PGroup instance with the given member deleted
    delete(value)
    {                                    
        let index = this.content.indexOf(value);
        // if value exists in group
        if (index !== -1)
        {             
            // return new group with valuer removed                   
            return new PGroup(this.content.filter(s => s !== value));
        // else return a copy of the group unchanged
        }

        else return PGroup(this.content);
    }

    has(value)
    {
        return this.content.includes(value);
    }
    
}
// By default a new group is created empty
PGroup.empty = new PGroup;

// More groups can be created from the single empty group and since
// methods return new groups every time, there is no need for more than
// One empty group

// Example for testing
a = PGroup.empty.add("a");
console.log(PGroup.empty)
console.log(a)
console.log(PGroup.empty)