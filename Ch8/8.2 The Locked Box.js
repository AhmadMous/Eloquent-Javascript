// Consider the following (rather contrived) object:

const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

// It is a box with a lock. There is an array in the box, but you can get at it
// only when the box is unlocked. Directly accessing the private _content prop-
// erty is forbidden.
// Write a function called withBoxUnlocked that takes a function value as
// argument, unlocks the box, runs the function, and then ensures that the
// box is locked again before returning, regardless of whether the argument
// function returned normally or threw an exception.
// For extra points, make sure that if you call withBoxUnlocked when the box
// is already unlocked, the box stays unlocked.


function withBoxUnlocked(body) {
    // save current state of the box
    let status = box.locked;
    // if it isn't locked
    if (!status){
        // simply execute and return body function
        return body();
        }
    // if the box was locked, then unlock
    box.unlock();
    try {
        // attempt to run and return the function
        return body();
    }
    // finally lock it whether you ran the function successfully or not
    finally {
    box.lock();
    }
}
