// IIFE that creates a closure/encapsulation
(function() {

  // Function that graphs connections between nests
  const connections = [
    "Church Tower-Sportsgrounds", "Church Tower-Big Maple", "Big Maple-Sportsgrounds",
    "Big Maple-Woods", "Big Maple-Fabienne's Garden", "Fabienne's Garden-Woods",
    "Fabienne's Garden-Cow Pasture", "Cow Pasture-Big Oak", "Big Oak-Butcher Shop",
    "Butcher Shop-Tall Poplar", "Tall Poplar-Sportsgrounds", "Tall Poplar-Chateau",
    "Chateau-Great Pine", "Great Pine-Jacques' Farm", "Jacques' Farm-Hawthorn",
    "Great Pine-Hawthorn", "Hawthorn-Gilles' Garden", "Great Pine-Gilles' Garden",
    "Gilles' Garden-Big Oak", "Gilles' Garden-Butcher Shop", "Chateau-Butcher Shop"
  ]

  // Function that takes the name of the nest and returns its storage
  function storageFor(name) {

    // Create an object that has no prototype to hold storage
    let storage = Object.create(null)

    // Populate storage with shared breadcrumbs and enemies list
    storage["food caches"] = ["cache in the oak", "cache in the meadow", "cache under the hedge"]
    storage["cache in the oak"] = "A hollow above the third big branch from the bottom. Several pieces of bread and a pile of acorns."
    storage["cache in the meadow"] = "Buried below the patch of nettles (south side). A dead snake."
    storage["cache under the hedge"] = "Middle of the hedge at Gilles' garden. Marked with a forked twig. Two bottles of beer."
    storage["enemies"] = ["Farmer Jacques' dog", "The butcher", "That one-legged jackdaw", "The boy with the airgun"]

    // Register events at nest's storage selectively
    if (name == "Church Tower" || name == "Hawthorn" || name == "Chateau")
      storage["events on 2017-12-21"] = "Deep snow. Butcher's garbage can fell over. We chased off the ravens from Saint-Vulbas."

    // Chicks code
    let hash = 0
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i)
    for (let y = 1985; y <= 2018; y++) {
      storage[`chicks in ${y}`] = hash % 6
      hash = Math.abs((hash << 2) ^ (hash + y))
    }
    
    // Register where the scalpel is, depending on this nest's name
    if (name == "Big Oak") storage.scalpel = "Gilles' Garden"
    else if (name == "Gilles' Garden") storage.scalpel = "Woods"
    else if (name == "Woods") storage.scalpel = "Chateau"
    else if (name == "Chateau" || name == "Butcher Shop") storage.scalpel = "Butcher Shop"
    else storage.scalpel = "Big Oak"

    // Converts the storage values to a JSON strings
    for (let prop of Object.keys(storage)) storage[prop] = JSON.stringify(storage[prop])

    // Return the JSON of the nest's storage
    return storage
  }

  // Class definition of network
  class Network {

    // Constructor takes in list of connections, and a function that returns storage of a nest
    constructor(connections, storageFor) {

      // Create new empty object with no prototype for reachable nodes
      let reachable = Object.create(null)

      // Iterate over the connections
      for (let [from, to] of connections.map(conn => conn.split("-"))) {

        // Create bidirectional connections, if no connection previously exists from this node, create a new array and push to it
        ;(reachable[from] || (reachable[from] = [])).push(to)
        ;(reachable[to] || (reachable[to] = [])).push(from)
      }

      // Create a new object with no prototype for nodes on this network
      this.nodes = Object.create(null)

      // Iterate over nodes of the network
      for (let name of Object.keys(reachable))
        this.nodes[name] = new Node(name, reachable[name], this, storageFor(name))
      this.types = Object.create(null)
    }

    // Defines a request type and attaches a CB handler
    defineRequestType(name, handler) {
      this.types[name] = handler

      // We can view these types by this, when it is called:
      // console.log(this.types)
    }

    // Applies CB to every node/nest of the network
    everywhere(f) {
      for (let node of Object.values(this.nodes)) f(node)
    }
  }

  // Create symbols for storage and network
  const $storage = Symbol("storage"), $network = Symbol("network")

  // Deep clones a value or returns it as it if it were null, better way is using lodash library
  function ser(value) {
    return value == null ? null : JSON.parse(JSON.stringify(value))
  }

  // Class definition of nodes which will belong to a network, aka nest
  class Node {

    // Constructor binds arguments to properties, creates empty object property to save node state
    constructor(name, neighbors, network, storage) {
      this.state = Object.create(null)
      this.name = name
      this.neighbors = neighbors
      this[$network] = network
      this[$storage] = storage
    }

    // Sends a request to another nest
    send(to, type, message, callback) {

      // toNode is a binding that evaluates to array of nodes connecting
      let toNode = this[$network].nodes[to]

      // If target nest has no neighbors or source nest is not connected to it
      if (!toNode || !this.neighbors.includes(to))
      
      // Then it is not reachable from this nest
      return callback(new Error(`${to} is not reachable from ${this.name}`))
      
      // Grab binding for proper handler to the request
      let handler = this[$network].types[type]

      // If handler doesn't exist, then request type is unknown, throw error
      if (!handler)
        return callback(new Error("Unknown request type " + type))

      // 70% of the time,, try the handler 
      if (Math.random() > 0.03) setTimeout(() => {
        try {
          handler(toNode, ser(message), this.name, (error, response) => {

            // Convention is first argument to the callback is the error, second is the response
            setTimeout(() => callback(error, ser(response)), 10)
          })

        // Grab the error and use it as arg to the CB
        } catch(e) {
          callback(e)
        }

      // for a random period
      }, 10 + Math.floor(Math.random() * 10))
    }

    // Reads the value of an input property key then runs a CB on it, errors if no CB is supplied
    readStorage(name, callback) {

      // Bind the result of that property key in storage to "value"
      let value = this[$storage][name]

      // JSON.parse converts the JSON to an object
      // (value && JSON.parse(value)) evaluates to the value of second truthy value if both are truthy
      setTimeout(() => callback(value && JSON.parse(value)), 20)
    }

    // Writes a name, value pair to storage as JSON then runs a CB
    writeStorage(name, value, callback) {
      setTimeout(() => {
        this[$storage][name] = JSON.stringify(value)
        callback()
      }, 20)
    }
  }

  // Sets module export interface
  let network = new Network(connections, storageFor)
  exports.bigOak = network.nodes["Big Oak"]
  exports.everywhere = network.everywhere.bind(network)
  exports.defineRequestType = network.defineRequestType.bind(network)

  if (typeof __sandbox != "undefined") {
    __sandbox.handleDeps = false
    __sandbox.notify.onLoad = () => {
      // Kludge to make sure some functions are delayed until the
      // nodes have been running for 500ms, to give them a chance to
      // propagate network information.
      let waitFor = Date.now() + 500
      function wrapWaiting(f) {
        return function(...args) {
          let wait = waitFor - Date.now()
          if (wait <= 0) return f(...args)
          return new Promise(ok => setTimeout(ok, wait)).then(() => f(...args))
        }
      }
      for (let n of ["routeRequest", "findInStorage", "chicks"])
        window[n] = wrapWaiting(window[n])
    }
  }

  // Module stuff
  if (typeof window != "undefined") {
    window.require = name => {
      if (name != "./crow-tech") throw new Error("Crow nests can only require \"./crow-tech\"")
      return exports
    }
  } else if (typeof module != "undefined" && module.exports) {
    module.exports = exports
  }
})()
