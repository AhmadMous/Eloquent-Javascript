// Write a loop that makes seven calls to console.log to output the following
// triangle:
// #
// ##
// ###
// ####
// #####
// ######
// #######
//
//solution: loop 7 times, adding a # each time to i and calling it
for (let j = 1, i = "#"; j <= 7; i+="#", j++){
	console.log(i);
}
