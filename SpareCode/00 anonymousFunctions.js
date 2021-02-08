/*  notes on anonymous functions and invoking them 

1)

*/

var diff = function (a,b){
  return(a * a - b * b)
};

diff(1,2);

/*

2)

*/

/*  notes on arrays, and two dimensional arrays

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

//  console.log(passengers[2][1]);

//  var modifiedNames = passengers.map(function (arrayCell) {return arrayCell[0] + ' ' + arrayCell[1];});

//  console.log(modifiedNames);

*/

/*


var modifiedNames = ["Thomas Meeks", "Gregg Pollack", "Christine Wong", "Dan McGaw"];

var yoCell = modifiedNames.map(function(arrayCell){
 alert("Yo, " + arrayCell + "!");
});



puzzlers = [];

return 3 * input - 8;
return (input + 2);
return input % 4;

*/



/* this is how to use immediately invoked function expressions */

/*

4)

function adventureSelector(userChoice) {
    if (userChoice == 1){
      return (function() {
        alert("You selected the Vines of Doom!");
      })();
    } else if (userChoice == 2) {
      return (function() {alert("Looks like you want the Lake of Despair!");})();
    } else if (userChoice == 3){
      return (function() {
        alert("The Caves of Catastrophe!");
      })();
  }
}

adventureSelector(1);




// var adventure = adventureSelector(3);


var puzzlers = [
  function(a) { return 8 * a - 10; },
  function(a) { return (a - 3) * (a - 3) * (a - 3); },
  function(a) { return a * a + 4; },
  function(a) { return a % 5; }
];
var start = 2;
var applyAndEmpty = function(input, queue) {
  var length = queue.length;
  for (var i = 0; i < length; i++) {
    input = queue.shift()(input);
  }
  return input;
};

alert(applyAndEmpty(start, puzzlers));


//this one is better, done by another developer

var puzzlers = [
  function(a) { return 8 * a - 10; },
  function(a) { return (a - 3) * (a - 3) * (a - 3); },
  function(a) { return a * a + 4; },
  function(a) { return a % 5; }
];
var start = 2;
var applyAndEmpty = function (input, queue) {
  for (var i = 0; queue.length > 0; queue.shift()) {
    input = queue[i](input);
  }
  return input;
};

alert(applyAndEmpty(start, puzzlers));