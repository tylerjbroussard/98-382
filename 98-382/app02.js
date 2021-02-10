/* 
Declare and use variables of primitive data types



Declare and use arrays
 single-dimensional arrays; multi-dimensional arrays; iteration; initialization; define an
array; sort and search an array; use push, pop, shift, and unshift methods; use the length
property; access an array element

Complete and debug code that uses objects
 properties; methods; instantiation; date object; retrieve date and time parts; localize date
format (MM/DD vs DD/MM); add and subtract dates

Complete and debug code that uses built-in Math functions
 random; round; abs; floor; ceiling; min; max; pow; sqrt

Complete and debug a function that accepts parameters and returns a value
 reusable code; local versus global scope, redefine variables, pass parameters, value
versus reference, return values


*/

"use strict"; //using strict

//number
let numberOne = 1;

//string
let stringOne = "one";

//null
let nullNumber = null;

//undefined
let noDefinition; //this leave the object undefinied

//string manipulation
console.log(
  `Here is number ${numberOne}, here is string ${stringOne}, here is null ${nullNumber}, here is undefined ${noDefinition}!`
);

let result = typeof stringOne;

if (result === typeof `string`) {
  console.log(`Result is a string`);
} else {
  console.log(`Result is not a string`);
}

//type conversion aka casting in C#
var x = numberOne.toString();

console.log(x);

let numberParsed = parseFloat(x);

numberParsed = parseInt(x);

function Person(first, last, age, eye) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  this.eyeColor = eye;
}

var newGuy = new Person(`tyler`, `purple`, 46, `greenish brown`);

console.log(`Hey the new guy is ${newGuy.firstName} and he is ${newGuy.age}`);
