/*let and var difference 

creating a variable with 'var' will attach the object to the 'Window' object

creating a variable with  'let' will not attach to the 'Window' or global context, it will limit the object or variable to it's scope


*/
console.log("this is module 3");

var varDemo = [`tyler`, `preethi`, `armahn`, `super samu`];
let letDemo = [`tyler`, `preethi`, `armahn`, `super samu`];

if (true) {
  var scopeVar = "you know this works";
  let scopeName = "Works here!";
  console.log("this is flow with scopevar", scopeVar);
  console.log("this is flow with scopename", scopeName);
}

try {
  console.log("does let scoopeName exist? ", scopeName);
} catch (e) {
  console.log(e);
}

console.log("The var object is attached, ", window.varDemo);
console.log("The let object is not attached: ", window.letDemo);
console.log("The scopeVar is global...see: ", scopeVar);
