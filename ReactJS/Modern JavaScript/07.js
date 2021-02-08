/*
Arrow function and this keyword 
*/

/*
if the setTimeout function is a function and not arrow function
it will point to the window object AND the join method will not work

to fix that you would have to do this, this.nepal.mountains.join
and change the object to a var and not let


*/

console.log("this is module 7");

console.log(this); //this will log the Window object

let nepal = {
  mountains: [`Everest`, `Fish Tail`, `Annapurna`],
  printWithDash: function () {
    console.log(this.mountains.join(" * "));
    setTimeout(() => console.log(this.mountains.join(" - ")), 3000);
  },
};

nepal.printWithDash();
