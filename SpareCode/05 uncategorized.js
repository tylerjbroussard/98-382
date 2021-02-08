/*
//from this
function assignLaser(shark, sharkList) {
  var stationAssignment;
  for (var i = 0; i < sharkList.length; i++) {
    if (shark == sharkList[i]) {
      stationAssignment = function() {
        alert("Yo, " + shark + "!\n" +
              "Visit underwater strapping station " +
              (i + 1) + " for your sweet laser.");
      };
    }
  }
  return stationAssignment;
}



//to this in order to close the variables interated in the for loop and provide the rights answer in the alert
function assignLaser(shark, sharkList) {
  for (var i = 0; i < sharkList.length; i++) {
    if (shark == sharkList[i]) {
     return function() {
        alert("Yo, " + shark + "!\n" +
              "Visit underwater strapping station " +
              (i + 1) + " for your sweet laser.");
      };
    }
  }
  
}
var listOfSharks = ["Sea Pain", "Great Wheezy",
                    "DJ Chewie", "Lil' Bitey",
                    "Finmaster Flex", "Swim Khalifa",
                    "Ice Teeth", "The Notorious J.A.W."];

var listOfTargets = ["icicle bat", "snow yeti",
                     "killer penguin", "frost tiger",
                     "polar bear", "iceberg",
                     "blue witch", "wooly mammoth"];


function makeTargetAssigner(sharks, targets) {
  return function(shark){
    for(var i = 0; i < sharks.length; i++){
      if (shark == sharks[i]){
       // alert("Hey, " + shark + "!\nThere've been " + targets[i] + " sightings in our area!\nTime to take care of business");
      }
    }
  };
}


var getTargetFor = makeTargetAssigner(listOfSharks,
                                      listOfTargets);
getTargetFor("Ice Teeth");


var vehicle1={
  type: "Motorboat", 
  capacity: 6,
  storedAt: "Ammunition Depot"
};
var vehicle2={
  type: "Jet Ski",
  capacity: 1,
  storedAt: "Reef Dock"
};
var vehicle3={
  type: "Submarine",
  capacity: 8,
  storedAt: "Underwater Outpost"
};

var vehicles = [
  vehicle1,
  vehicle2,
  vehicle3
];

var findVehicle = function (name, list){
  for(var i = 0; i < list.length; i++){
    if(list[i].type == name){
     return list[i].storedAt;
    }
  }
};

findVehicle("Submarine", vehicles);





vehicle1.capacity = 10;
vehicle2.submersible = false;
vehicle3.weapon = "Torpedoes";
vehicle1.submersible = false;
vehicle2.weapon = "Lasers";
vehicle3.capacity = 16;
vehicle1.weapon = "Rear-Mounted Slingshot";
vehicle3.submersible = true;

vehicle1["# of weapons"] = 1;
vehicle2["# of weapons"] = 4;
vehicle3["# of weapons"] = 8;




var superBlinders = [
  ["Firelight", 4000],
  ["Solar Death Ray", 6000],
  ["Supernova", 12000]
];

var lighthouseRock = {
  gateClosed: true,
  bulbs: [200, 500, 750],
  capacity: 30,
  secretPassageTo: "Underwater Outpost"
};

// remove bulbs property from lighthouseRock
delete lighthouseRock.bulbs;

// add weaponBulbs property to lighthouseRock
lighthouseRock.weaponBulbs = superBlinders;

// log the correct weaponBulbs array value to the console
console.log(lighthouseRock["weaponBulbs"][2][0]);




var superBlinders = [ ["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000] ];

var lighthouseRock = {
  gateClosed: true,
  weaponBulbs: superBlinders,
  capacity: 30,
  secretPassageTo: "Underwater Outpost",
  numRangers: 0
};

function addRanger(location, name, skillz, station) {
  // increment the number of rangers property
  location["numRangers"]++;
  // add the ranger<number> property and assign a ranger object
  location["ranger" + location["numRangers"]] = {Ranger: name, Skills: skillz, Station: station};
  console.log(location);
}

// call addRanger three times to add the new rangers

addRanger(lighthouseRock, "Nick Walsh", "magnification burn", 2)
addRanger(lighthouseRock, "Drew Barontini", "uppercut launch", 3)
addRanger(lighthouseRock, "Christine Wong", "bomb defusing", 1)


var superBlinders = [ ["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000] ];

var lighthouseRock = {
  gateClosed: true,
  weaponBulbs: superBlinders,
  capacity: 30,
  secretPassageTo: "Underwater Outpost",
  numRangers: 3,
  ranger1: {name: "Nick Walsh", skillz: "magnification burn", station: 2},
  ranger2: {name: "Drew Barontini", skillz: "uppercut launch", station: 3},
  ranger3: {name: "Christine Wong", skillz: "bomb defusing", station: 1}
};

function dontPanic(location) {
  var list = "Avast, me hearties!\n" +
             "There be Pirates nearby! Stations!\n";

  for (var i = 1; i <= location.numRangers; i++) {
    list += location["ranger"+i].name + ", man the " +
      location.weaponBulbs[location["ranger"+i].station-1][0] +
      "!\n"; 
  }

  alert(list);
}

dontPanic(lighthouseRock);



var superBlinders = [ ["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000] ];

var lighthouseRock = {
  gateClosed: true,
  weaponBulbs: superBlinders,
  capacity: 30,
  secretPassageTo: "Underwater Outpost",
  numRangers: 3,
  ranger1: {name: "Nick Walsh", skillz: "magnification burn", station: 2},
  ranger2: {name: "Drew Barontini", skillz: "uppercut launch", station: 3},
  ranger3: {name: "Christine Wong", skillz: "bomb defusing", station: 1},
  addRanger: function(name, skillz, station) {
    this.numRangers++;                                         
    this["ranger" + this.numRangers] = {name: name, skillz: skillz, station: station};
  }
};
  
lighthouseRock.addBulb = function (name, wattage) {
  lighthouseRock.weaponBulbs.push([name, wattage]);
};

lighthouseRock.addRanger("Jordan Wade", "dual-wield hand crossbow", 4);
lighthouseRock.addBulb("tough guy", 1234567);


var rockSpearguns = {
  Sharpshooter: {barbs: 2, weight: 10, heft: "overhand"},
  Pokepistol: {barbs: 4, weight: 8, heft: "shoulder"},
  Javelinjet: {barbs: 4, weight: 12, heft: "waist"},
  Firefork: {barbs: 6, weight: 8, heft: "overhand"},
  "The Impaler": {barbs: 1, weight: 30, heft: "chest"}
};

function listGuns(guns) {
  for (var speargun in guns) {
    // modify the log message here
    console.log(speargun);
  }
}

listGuns(rockSpearguns);




var rockSpearguns = {
  Sharpshooter: {barbs: 2, weight: 10, heft: "overhand"},
  Pokepistol: {barbs: 4, weight: 8, heft: "shoulder"},
  Javelinjet: {barbs: 4, weight: 12, heft: "waist"},
  Firefork: {barbs: 6, weight: 8, heft: "overhand"},
  "The Impaler": {barbs: 1, weight: 30, heft: "chest"}
};

// build listGuns
var listGuns = function (guns){
    for (speargun in guns){
      console.log("Behold! " + speargun + ", with " + guns[speargun].heft + " heft!");
    }
  }; 

// call listGuns and pass in rockSpearguns
listGuns(rockSpearguns);

*/

