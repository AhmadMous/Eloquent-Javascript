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

function deepEqual(x,y){
    if(x === null && y === null) return true;
    if (x === null || y === null) return false;
    if (x===y) return true;

    if((typeof(x) === 'object') && typeof(y) === 'object'){
        let xarr = x.keys();
        let yarr = y.keys();
        if (xarr.length === yarr.length){
            for (let prop of xarr){
                if (!yarr.includes(prop)){
                    return false;
                }
                if ()
            }
        }
    }
    if (x===y) return true;

}