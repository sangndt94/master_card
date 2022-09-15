// (C) 2007-2019 GoodData Corporation
import React from "react";
import ReactDOM from "react-dom";
import "@babel/polyfill";

import App from "./App";
import { initialize } from "./components/utils/GoogleTagManager";

initialize("GTM-MVJ996D");

const root = document.createElement("div");
root.className = "root";
document.body.appendChild(root);
ReactDOM.render(<App />, root);
