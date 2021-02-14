/* 
Declare and use variables of primitive data types

Complete and debug code that uses objects
localize date format (MM/DD vs DD/MM); add and subtract dates

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

/* 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

*/

//unshift
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// expected output: 5

console.log(array1);
// expected output: Array [4, 5, 1, 2, 3]

//shift
const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// expected output: Array [2, 3]

console.log(firstElement);
// expected output: 1

var x = array1.pop();
console.log(x);

//initialization for array using Array constructor
let fruits = new Array("Orange", "Banana", "Apple");

console.log(fruits.length); // 2
console.log(fruits[1]); // "Banana"

fruits.sort(); //sort alphabetically

fruits.find((element) => element == "Apple");

fruits.findIndex((element) => element == "Banana");

//decode process
var hexNumeral =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var hexAlpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var result;

//1 creates user string from WeLearn data
function createUserString() {
  if (!CmiData)
    var CmiData = {
      "cmi.learner_id": "12345",
      "cmi.learner_name": "USER ACCOUNT",
    };

  let userLmsId = CmiData["cmi.learner_id"]; //replace with sharepoint call for data
  let userLmsName = CmiData["cmi.learner_name"]; //replace with sharepoint call for data
  let completedMod = true; //{make this spservices call to modend data, if date exists then true}

  let unencodedString = `${userLmsId}${userLmsName}${completedMod}`;
  return unencodedString;
}

//2 function to convert user string to encoded hex string for transfer
function converter(userInfo) {
  let loaded = [];
  let unloaded = "";

  //unloads string to an array
  //iteration
  for (let i = 0; i < userInfo.length; i++) {
    loaded.push(userInfo.charAt(i));
  }

  //foreach loop
  loaded.forEach((index) => {
    let numIndex = hexNumeral.indexOf(index);
    unloaded += hexAlpha.charAt(numIndex);
  });
  result = unloaded;
  return result;
}

//3 main function to call others
function encodeUserProgress() {
  let rawString = createUserString();
  result = converter(rawString);
  return result;
}

//4 reverse process to decode user info
function decodeUserProgress(userProgress) {
  let loaded = [];
  let unloaded = "";

  for (var i = 0; i < userProgress.length; i++) {
    loaded.push(userProgress.charAt(i));
  }

  loaded.forEach((index) => {
    let numIndex = hexAlpha.indexOf(index);
    unloaded += hexNumeral.charAt(numIndex);
  });
  result = unloaded;
  return result;
}

let stageOne = encodeUserProgress();
let stageTwo = decodeUserProgress(stageOne);
console.log(stageOne);
console.log(stageTwo);

// this is like data hiding w/properties in C#

//object
var house = {};

//properties
house.isDoorOpen = false;

//method
house.openDoor = function () {
  house.isDoorOpen = true;
};

class newCar {
  constructor(model, mpg) {
    this.model = model;
    this.mpg = mpg;
  }
}

let mazda = new newCar("protege", 45);

console.log(mazda.mpg);

let date = new Date();

console.log(date.getFullYear(), date.getTime());
