// this is a simple js function which is used for adding two numbers but it also be used for strings if we pass the string data than it will just concat the two numbers like '1' and '5'  becomes '15'
// here this function is not telling us which data types it wants as a input we can not do this in JS but we can do this in TS
function add(a, b) {
  return a + b;
}

const result = add(2, 5);

console.log(result);