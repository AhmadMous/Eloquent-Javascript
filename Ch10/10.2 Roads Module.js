// Roads Module
// Write a CommonJS module, based on the example from Chapter 7, that
// contains the array of roads and exports the graph data structure represent-
// ing them as roadGraph . It should depend on a module ./graph , which exports
// Modules
// 177a function buildGraph that is used to build the graph. This function expects
// an array of two-element arrays (the start and end points of the roads).

// This solution is copied from the site as it is too simple

// Destructuring to grab a function into buildGraph not an object
const {buildGraph} = require("./graph");

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

// Function inside map is applied to every item in roads array
// split transforms a string into an array of 2 strings
// Thus we will have the array of two-element arrays needed
exports.roadGraph = buildGraph(roads.map(r => r.split("-")));