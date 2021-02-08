##The Run-Time Environment in a Nutshell
In SCORM, all content is launched in a web browser. The LMS initiates the launch of the content and is required to implement an API consisting of eight functions that content may access to communicate with the LMS.

Initialize()
Terminate()
GetValue()
SetValue()
Commit()
GetLastError()
GetErrorString()
GetDiagnostic()

##This API is implemented by what SCORM calls an API Adapter. The API Adapter must be an ECMAScript (JavaScript) object named “API_1484_11” that is accessible though the DOM. An API Adapter must reside in a window that is the opener window or a parent frame of the window that contains the content. This means that the LMS may launch the content either in a new window or in a frameset and the content will always know where to find this API. The Adapter must implement the eight functions listed above.
