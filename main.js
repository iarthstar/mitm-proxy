const webWorker = new Worker("worker.js");

const actions = {
  MUL: "MUL",
  FIB: "FIB"
};

const data = {};

webWorker.onmessage = (e) => {
  const { data: { action, payload }} = e;
  switch(action){
    case "FIB": console.log("FIB RETURN", payload); break;
    case "MUL": console.log("MUL RETURN", payload); break;
    default: {
      console.log(action, "action not found");
    };
  }
};

const handleInput = ({ target: { name, value }}) => {
  data[name] = value;
  webWorker.postMessage({ action: actions.MUL, payload: data });
}

window["num-1"].oninput = handleInput;
window["num-2"].oninput = handleInput;
window["fibo"].oninput = ({target: {value}}) => webWorker.postMessage({ action: "FIB", payload: value });