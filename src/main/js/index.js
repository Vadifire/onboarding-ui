import React from "react";
import ReactDOM from "react-dom";
import Application from "./components/Application";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faComment } from "@fortawesome/free-solid-svg-icons/faComment";

window.addEventListener("DOMContentLoaded", () => {
	library.add(faComment);
	dom.watch();
	ReactDOM.render(<Application />, document.getElementById("root"));
});
