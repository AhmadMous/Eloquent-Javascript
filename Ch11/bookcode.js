// Import needed modules
var bigOak = require("./crow-tech").bigOak;
var {defineRequestType} = require("./crow-tech");
var {everywhere} = require("./crow-tech");


// Uses arg[0], to look up value, then applies it to CB
bigOak.readStorage("food caches", caches => {
  let firstCache = caches[0];
  bigOak.readStorage(firstCache, info => {
    console.log(info);
  });
});

// promise-based interface for the readStorage function
function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

// Tests our new promise-based interface
// storage(bigOak, "enemies")
//   .then(value => console.log("Got", value));

// Nests have a send method that sends off a request. It expects the name of the target nest, 
// the type of the request, and the content of the request as its first three arguments, 
// and it expects a function to call when a response comes in as its fourth and last argument.
// note: This function will return delivered no matter what,
// and the error is not handled as parameters are not used
// We can counter this by using a try, catch block
// try {
  bigOak.send("Cow asa", "note", "Let's caw loudly at 7PM",
            () => console.log('note delivered'));
// } catch (err){
//   console.log(err, "error caught");
// }

// Defines a new request type, imported from crow-tech
defineRequestType("note", (nest, content, source, done) => {
  console.log(`${nest.name} received note: ${content}`);
  done();
});

// New error type for request time outs
class Timeout extends Error {}

// Function that sends request multiple times before it gives up, returns a promise, we arait a response
function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {

    // Initial state of the request is not done
    let done = false;

    // Function that recursively tries multiple times t
    function attempt(n) {

      // Attempt to send the request
      nest.send(target, type, content, (failed, value) => {

        // If nest carried through, we are done
        done = true;

        // send failed, reject with that reason, else it resolve attempt with send success value
        if (failed) reject(failed);
        else resolve(value);
      });

      // The setTimeout allows us to wait for 250ms for every attempt
      setTimeout(() => {

        // If the request is done, return
        if (done) return;

        // else attempt the request again
        else if (n < 3) attempt(n + 1);

        // Timeout if number of failed attempts reached 3, reason for rejection is time out
        else reject(new Timeout("Timed out"));

      // retries are every quarter of a second, which gives the request time to succeed
      }, 250);
    }

    // Start the first attempt
    attempt(1);
  });
}

// Promise-based wrapper for defineRequestType
function requestType(name, handler) {

  // Execute defineRequestType
  defineRequestType(name, (nest, content, source, callback) => {
    try {

      // Promise resolve value is the rest of handler being used on the inputs
      Promise.resolve(handler(nest, content, source))

      // Assuming .then() succeeded, first CV recieves successful value as second parameter
      .then(response => callback(null, response),
      
      // Assuming .then() failed, second CB recieves failure reason as first parameter
      failure => callback(failure));
    } catch (exception) {
      callback(exception);
    }
  });
}

// Defines ping request type, handler simply returns pong
requestType("ping", () => "pong");

// Function that takes as input a nest's name, returns a promise
function availableNeighbors(nest){

  // Create requests array by mapping every neighbor to a promise of ping request
  let requests = nest.neighbors.map(neighbor => {
    return request(nest, neighbor, "ping")

    // Return a promise that resolves to true for successful pings, and to false for failed pings
      .then(() => true, () => false);
  });

  // return a promise that resolves to new array that contains neighbors of nest that successfully pinged
  // filter the neighbors array by only adding array items whose index in requests resolves to true
  return Promise.all(requests).then(result => {
    return nest.neighbors.filter((_, i) => result[i]);
  });
}

// Installs a gossip array of strings already seen on every nest of this network
everywhere(nest => {
  nest.state.gossip = [];
});

// Note: We are defining sendGossip but we are not using it yet
// Function that takes input nest and send gossip to every neighboring nest
function sendGossip(nest, message, exceptFor = null) {

  // Push message string into the gossip array of a nest
  nest.state.gossip.push(message);

  // Iterate over neighbors of the source nest
  for (let neighbor of nest.neighbors) {

    // Skips excepted neighbor
    if (neighbor == exceptFor) continue;

    // Sends a gossip request from source nest to target neighbor
    request(nest, neighbor, "gossip", message);
  }
}

// Defining gossip request type, and its handler
requestType("gossip", (nest, message, source) => {

  // Don't do anything if gossip string is in nest's gossip array
  if (nest.state.gossip.includes(message)) return;

  // Announce that gossip was recieved
  console.log(`${nest.name} received gossip '${
               message}' from ${source}`);

  // Recipient nest sends gossip to every neighbor but the source
  sendGossip(nest, message, source);
});

// sendGossip(bigOak, "Ahmad is on the hunt");

// note: We are also defining the way input parameters are given
// note: BC connections is mentioned in handler before its definition
// From requestType: "Promise.resolve(handler(nest, content, source))" which is the reason of arguments order
// Which is fine, since it isn't used yet
// Define connections request type and its handler aka how to act when that request is recieved
requestType("connections", (nest, {name, neighbors},
                            source) => {

  // Binding to the nest's connections map
  let connections = nest.state.connections;

  // Compare the neighbors after they are stringified into JSON
  // note: Object comparison only returns True if they reference same objects
  if (JSON.stringify(connections.get(name)) ==
  
  // note: This is what we recieve in contents of message
  JSON.stringify(neighbors)) return;

  // If they're not the same, add to the connections map then broadcast
  connections.set(name, neighbors);
  broadcastConnections(nest, name, source);
});

