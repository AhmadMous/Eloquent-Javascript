for (let i=1; i <=100; i++){
    let text = "";
    if ((i%3)==0){
      text += "Fizz";}
    if ((i%5)==0){
      text += "Buzz";}
    if (text==0){
      console.log(i);}
    else{
      console.log(text);}
  }