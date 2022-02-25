// Write a loop that makes seven calls to console.log to output the following
// triangle:
// #
// ##
// ###
// ####
// #####
// ######
// #######

// Loop 7 times, calling i in each iteration, i = "#", with extra "#" concatanated each iteration
for (let j = 1, i = "#"; j <= 7; i += "#", j++){
	console.log(i);
}
