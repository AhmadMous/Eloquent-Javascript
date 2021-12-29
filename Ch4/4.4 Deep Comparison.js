// The == operator compares objects by identity. But sometimes you’d prefer to
// compare the values of their actual properties.
// Write a function deepEqual that takes two values and returns true only if
// they are the same value or are objects with the same properties, where the
// values of the properties are equal when compared with a recursive call to
// deepEqual .
// To find out whether values should be compared directly (use the ===
// operator for that) or have their properties compared, you can use the typeof
// operator. If it produces "object" for both values, you should do a deep com-
// parison. But you have to take one silly exception into account: because of a
// historical accident, typeof null also produces "object" .
// The Object.keys function will be useful when you need to go over the
// properties of objects to compare them.
//
// Opinion: This is really hard for a beginner who struggles with recursion, and the thought process in this book is not enough to teach
// a first timer how to solve this, but the challenge definetly should help them
function deepEqual(x,y){                                          

    if (typeof(x) !== typeof(y)){                                // if they are different types, then they're not deepequal
        return false;
    }

    if (x === null && y === null){                                // if they're both null then they're strictly equal, this also works for undefined
        return true;
    }

    if (x === null || y === null){                                // if only one arg is null or unidentified and other oe isn't then they are not deepequal
        return false;
    }

    if (x===y){                                                   // if they are strictly equal then they are deepequal
        return true;
    }


    if ((typeof(x) === 'object') && typeof(y) === 'object'){     // if they are both objects but aren't null then dig deeper
        let xarr = Object.keys(x);                               // create an array of each arg's properties
        let yarr = Object.keys(y);
        if (xarr.length === yarr.length){                        // if they are the same number
            for (let prop of xarr){
                if (!yarr.includes(prop)){                       // make sure that they are the same properties
                    return false;                                // else they are not deepequal
                }
                if (!deepEqual(x[prop], y[prop])){               // if they are same properties then test each of their values for deepequality
                    return false;
                }
            }
        }
    }
    return true;
}