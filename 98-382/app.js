/*

--Program with JavaScript Operators, Methods, and Keywords--


*/

//assignment is =

let x = 123;

//increment is ++

let increase = () => x++;

increase();

//decrement is --

let decrease = () => x--;

decrease();

//addition

let addition = () => x + 2;

addition();

//subtraction

let subtraction = () => x - 1;

subtraction();

//division

let division = () => x / 2;

division();

//multiplication

let multiply = () => x * 3;

multiply();

//modulus

let modulus = () => x % 3;

modulus();

//compound assignment

/* 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Assignment

*/

let compoundMe = () => {
  debugger;
  let y = 3;
  let z = 15;
  x += y;
  x - +y;
  x *= y;
  x /= y;
  z %= y;
  x **= y;
  x <<= y;
  x >>= y;
  x >>>= y;
  x &= y;
  x ^= y;
  x |= y;
  x &&= y;
  x ||= y;
  x ??= y;
};

compoundMe();

//Apply JavaScript best practices

/* 

--Rules for naming variables

Every programming language has rules for naming variables, and JavaScript is no exception. You must adhere to the following rules when naming JavaScript variables. 

- A variable name can contain numbers, but they cannot begin with a number. Legal examples are xl, )/2, gift4you. Illegal examples are 4YourEyes, 2give, IForAll. Variable names must not contain mathematical or logical operators. Illegal examples are monday-friday, boxes+bags, cost*5. 

- Variable names must not contain any punctuation marks of any kind other than the underscore (_) and dollar sign ($). Legal examples are vehicle_identification, first_name, last_name, $cost, total$. Illegal examples are thisDoesn'tWork, begin;end, Many#s. 

- Variable names must not contain any spaces. Variable names must not be JavaScript keywords, but they can contain keywo rds.Illegal examples are function, char, class, for, var. Legal examples are theFunction, forLoop, myVar. 

- Variable names are case-sensitive. Examples of different-case variables are MyData, myData, mydata, MYDATA.

When you create a variable, give the variable a name that is descriptive enough that you need a comment to describe what it is. If you need to add a comment to describe the variable usage, the comment will be at the declaration only. If you name the variable in a way
that does not require a comment, the meaningful name will be readable throughout your code. Here are some good and bad examples of variable naming:

//bad examples
var last; //last accessed date
var current; //current vehicle
var changed; // the vehicle make was changed


//good examples
var lastAccessedDate;
var currentVehic1e;
var vehicleMakeWasChanged ;

Notice the casing that is used in the good examples. The recommended naming convention for JavaScript variables is to use camel casing, which means you start a variable name in lowercase and then capitalize the first letter of each subsequent word that makes up the
variable name. Although a variable name can contain the dollar sign and the underscore, it's usually preferable not to use them. The exception is when assigning jQuery objects (discussed in Chapter
6, "Essential JavaScript and jQuery") to variables, when you might want to begin the variable name with the dollar sign.

--The environment

The collection of all variables and their values is commonly referred to as the environment. When the environment is created, it contains many standard variables plus the variables you create. In a web application, each time a webpage is loaded into the browser, a new environment is created, and the old environment is destroyed. Any variables that you create are accessible until a new webpage is loaded.


*/
/*

The HTML <noscript> element defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser.

function noScriptTag() {
    return (
        <noscript>
            <!-- anchor linking to external file -->
            <a href="https://www.mozilla.com/">External Link</a>
        </noscript>
        <p>Rocks!</p>
    )
};
*/

//reserved keywords

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar

/*

break
case
catch
class
const
continue
debugger
default
delete
do
else
export
extends
finally
for
function
if
import
in
instanceof
new
return
super
switch
this
throw
try
typeof
var
void
while
with
yield

*/

/*

Browser Object Model

The Browser Object Model (BOM) is a larger representation of everything provided by the browser including the current document, location, history, frames, and any other
functionality the browser may expose to JavaScript.
The Browser Object Model is not standardized and can change based on different browsers.
The BOM's most important task is managing browser windows and enabling communication between the windows. Therefore, the window object stands at the center of the BOM.
Every HTML document loaded into a browser window becomes a Document object which is an object in the Browser Object Model (BOM). All nodes with their contents in the
BOM can be modified or deleted, and new node can be created by Javascript.



*/

//dialog element

/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog */

var updateButton = document.getElementById("updateDetails");
var favDialog = document.getElementById("favDialog");
var outputBox = document.querySelector("output");
var selectEl = document.querySelector("select");
var confirmBtn = document.getElementById("confirmBtn");

// "Update details" button opens the <dialog> modally
updateButton.addEventListener("click", function onOpen() {
  if (typeof favDialog.showModal === "function") {
    favDialog.showModal();
  } else {
    alert("The <dialog> API is not supported by this browser");
  }
});
// "Favorite animal" input sets the value of the submit button
selectEl.addEventListener("change", function onSelect(e) {
  confirmBtn.value = selectEl.value;
});
// "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
favDialog.addEventListener("close", function onClose() {
  outputBox.value =
    favDialog.returnValue + " button clicked - " + new Date().toString();
});

//display screen size.

Window.screen;

/* 

Screen {availWidth: 1920, availHeight: 1040, width: 1920, height: 1080, colorDepth: 24, …}
availHeight: 1040
availLeft: 0
availTop: 0
availWidth: 1920
colorDepth: 24
height: 1080
orientation: ScreenOrientation {angle: 0, type: "landscape-primary", onchange: null}
pixelDepth: 24
width: 1920
__proto__: Screen

*/
