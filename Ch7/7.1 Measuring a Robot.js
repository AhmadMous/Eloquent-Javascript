// Write a function compareRobots that takes two robots (and their starting
// memory). It should generate 100 tasks and let each of the robots solve each
// of these tasks. When done, it should output the average number of steps
// each robot took per task.
// For the sake of fairness, make sure you give each task to both robots,
// rather than generating different tasks per robot.

// Compares two robot's average number of steps taken per task (100 tasks default)
function compareRobots(robot1, memory1, robot2, memory2, n = 100)
{
    // Counter for number of steps
    let tsteps1 = 0, tsteps2 = 0;

    // Iterating for n times, counting total of steps for each robot
    for (let index = 0; index < n; index++)
    {
        // Initiate new random state
        let state = VillageState.random();

        // run each robot with that state, adding the steps to total number of steps
        tsteps1 += countSteps(state, robot1, memory1);
        tsteps2 += countSteps(state, robot2, memory2);
    }

    // print each robot's name + their average number of steps needed
    console.log(`number of steps needed per task for ${robot1.name} is ${tsteps1 / 100}`);
    console.log(`number of steps needed per task for ${robot2.name} is ${tsteps2 / 100}`);
}

// Returns number of steps needed for the input robot to finish input state
function countSteps(state, robot, memory)
{
    // Loop indefinetly
    for (let step = 0;; step++)
    {
        // When parcels are done, return the number of steps
        if (state.parcels.length == 0)
        {
            return step;
        }
        
        // Activate robot's action
        let action = robot(state, memory);

        // Update village state and robot's memory
        state = state.move(action.direction);
        memory = action.memory;
    }
}