var lmsApi = parent;
var userName = lmsApi.GetStudentName();
var nameArray = userName.split(", ");
var firstName = nameArray[1];
var lastName = nameArray[0];
var player = GetPlayer();
player.SetVar("first_name", firstName);
player.SetVar("last_name", lastName);

/* Updated version*/

var lmsApi = parent;
if (!lmsApi.CmiData) {
  var rawName = "USER ACCOUNT";
} else {
  try {
    var rawName = lmsApi.CmiData["cmi.learner_name"];
  } catch (e) {
    console.error(e);
  }
}
rawName = rawName.toLowerCase();
var [f, l] = rawName.split(" ");
var fullName =
  f.replace(f[0], f[0].toUpperCase()) +
  " " +
  l.replace(l[0], l[0].toUpperCase());
var player = GetPlayer();
player.SetVar("UserName", fullName);
