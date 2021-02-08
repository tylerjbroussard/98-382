/* 
object restructuring

*/

console.log(`module 10`);

var mtName = "Everest";
var height = 8845;
var output = function () {
  console.log(`Mt. ${this.mtName} is ${this.height} meter tall`);
};

var adventureClimbing = {
  mtName,
  height,
  output,
};

console.log(adventureClimbing);

adventureClimbing.output();
