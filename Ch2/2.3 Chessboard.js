let text = "";
let counter = 1;
for (let i=1; i<=8; i++){
  for (let j=1; j<=8; j++){
  	if (counter%2){
  		text += " ";}
  	else{
    	text += "#";}
    counter++;
  }
  	text += "\n";
	counter++;}
console.log(text);