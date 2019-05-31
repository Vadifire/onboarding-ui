/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function getHomeTimeline() {\n\tvar xhttp = new XMLHttpRequest();\n\txhttp.onreadystatechange = function() {\n\t\tif (this.readyState == 4) {\n\t\t\tif (this.status == 200) {\n\t\t\t\tvar tweetsDiv = document.getElementById(\"tweets\");\n\t\t\t\twhile (tweetsDiv.firstChild) { // First, clear DIV\n\t\t\t\t\ttweetsDiv.removeChild(tweetsDiv.firstChild);\n\t\t\t\t}\n\t\t\t\tvar responseObj = JSON.parse(this.responseText);\n\t\t\t\tfor (var i = 0; i < responseObj.length; i++) {\n\t\t\t\t\tvar tweetDiv = document.createElement(\"div\");\n\t\t\t\t\tif (i % 2 == 1) {\n\t\t\t\t\t\ttweetDiv.className = \"even-row\"; // It's reversed because i == 0 is \"1st\" tweet \n\t\t\t\t\t} else {\n\t\t\t\t\t\ttweetDiv.className = \"odd-row\";\n\t\t\t\t\t}\n\n\t\t\t\t\tvar tweetLink = document.createElement(\"a\");\n\t\t\t\t\ttweetLink.href = responseObj[i].url;\n\t\t\t\t\ttweetLink.setAttribute(\"target\", \"_blank\");\n\n\t\t\t\t\tvar tweetSpan = document.createElement(\"span\");\n\t\t\t\t\ttweetSpan.className = \"tweet\";\n\t\t\t\t\ttweetSpan.href = responseObj[i].url;\n\n\t\t\t\t\tvar userDiv = document.createElement(\"div\");\n\t\t\t\t\tuserDiv.className = \"user-div\";\n\t\t\t\t\tvar contentDiv = document.createElement(\"div\");\n\t\t\t\t\tcontentDiv.className = \"content-div\";\n\n\t\t\t\t\tvar imageElement = document.createElement(\"img\");\n\t\t\t\t\timageElement.className = \"profile-image\";\n\t\t\t\t\timageElement.setAttribute(\"src\", responseObj[i].user.profileImageUrl);\n\t\t\t\t\tuserDiv.appendChild(imageElement);\n\n\t\t\t\t\tvar nameDiv = document.createElement(\"div\");\n\t\t\t\t\tnameDiv.appendChild(document.createTextNode(responseObj[i].user.name));\n\t\t\t\t\tnameDiv.className = \"display-name\";\n\t\t\t\t\tuserDiv.appendChild(nameDiv);\n\t\t\t\t\tvar twitterHandleDiv = document.createElement(\"div\");\n\t\t\t\t\ttwitterHandleDiv.appendChild(document.createTextNode(responseObj[i].user.twitterHandle));\n\t\t\t\t\ttwitterHandleDiv.className = \"twitter-handle\";\n\t\t\t\t\tuserDiv.appendChild(twitterHandleDiv);\n\n\t\t\t\t\tdateDiv = document.createElement(\"div\");\n\t\t\t\t\tdateDiv.className = \"date\";\n\t\t\t\t\tdateDiv.appendChild(document.createTextNode(\n\t\t\t\t\t\tnew Date(responseObj[i].createdAt).toLocaleString(\"en-us\", {month: \"short\", day: \"numeric\"})\n\t\t\t\t\t));\n\t\t\t\t\tcontentDiv.appendChild(dateDiv);\n\n\t\t\t\t\tvar messageDiv = document.createElement(\"div\");\n\t\t\t\t\tmessageDiv.className = \"message\";\n\t\t\t\t\tmessageDiv.appendChild(document.createTextNode(responseObj[i].message));\n\t\t\t\t\tcontentDiv.appendChild(messageDiv);\n\n\t\t\t\t\ttweetSpan.appendChild(userDiv);\n\t\t\t\t\ttweetSpan.appendChild(contentDiv);\n\t\t\t\t\ttweetDiv.appendChild(tweetSpan);\n\t\t\t\t\ttweetLink.appendChild(tweetDiv);\n\t\t\t\t\ttweetsDiv.appendChild(tweetLink);\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tconsole.error(this.response);\n\t\t\t}\n\t\t}\n\t}\n\txhttp.open(\"GET\", \"http://localhost:8080/api/1.0/twitter/timeline\");\n\txhttp.send();\n}\n\nwindow.getHomeTimeline = getHomeTimeline;\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });