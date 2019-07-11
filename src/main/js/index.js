import React from "react";
import ReactDOM from "react-dom";
import Application from "./components/Application";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faReply } from "@fortawesome/free-solid-svg-icons/faReply";

window.addEventListener("DOMContentLoaded", () => {
	library.add(faReply);
	dom.watch();
	ReactDOM.render(<Application />, document.getElementById("root"));
});