//this is a working version

/*
var rockSpearguns = {
  Sharpshooter: {barbs: 2, weight: 10, heft: "overhand"},
  Pokepistol: {barbs: 4, weight: 8, heft: "shoulder"},
  Javelinjet: {barbs: 4, weight: 12, heft: "waist"},
  Firefork: {barbs: 6, weight: 8, heft: "overhand"},
  "The Impaler": {barbs: 1, weight: 30, heft: "chest"}
};

// convert listGuns function
rockSpearguns["listGuns"] = function () {
  for (property in this) {
    if (this[property]["heft"] != undefined){
    console.log("Behold! " + property + ", with " +
                this[property]["heft"] + " heft!");
    }
  }
};

// call listGuns using bracket notation on rockSpearguns
rockSpearguns["listGuns"]();

*/

/* Notes on object constructors and protypical inheritance*/


/* 

var canyonCows = [
  {name: "Bessie", type: "cow", hadCalf: "Burt"},
  {name: "Donald", type: "bull", hadCalf: null},
  {name: "Esther", type: "calf", hadCalf: null},
  {name: "Burt", type: "calf", hadCalf: null},
  {name: "Sarah", type: "cow", hadCalf: "Esther"},
  {name: "Samson", type: "bull", hadCalf: null},
  {name: "Delilah", type: "cow", hadCalf: null}
];

Array.prototype.countCattle = function(kind){
  var numKind = 0;
  for (var i = 0; i < this.length; i++){
    if (this[i].type == kind){
      numKind++;
    }
  }
    return numKind;
};

alert(canyonCows.countCattle("cow") + canyonCows.countCattle("bull") + canyonCows.countCattle("calf"));

*/

