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

class PGroup{
    // create object with empty array as default
    constructor(content = []){
        this.content = content;
        // console.log(content);
    }

    add(value){
        // if value doesn't exist in group
        if ((this.content.indexOf(value)) === (-1)){
            // return new group with value added
            return new PGroup(this.content.concat(value));
            // else return a copy of the group unchanged
        } else return new PGroup(this.content);
    }

    delete(value){                                    
        let n = this.content.indexOf(value);
        // if value exists in group
        if (n !== -1){             
            // return new group with valuer removed                   
            return new PGroup(this.content.filter(s => s !== value));
        // else return a copy of the group unchanged
        } else return PGroup(this.content);
    }

    has(value){
        return this.content.includes(value);
    }
    
}
// by default a new group is created empty
PGroup.empty = new PGroup;