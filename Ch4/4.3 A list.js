// Write a function arrayToList that builds up a list structure like the one
// shown when given [1, 2, 3] as argument. Also write a listToArray function
// that produces an array from a list. Then add a helper function prepend ,
// which takes an element and a list and creates a new list that adds the ele-
// ment to the front of the input list, and nth , which takes a list and a number
// and returns the element at the given position in the list (with zero referring
// to the first element) or undefined when there is no such element.
// If you haven’t already, also write a recursive version of nth .

function arrayToList(arr){
    let obj = {
        value: arr[arr.length-1],
        rest : null
    };
    for(let i=arr.length-2; i >=0; i--){
        obj = {
            value: arr[i],
            rest : obj
        };
        }
    return obj;
}

listToArray = function(head){
    arr = [];
    while(head != null){
        arr.push(head.value);
        head = head.rest;
    }
    return arr
}

function prepend(element, lhead){
    lhead = {value: element,
            rest: lhead};
    return lhead;
}

function nth(list, num){
    for (let index = 0; list.rest != null; list = list.rest, index++){
        if(index==num) return list.value;
    }
    return null;
}