


/* this is how to use immediately invoked function expressions 


https://developer.mozilla.org/en-US/docs/Glossary/IIFE

4)

*/

//return 3 * input - 8;
//return (input + 2);
//return input % 4;


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




var adventure = adventureSelector(3);


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

//var puzzlers = [
//  function(a) { return 8 * a - 10; },
//  function(a) { return (a - 3) * (a - 3) * (a - 3); },
//  function(a) { return a * a + 4; },
//  function(a) { return a % 5; }
//];
//var start = 2;
//var applyAndEmpty = function (input, queue) {
//  for (var i = 0; queue.length > 0; queue.shift()) {
//    input = queue[i](input);
//  }
//  return input;
//};

//alert(applyAndEmpty(start, puzzlers));