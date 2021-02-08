/*
Arrow functions, or lambda functions
*/

console.log("this is module 6");

function greeting(message) {
  return alert(`${message} everyone!`);
}

let greeting2 = (message) => alert(`${message} everyone!`);

let createBlog = (title, body) => {
  if (!title) {
    throw new Error("A title is required");
  }

  if (!body) {
    throw new Error("Body can't be empty");
  }
  return `${title} - ${body}`;
};

try {
  createBlog();
} catch (e) {
  console.log(e);
} finally {
  console.log(createBlog("My kids run wild", "here is what i want to say!"));
}
