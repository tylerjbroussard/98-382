var lmsApi = parent;
var userName = lmsApi.GetStudentName();
var nameArray = userName.split(", ");
var firstName = nameArray[1];
var lastName = nameArray[0];
var player = GetPlayer();
player.SetVar("first_name", firstName);
player.SetVar("last_name", lastName);
