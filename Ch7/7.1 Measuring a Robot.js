// Write a function compareRobots that takes two robots (and their starting
// memory). It should generate 100 tasks and let each of the robots solve each
// of these tasks. When done, it should output the average number of steps
// each robot took per task.
// For the sake of fairness, make sure you give each task to both robots,
// rather than generating different tasks per robot.

function compareRobots(robot1, memory1, robot2, memory2) {
    // n is number of tasks
    let n = 100;
    let tsteps1 = 0, tsteps2 = 0;
    // iterating 100 times counting how many steps each task takes for each robot
    for (let index = 0; index < n; index++) {
        // initiate new random state
        let state = VillageState.random();
        // run each robot with that state, adding the steps to total number of steps
        tsteps1 += countSteps(state, robot1, memory1);
        tsteps2 += countSteps(state, robot2, memory2);
    }
    // print each robot's name + their average number of steps needed
    console.log(`number of steps need per task for ${robot1.name} is ${tsteps1/100}`);
    console.log(`number of steps need per task for ${robot2.name} is ${tsteps2/100}`);
}

// our variant of runRobot that returns number of steps instead of printing them
function countSteps(state, robot, memory) {
    for (let step = 0;; step++) {
        if (state.parcels.length == 0){
            return step;
            }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        }
}