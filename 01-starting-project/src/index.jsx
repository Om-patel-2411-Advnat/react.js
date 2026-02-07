import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<App />);

// this is also valid using non jsx code 
// ReactDOM.createRoot(entryPoint).render(React.createElement(App));