/* 2)  notes on arrays, and two dimensional arrays */

var passengers = [  // 0
  ['Thomas',  // 0
  'Meeks'],   // 1
  [                 // 1
    'Gregg',
    'Pollack'
  ],
  [
    'Christine',
    'Wong'
  ],
  [
    'Dan',
    'McGaw'
  ]
]; 

console.log(passengers[2][1]);

//map array reverence

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

var modifiedNames = passengers.map(function (arrayCell) {return arrayCell[0] + ' ' + arrayCell[1];});

console.log(modifiedNames);



//var modifiedNames = ["Thomas Meeks", "Gregg Pollack", "Christine Wong", "Dan McGaw"];

//var yoCell = modifiedNames.map(function (arrayCell) {
//    alert("Yo, " + arrayCell + "!");
//});



//puzzlers = [];

//return 3 * input - 8;
//return (input + 2);
//return input % 4;



/*
Arrays
*/

// single dimensional array
var counties = [
    'Belknap',
    'Strafford',
    'Carroll',
    'Rockingham',
];

// two dimensional array with indexes 
var passengers1 = [['Thomas', 'Meeks'], ['Gregg', 'Pollack'], ['Christine', 'Wong'], ['Dan', 'McGaw']];

passengers1[0, 0]; // returns ["Thomas", "Meeks"]

passengers1[0, 1]; // returns [ "Gregg", "Pollack" ] 

passengers1[1, 1]; //returns "Pollack"

passengers1[0, 1][1]; //returns "Pollack"

passengers1[0, 0][1]; //returns "Meeks"

//three dimensional array with indexes 
var passengers2 = [[['Thomas', 'Meeks'], ['Gregg', 'Pollack'], ['Christine', 'Wong'], ['Dan', 'McGaw']]];

passengers2[0, 0][0]; //returns 'Thomas', 'Meeks'

passengers2[0][0][0]; //returns 'Thomas'

passengers2[0][0][1]; //returns 'Meeks'

passengers2[0][2][0]; //returns "Christine"


//three dimenal arrays with more complexity
var passengers3 = [[['Thomas', 'Meeks'], ['Gregg', 'Pollack']]['Christine', 'Wong'], ['Dan', 'McGaw']];

passengers3[0, 1][0]; //returns "dan"