// Broadcasts connections of a nest to all its neighbors
function broadcastConnections(nest, name, exceptFor = null) {

  // Iterate over a nest's neighbors
  for (let neighbor of nest.neighbors) {

    // Exclude excepted neighbor
    if (neighbor == exceptFor) continue;

    // Send a connections request, reminder: request(nest, target, type, content)
    request(nest, neighbor, "connections", {
      name,
      neighbors: nest.state.connections.get(name)
    });
  }
}

// Set each nest's neighbors in a map, then immediately broadcast them
everywhere(nest => {
  nest.state.connections = new Map();

  // Setter for connections map: (key, value)
  nest.state.connections.set(nest.name, nest.neighbors);

  // Broadcast the connections of this nest
  broadcastConnections(nest, nest.name);
});

// note: Priority is for recieved map, local one gets updated, then propagates this to other nests

// Returns the next step in searching for a way to reach a given node in the network.
function findRoute(from, to, connections) {

  // Start at source node
  let work = [{at: from, via: null}];

  // Loop as long as there is uninspected work
  for (let i = 0; i < work.length; i++) {

    // Destructure current node on the graph
    let {at, via} = work[i];

    // Iterate over neighbors of this node, or skip if there are none
    for (let next of connections.get(at) || []) {

      // Target is reached, return preceeding node's name
      if (next == to) return via;

      // If next is not some previously explored node
      if (!work.some(w => w.at == next)) {

        // Push the new object to the work array, use next as fallback value for via
        // note: via returns next only on first pass where it is equal to null
        work.push({at: next, via: via || next});
      }
    }
  }

  // No valid path from this node
  return null;
}

// Function that sends a request by hopping across nodes
function routeRequest(nest, target, type, content) {

  // If target is a direct neighbor, simply send request
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content);
  } else {

    // Find next step from this node, to target node
    let via = findRoute(nest.name, target,
                        nest.state.connections);
    if (!via) throw new Error(`No route to ${target}`);

    // Recursively send request to next node
    return request(nest, via, "route",
                   {target, type, content});
  }
}

// Defines "route" request type and sets its handler
requestType("route", (nest, {target, type, content}) => {
  return routeRequest(nest, target, type, content);
});

// note: There is some kind of propagation/recursion happening here
// note: Routing is far from optimal, nodes might be visited multiple times


// Defines "storage" request, handler reads storage
requestType("storage", (nest, name) => storage(nest, name));

// Function that finds in storage, local then remote.
function findInStorage(nest, name) {

  // If found in local storage, returns promise that resolves to that value
  return storage(nest, name).then(found => {
    if (found != null) return found;

    // Else it checks in remote storage
    else return findInRemoteStorage(nest, name);
  });
}

// Returns connections of a nest as an array of strings
function network(nest) {
  return Array.from(nest.state.connections.keys());
}

// (nest object, name key: string) =>
function findInRemoteStorage(nest, name) {

  // Sources are every nest but the input nest
  let sources = network(nest).filter(n => n != nest.name);

  // Definition for recursive function that searches for 
  function next() {

    // Case there are no more sources to look in
    if (sources.length == 0) {
      return Promise.reject(new Error("Not found"));
    } else {

      // Choose random source from sources and remove it from array
      let source = sources[Math.floor(Math.random() *
                                      sources.length)];
      sources = sources.filter(n => n != source);

      // Direct the request to target nest
      return routeRequest(nest, source, "storage", name)

      // If value resolved is not null, return it, otherwise call next again
      // If promise rejects, also call next
      .then(value => value != null ? value : next(),
              next);
    }
  }
  // Execute next and return its return value
  return next();
}

// Storage finder async function using async await syntax
async function findInStorage(nest, name) {

  // Find if its local and return the value if its not null
  let local = await storage(nest, name);
  if (local != null) return local;

  // Grab random source from connections and remove it from options 
  let sources = network(nest).filter(n => n != nest.name);
  while (sources.length > 0) {
    let source = sources[Math.floor(Math.random() *
                                    sources.length)];
    sources = sources.filter(n => n != source);

    // Grab return value of routeRequest of storage type
    try {
      let found = await routeRequest(nest, source, "storage",
                                     name);

      // If it is not null, then return it, this is what we want
      if (found != null) return found;

    // Do nothing if error is found 
    } catch (_) {}
  }

  // Throw error if it was not found in storage, local or remote
  throw new Error("Not found");
}

// name is string, it's a property name, nest is node, source is also a string
function anyStorage(nest, source, name) {

  // If source is the same as nest, simply return storage from that nest
  if (source == nest.name) return storage(nest, name);

  // Else return (nest, target, type, content)
  else return routeRequest(nest, source, "storage", name);
}

// Function that prints the number of chicks in each nest
// note: It is seriously broken. It’ll always return only a single line of output,
// listing the nest that was slowest to respond.
async function chicks(nest, year) {

  // String we will build on to
  let list = "";

  // Iterate over nests while building the nest
  await Promise.all(network(nest).map(async name => {

    // This is where the issue is, for every iteration we will have list +=
    // they will all be running async and last one will overwrite all
    list += `${name}: ${
      await anyStorage(nest, name, `chicks in ${year}`)
    }\n`;
  }));

  // Return the string we built
  return list;
}