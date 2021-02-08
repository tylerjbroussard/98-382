/*
Destructuring objects
*/

console.log("this is module 8");

let thingsToDo = {
  mourning: "Exercise",
  afternoon: "Work",
  evening: "Code",
  night: ["Sleep", "Dream"],
};

let { mourning, afternoon, night } = thingsToDo;

console.log(mourning, afternoon, night[1]);

//////////

let uniStudent = (student) => {
  console.log(`${student.name} from ${student.university}`);
};

let studentOne = {
  name: `Tyler`,
  university: `UW of Tacoma`,
};

uniStudent(studentOne);
