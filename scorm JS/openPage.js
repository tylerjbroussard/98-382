var openPage = function () {
  var url =
    "https:/page.html?";

  console.log("url = ", url);

  var lmsApi = parent;

  if (!lmsApi.CmiData) {
    var learnerId = 00000;
  } else {
    try {
      var learnerId = lmsApi.CmiData["cmi.learner_id"];
    } catch (e) {
      console.error(e);
    }
  }

  var ID = learnerId.toString();

  var updateUrl = url + ID;

  window.open(updateUrl, `Regportal_Window`, `toolbar=no`);
};

openPage();
