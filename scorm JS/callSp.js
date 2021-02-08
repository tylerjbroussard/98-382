/* 

CmiData:
adl.nav.request_valid.continue: "true"
adl.nav.request_valid.previous: "true"
cmi._version: "1.0"
cmi.completion_status: "completed"
cmi.credit: "credit"
cmi.entry: "resume"
cmi.exit: "suspend"
cmi.learner_id: ""
cmi.learner_name: " "
cmi.learner_preference.audio_captioning: "0"
cmi.learner_preference.audio_level: "1.00000"
cmi.learner_preference.delivery_speed: "1.00000"
cmi.mode: "normal"
cmi.session_time: "PT3M0.2S"
cmi.success_status: "unknown"
cmi.suspend_data: ""
cmi.total_time: "PT2.46S"
core.completed_by_measure: "False"
core.satisfied_by_measure: "False"
__proto__: Object

lastCommittedCmiData:
cmi.completion_status: "completed"
cmi.exit: "suspend"
cmi.suspend_data: ""

var lmsApi = parent;
lmsApi.CmiData["cmi.learner_name"]; //return users name


*/

var requestURL, responseData;
var gotime = function () {
  $(document).ready(function () {
    $.support.cors = true;
    let url = requestURL;
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      type: "GET",
      url: url,
    })
      .done(function (data) {
        responseData = data;
        console.log(responseData);
      })
      .fail(function (error) {
        console.log(error);
      });
  });
};
