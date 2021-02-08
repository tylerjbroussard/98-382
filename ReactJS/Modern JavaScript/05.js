/* 

Default Parameters

*/

console.log("this is module 5");

let defParameter = (param1 = "Tyler", param2 = "Ice Cream") => {
  console.log(`Hello ${param1}, today we will be having ${param2}`);
};

defParameter();

defParameter("Samar", "Chicken");
