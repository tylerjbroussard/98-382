

var puzzlers = [
  function(a) { return 8 * a - 10; },
  function(a) { return (a - 3) * (a - 3) * (a - 3); },
  function(a) { return a * a + 4; },
  function(a) { return a % 5; }
];

puzzlers[3](9);


function warningMaker(obstacle) {
  return function() {
    alert("Beware! There have been " + obstacle + " sightings in the Cove today!");
  };
}

var icebergAlert = warningMaker("iceberg");
icebergAlert();

// build your warning message with iceberg as an agrument
//store the var in icebergAlert
//call the new var



//function warningMaker(obstacle) {
//  return function(number, location) { // set parameters
//    alert("Beware! There have been " + obstacle +
//          " sightings in the Cove today!\n" +
//          number + " have been spotted at the " + location + "!");
//  };
//}
          
//var icebergAlert = warningMaker("iceberg");
//icebergAlert(54, "eastside");
          

//function warningMaker(obstacle) {
//  return function(number, location) {
//    alert("Beware! There have been " + obstacle +
//          " sightings in the Cove today!\n" +
//          number + " have been spotted at the " +
//          location + "!");
//  };
//}

//var killerPenguinAlert = warningMaker("killer penguin");
//var polarBearAlert     = warningMaker("polar bear");
//var icebergAlert       = warningMaker("iceberg");
//var flashBlizzardAlert = warningMaker("flash blizzard");
//var snowYetiAlert      = warningMaker("snow yeti");

//// call the two functions here
//killerPenguinAlert(6, "Ice Caves");
//snowYetiAlert(1, "Blizzard Beach");


//function warningMaker(obstacle) {
//  var count = 0;
//  return function(number, location) {
//    count ++;
//    alert("Beware! There have been " + obstacle +
//          " sightings in the Cove today!\n" +
//          number + " have been spotted at the " +
//          location + "!\n" +
//          "This is alert #" + count + " today for " + obstacle + " danger.");
//  };
//}

var date = new Date();
var hourGrab = date.getHours();
var hour = function(input){
    if (input <= 12){
        return input;
        } else {
          input -= 12;
          return input;
        }
}
var minuteGrab = date.getMinutes();
var minute = function(input){
    if (input < 10){
        input = "0" + input;
        return input;
        } else {
         return input;
        }
}
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getYear() + 1900;
var clock; 
var clockGrab = function(input1, input2){
  if (input1 >= 12){
      input2 = "pm";
      return input2;
      } else {
      input2 = "am";
      return input2;
      }
}
var rightNow = hour(hourGrab) + ":" + minute(minuteGrab) + clockGrab(hourGrab, clock);
var today = month + "/" + day + "/" + year;
alert("Today is " + today + " and the time is currently " + rightNow + "!");

//var nextSlide = function(){
//  if (){
      
//      } else if (){
      
//        } else {
        
//      }
//}

