//const data type cannot be changed, see error console

console.log("this is module 2");

const constantDemo = [`tyler`, `preethi`, `armahn`, `super samu`];

try {
  constantDemo = "changed";
} catch (e) {
  console.log(e);
} finally {
  console.log("here is your response:");
}

console.log(constantDemo);
