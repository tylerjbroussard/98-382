function warningMaker(obstacle) {
  var count = 0;
  var zones = [];
  return function(number, location) {
    count++;
    var list = "";
    zones.push(location);
    
    list = location + ", ";
    
    alert("Beware! There have been " + obstacle +
          " sightings in the Cove today!\n" +
          number + " have been spotted at the " +
          location + "!\n" +
          "This is alert #" + count +
          " today for " + obstacle + " danger.\n" +
          "Current danger zones are:\n" +
            zones.map(function(input){
            return input;})
    );
  };
}


//var player = GetPlayer();

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
var timeStamp = "Today is " + today + " and the time is currently " + rightNow + "!";
var dynaText00 = function(){
      player.SetVar("dynaText01", timeStamp);
      console.log(timeStamp);
}
dynaText00(); 



//need 6 variables 

// 1) execute JS to turn false value true once question is clicked 
// 2) execute JS to turn second value to 0 or 1 for correct / incorrect on questions 
/*

var questionList [
  [false, 0],
  [false, 0],
  [false, 0],
  [false, 0],
  [false, 0],
  [false, 0],
];


function warningMaker(obstacle) {
  var count = 0;
  var zones = [];
  return function(number, location) {
    count++;
    var list = "";
    // push an array with location and number
    zones.push([number, location]);
    for (var i = 0; i < zones.length; i++) {
      // replace location and number with appropriate code
      list += zones[i][1] + " (" + zones[i][0] + ")" + "\n";
    }
    alert("Beware! There have been " + obstacle +
          " sightings in the Cove today!\n" +
          number + " have been spotted at the " +
          location + "!\n" +
          "This is alert #" + count +
          " today for " + obstacle + " danger.\n" +
          "Current danger zones are:\n" +
          list);
  };
}

var killerPenguinAlert = warningMaker("killer penguin");
var polarBearAlert     = warningMaker("polar bear");
var icebergAlert       = warningMaker("iceberg");
var flashBlizzardAlert = warningMaker("flash blizzard");
var snowYetiAlert      = warningMaker("snow yeti");

// call the two functions here
killerPenguinAlert(6, "Ice Caves");
snowYetiAlert(1, "Blizzard Beach");


