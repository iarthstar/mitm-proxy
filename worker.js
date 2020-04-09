importScripts("test.js");

console.log(testFunc);

var fib = (num) => {
  if(num == 0 || num == 1) return 1;
  return fib(num - 1) + fib(num - 2);
};

const mul = (data) => {
  console.log(data);
  if(data["num-1"] && data["num-2"]){
    return data["num-1"] * data["num-2"];
  }
};

// Web Worker Communication with Main JS
onmessage = (e) => {
  const { data: { action, payload }} = e;
  let ret;
  switch(action){
    case "FIB": ret = fib(payload); break;
    case "MUL": ret = mul(payload); break;
    default: {
      console.log(action, "action not found");
    };
  }
  postMessage({action, payload: ret});
};