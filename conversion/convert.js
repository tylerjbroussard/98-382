"use strict";

var result;
var lmsApi;

//7 different strings to accomodate 7 unique mod completion code
var hexString0 =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var hexString2 =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var hexString6 =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var hexString3 =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz)!@#$%^&*(";
var hexString4 =
  ")!@#$%^&*(JKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var hexString5 =
  ")!@#$%^&*(JKLMNOPQRSTUVWXYZABCDEFGHIjklmnopqrstuvwxyz0123456789";
var hexString7 =
  ")!@#$%^&*(JKLMNOPQRSTUVWXYZABCDEFGHIabcdefghijklmnopq0123456789";
var hexString1 =
  ")!@#$%^&*(0123456789abcdefghijklmnoABCDEFGHIJKLMNOPQRqrstuvwxyz";

//hexList[0] has to be used first to encode the value
var hexList = [
  hexString0,
  hexString1,
  hexString2,
  hexString3,
  hexString4,
  hexString5,
  hexString6,
  hexString7,
];

//1 creates user string from WeLearn data
var createUserString = function () {
  lmsApi = parent;
  if (!lmsApi.CmiData)
    lmsApi.CmiData = {
      "cmi.learner_id": "98765",
      "cmi.learner_name": "USER ACCOUNT",
    };
  let userLmsId = lmsApi.CmiData["cmi.learner_id"]; //replace with sharepoint call for data
  //let userLmsName = CmiData["cmi.learner_name"]; //replace with sharepoint call for data
  let completedMod = "true"; //{make this spservices call to modend data, if date exists then true}

  //let unencodedString = `${userLmsId}${userLmsName}${completedMod}`;
  let unencodedString = `${userLmsId}${completedMod}`;
  return unencodedString;
};

//2 function to convert user string to encoded hex string for transfer
var converter = function (userInfo) {
  let loaded = [];
  let unloaded = "";

  //unloads string to an array
  for (let i = 0; i < userInfo.length; i++) {
    if (userInfo.charAt(i) !== " ") loaded.push(userInfo.charAt(i));
  }

  loaded.forEach((index) => {
    if (index !== " ") {
      let numIndex = hexList[0].indexOf(index); //use hexList[0] first
      unloaded += hexList[1].charAt(numIndex);
    }
  });
  result = unloaded;
  return result;
};

//3 main function to call others
var encodeUserProgress = function () {
  let rawString = createUserString();
  result = converter(rawString);
  return result;
};

//4 reverse process to decode user info
function decodeUserProgress(userProgress) {
  let loaded = [];
  let unloaded = "";

  for (let i = 0; i < userProgress.length; i++) {
    loaded.push(userProgress.charAt(i));
  }

  loaded.forEach((index) => {
    let numIndex = hexList[1].indexOf(index);
    unloaded += hexList[0].charAt(numIndex);
  });
  result = unloaded;
  return result;
}

var finalizeMod = function () {
  let encodedResult = encodeUserProgress();
  let player = GetPlayer();
  let submittedCode = player.GetVar("SubmittedCode");
  let isCodeCorrect;

  if (submittedCode == encodedResult) {
    isCodeCorrect = true;
    player.SetVar("CorrectCode", isCodeCorrect);
  } else {
    isCodeCorrect = true;
    player.SetVar("IncorrectCode", isCodeCorrect);
  }
};

finalizeMod();

/*

let stageOne = encodeUserProgress();
console.log(stageOne);


for testing


let stageTwo = decodeUserProgress(stageOne);


console.log(stageTwo);

*/