/*

var retries = 0;
do{
   retries++;
   showLoginScreen();
} while(!authenticated() && retries < 3);
if(retries==3){
   alert('Too many tries');
   return;
}

In this example, a retries variable is first created and initialized to zero. 
Next, the do loop executes. Inside the loop’s code block, the retries variable is incremented, 
  and a call is made to a showLoginScreen function, which will display a login screen that prompts 
  for a user name and password. After the user enters the appropriate information and closes the login screen, 
    the loop expression is evaluated. The authenticated function 
checks the user name and password and returns true if the user should be authenticated. 
The loop will continue as long as the user is not authenticated and the retries count is less than three.

*/

/*

var forestCows = [
  {name: "Legolas", type: "calf", hadCalf: null},
  {name: "Gimli", type: "bull", hadCalf: null},
  {name: "Arwen", type: "cow", hadCalf: null},
  {name: "Galadriel", type: "cow", hadCalf: null},
  {name: "Eowyn", type: "cow", hadCalf: "Legolas"}
];


Object.prototype.noCalvesYet = function(){
    if(this.type == "cow" && this.hadCalf == null){
      return true;
     } else { 
        return false;
     }
};



Array.prototype.countForBreeding = function(){
  var numToBreed = 0;
    for(var i = 0; i < this.length; i++){
      if (this[i].noCalvesYet() == true){
       numToBreed++;
      } 
    }
  return numToBreed;
};

var numPriorityCows = canyonCows.countForBreeding() + valleyCows.countForBreeding() + forestCows.countForBreeding() + badlandsCows.countForBreeding();

var genericPost = {
  x: 0,
  y: 0,
  postNum: undefined,
  connectionsTo: undefined,
  sendRopeTo: function(connectedPost) {
    if (this.connectionsTo == undefined) {
      var postArray = [];
      postArray.push(connectedPost);
      this.connectionsTo = postArray;
    } else {
      this.connectionsTo.push(connectedPost);
    }
  }
};

// create post1 and post2
var post1 = Object.create(genericPost);
var post2 = Object.create(genericPost);


// modify the post properties
post1.x = -2;
post1.y = 4;
post1.postNum = 1;

post2.x = 5;
post2.y = 1;
post2.postNum = 2;

// connect the posts together
post1.sendRopeTo(post2);
post2.sendRopeTo(post1);

*/

/*

var genericPost = {
  x: 0,
  y: 0,
  postNum: undefined,
  connectionsTo: undefined,
  sendRopeTo: function(connectedPost) {
    if (this.connectionsTo == undefined) {
      var postArray = [];
      postArray.push(connectedPost);
      this.connectionsTo = postArray;
    } else {
      this.connectionsTo.push(connectedPost);
    }
  }
};

// create post8, post9, and post10
var post8 = Object.create(genericPost);
var post9 = Object.create(genericPost);
var post10 = Object.create(genericPost);

// assign property values and make connections
post8.x = 0;
post8.y = -3;
post8.postNum = 8;
post8.sendRopeTo(post10);
post8.lightsOn = false;

post9.x = 6;
post9.y = 8;
post9.postNum = 9;
post9.sendRopeTo(post10);
post9.numBirds = 0;

post10.x = -2;
post10.y = 3;
post10.postNum = 10;
post10.sendRopeTo(post8);
post10.sendRopeTo(post9);
post10.weathervane = "N";
post10.lightsOn = false;

*/

/*

these are notes on constructor functions 

*/

/*
function Fencepost(x, y, postNum) {
  this.x = x;
  this.y = y;
  this.postNum = postNum;
  this.connectionsTo = [];
  this.sendRopeTo = function(connectedPost) {
    this.connectionsTo.push(connectedPost);
  };
}

var xy = new Fencepost(1, 2, 3);

xy.sendRopeTo(10);

var post18 = new Fencepost(-3, 4, 18);
var post19 = new Fencepost(5, -1, 19);
var post20 = new Fencepost(2, 10, 20);

post18.sendRopeTo(post20);
post20.sendRopeTo(post18);

post18.sendRopeTo(post19);
post19.sendRopeTo(post18);
*/


//convert this constructor to a constructor and a prototypes of the constructor

/*
function Fencepost(x, y, postNum) {
  this.x = x;
  this.y = y;
  this.postNum = postNum;
  this.connectionsTo = [];  
}

Fencepost.prototype = {
  sendRopeTo = function(connectedPost) {
    this.connectionsTo.push(connectedPost);
  };
  removeRope = function(removeTo) {
    var temp = [];
    for (var i = 0; i < this.connectionsTo.length; i++) {
      if (this.connectionsTo[i].postNum != removeTo) {
        temp.push(this.connectionsTo[i]);
      }
    }    
    this.connectionsTo = temp;
  };
  movePost = function(x, y) {
    this.x = x;
    this.y = y;
  };
};

*/
