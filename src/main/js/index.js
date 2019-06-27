import React, { Component } from "react";
import ReactDOM from "react-dom";
import Application from "./components/Application";
import * as Api from "./twitter-api";

window.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(<Application api={Api}/>, document.getElementById("root"));
});
