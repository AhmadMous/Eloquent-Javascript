// Make the Group class from the previous exercise iterable. Refer to the section
// about the iterator interface earlier in the chapter if you aren’t clear on the
// exact form of the interface anymore.
// If you used an array to represent the group’s members, don’t just return
// the iterator created by calling the Symbol.iterator method on the array. That
// would work, but it defeats the purpose of this exercise.
// It is okay if your iterator behaves strangely when the group is modified
// during iteration.

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
    get length(){                                      // getter for length
        return this.size;                             
      }

    has(value){
        return this.content.includes(value);
    }
    
    [Symbol.iterator](){
        return new GroupIterator(this);
    }
    static from(iterable){                             
        let g = new Group;                             // create a new group
        for (let element of iterable){                 // iterate over the iterable using a for..of loop
            g.add(element);                            // add elements to group
        }
        return g;                                      // return new group object to be held by binding
    }
}

class GroupIterator{                                   // group iterator class
    constructor(group){                                
        this.current = 0;                              // binding for current index
        this.group = group;                            // holding the group passed as argument
    }
    next(){
        if (this.current === this.group.size){         // if index is same as group size, then we have reached the end of items
            return {done: true}                        // reflect that with the return
        }
        let value = {                                  // value we return with the next() method
            value : this.group.content[this.current++],// grabbing the value of item at current index and incrementing the index
            done: false                                // as we have not yet finished with iterating, done is false
        }
        return value;                                  
    }
}

// for (let value of Group.from(["a", "b", "c"])) {
//     console.log(value);
//   }
//   // → a
//   // → b
//   // → c