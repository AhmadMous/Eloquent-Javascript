// Function that copies Promise.all(promises) functionality
function Promise_all(promises)
{
    // The function returns a new promise
    return new Promise((resolve, reject) => {

        // Results is an array of resolved values
        let results = [];

        // number of still unsettled promises
        let pending = promises.length;

        // Iterate over the promises in the array
        for (let i = 0; i < promises.length; i++)
        {
            // For every promise in the array 
            promises[i].then(result =>
                {
                    // Add resolved value to resolved values array
                    results[i] = result;

                    // Decrement the number of pending requests
                    pending--;

                    // Resolve the array when last promise is settled
                    if (pending == 0) resolve(results);

                // If any request is rejected, call the outer functions reject CB
                // This makes sure the returned promise is also rejected
                }).catch(reject);
      }

      // If input array was empty, simply resolve the array
      if (promises.length == 0) resolve(results);
    });
}