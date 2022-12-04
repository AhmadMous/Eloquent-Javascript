// Can you write a robot that finishes the task faster than goalOrientedRobot ? If
// you observe that robot’s behavior, what obviously stupid things does it do?
// How could those be improved? If you solved the previous exercise, you might want to use your
// compareRobots function to verify whether you improved the robot.

// This robot chooses closest interestong destination, prioritizing pick ups over drop offs
function yourRobot({place, parcels}, route)
{
    // If previous path reached
    if (route.length == 0)
    {
        // Find new closest destination
        route = closestDest(roadGraph, place, parcels);
    }

    // Proceed same path
    return {direction: route[0], memory: route.slice(1)};
}

// Returns array with shortest length
function minimizer(a, b)
{
    return a.length >= b.length? b: a;
}

// Returns route to closest pick up/drop off point
function closestDest(graph, place, parcels)
{
    // Seperate parcels into drop off/ pick up destination arrays, then map parcels to routes
    let closestAddress = parcels.filter(box => box.place == place).map(box => findRoute(graph, place, box.address));
    let closestPlace = parcels.filter(box => box.place != place).map(box => findRoute(graph, place, box.place));

    // Reduce each array to route of closest destination
    let maxAddress = new Array(13); 
    closestAddress = closestAddress.reduce(minimizer, maxAddress);
    closestPlace = closestPlace.reduce(minimizer, maxAddress);

    // Return shortest route to an item
    return minimizer(closestAddress, closestPlace);
}

// Pathfinding algorithm, of BFS nature
function findRoute(graph, from, to)
{
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++)
    {
        // Pick next node in work queue
        let {at, route} = work[i];

        // Check if any neighbor is destination
        for (let place of graph[at])
        {
            // If destination is found, return the route
            if (place == to) return route.concat(place);

            // Else add current neighbor to nodes in the queue
            if (!work.some(w => w.at == place))
            {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

runRobotAnimation(VillageState.random(), yourRobot, memory);