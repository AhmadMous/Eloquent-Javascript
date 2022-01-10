// The standard JavaScript environment provides another data structure called
// Set . Like an instance of Map , a set holds a collection of values. Unlike Map ,
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

class Group{
    constructor(){
        this.content = [];                             // since we don't need value pairings, an array is a suitable data structure
        this.size = 0;                                 // number of items in group
    }

    add(value){
        if ((this.content.indexOf(value)) === (-1)){   // we must make sure the value isn't inside when adding new ones
            this.content.push(value);                  // if it's not then add it, if it is, do nothing
            this.size++;                               // increment group size
        }
    }

    delete(value){                                     // to delete a value from our object
        let n = this.content.indexOf(value);           // we must first see if it exists, if it does, get its location, indexOf returns -1 if it's not there
        if (n !== -1){                                 // if n isn't -1, then we will use returned index to delete 1 item from the array
            this.content.splice(n,1);                  // at exactly the index of value n, the 1 in splice means 1 item or value
        this.size--;                                   // decrement group size
        }
    }
    get length(){                                      // getter for length, this wasn't required but helped for 6.3
        return this.size;                             
      }

    has(value){
        return this.content.includes(value);
    }
    
    static from(iterable){                             
        let g = new Group;                             // create a new group
        for (let element of iterable){                 // iterate over the iterable using a for..of loop
            g.add(element);                            // add elements to group
        }
        return g;                                      // return new group object to be held by binding
    }
}