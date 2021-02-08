/* 
spread and rest operator

see link for both rest and spread

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax


*/

console.log(`module 11`);

var moutains = [`everest`, `fish wag`, `annapurna`];

var mountainsFromJapan = [`Fuji`];

//use this to combine data response from api to an object
var allMoutains = [...mountainsFromJapan, ...mountainsFromJapan];

console.log(allMoutains);

var rivers = [`sunkoshi`, `tamakoshi`, `saptakoshi`];

var [first, ...rest] = rivers;

console.log(rest);
