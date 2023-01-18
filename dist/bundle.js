/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* color pallet \n#FFE194 main: (golden orange medium) \n#E8F6EF : background (high light blue white)\n#B8DFD8: hover ( medium blue) \n#4C4C6D: accent color : text etc \n */\n\n\n* {\n  margin:0;\n  padding:0;\n  font-family: 'Kalam',cursive;\n}\n\n/* semantic framing */\n\nnav {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  background-color:#FFE194;\n  height: 5rem;\n  flex-direction: row;\n}\nbody {\nheight:100vh;\noverflow-y: scroll;\nbackground-color:#E8F6EF ;\n}\naside {\ndisplay:flex;\nflex-direction: column;\nwidth: 30%;\nbackground-color:#FFE194;\n}\nfieldset{\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-content: space-around;\n  justify-content: space-between;\n  align-items: center;\n}\nselect,\ninput {\n  width: 10rem;\n  height: 2rem;\n}\narticle {\n  width: 73%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 13rem;\n  background-color:#B8DFD8;\n  \n}\n\n\n/* navBarArea */\n.logout-btn-wrapper > .logout {\n  height: 100%;\n  width: 14rem;\n  background-color:#B8DFD8;\n  font-size: 31px;\n  color: black;\n  cursor:grab;\n}\n.logout:hover {\n  background-color:white;\n  color:#4C4C6D;\n}\n\n\n/* main Body Area */\n\n.trips-display {\n  position: absolute;\n  left: 31rem;\n  bottom: -17rem;\n  border: 2px solid black;\n  width: 63%;\n  height: 86vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  background-color:#FFE194;\n  \n}\n.bookify-logo {\n  height:18rem;\n}\n\n\n/* Aside Area  */\n.logo-section {\n  height: 31rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  background-color:#FFE194;\n}\n.company-wrapper {\n  border:1px solid black;\n  height: 6rem;\n  width: 24rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color:#E8F6EF;\n  color:black;\n  font-size: x-large;\n}\n.form-container {\n  display: flex;\n  height: 100%;\n  align-items: center;\n  flex-direction: column;\n}\n.disclaimer{\n  color:black;\n  font-size: larger;\n}\n.error-wrapper {\n  display: flex;\n  margin-top: 2rem;\n  width: 100%;\n  height: 7rem;\n  justify-content: center;\n  align-items: center;\n  background-color: #4C4C6D;\n  \n}\n.error-message{\n  color:#E8F6EF;\n  font-size: x-large;\n}\n\n\n.form-intro-wrapper {\n  margin-top: 6rem;\n  display: flex;\n  border: solid black;\n  height: 9rem;\n  width: 25rem;\n  justify-content: center;\n  background-color:#B8DFD8;\n  align-items: center;\n  border-radius: 5%;\n}\n.form-intro {\n  height: 66%;\n  background-color:#4C4C6D;\n  font-size: xx-large;\n  color:#E8F6EF;   \n}\n.form-intro:hover {\n  background-color: white;\n  color: #4C4C6D;\n  cursor: grab;\n}\n.booking-form-container {\n  border: 2px solid;\n  margin-top: 4rem;\n  width: 100%;\n  height: 23rem;\n  display: flex;\n  flex-direction: column;\n  background-color:#B8DFD8;\n}\n\n.traveling-people-wrapper,\n.duration-trip-wrapper,\n.destination-form-wrapper,\n.date-wrapper {\n  display: flex;\n  border: 1px solid black;\n  flex-direction: row;\n  justify-content: space-around;\n  height: 10rem;\n  align-items: center;\n  width: 100%;  \n}\n.est-cost-wrapper,\n.button-styler{\n  display: flex;\n  height: 3rem;\n  width: 57%;\n  align-content: center;\n  justify-content: center;\n  background-color: #4C4C6D;\n  \n}\n.book-input-sub {\n  height: 2rem;\n  margin-top: 7px;\n  width: 83%;\n  border-radius: 3%;\n  background-color:#EAEAEA;\n  font-size: x-large;\n}\n.book-input-sub:hover{\n  cursor:grab;\n  background-color: white;\n  color: #4C4C6D;\n}\n.estimated-cost-display{\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%; \n  color:black;\n}\n.est-cost-wrapper > .show-est-cost {\n  width: 13rem;\n  height: 2rem;\n  font-size: x-large; \n}\n\n.show-est-cost:hover{\n  cursor: grab;\n  background-color: white;\n  color: #00ABB3;\n}\n.est-cost-wrapper {\n  border: 1px solid black;\n  width: 15rem;\n  display: flex;\n  justify-content: center;\n  height: 3rem;\n}\n.dollar-styler {\n  display: flex;\n  width: 100%;\n  justify-content: space-around;\n}\n\n/* user Welcome Area  */\n.user-info-area{\n  display: flex;\n  flex-direction: column;\n  margin-left: 0rem;\n  width: 24rem;\n}\n.customer-welcome {\n  display: flex;\n  position: absolute;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  top: 6rem;\n  right: 3rem;\n  width: 63%;\n  height: 14rem;\n  margin-bottom: 3rem;\n  background-color:#B8DFD8;\n  color: black;\n}\n.customer-welcome > .hello-person {\n font-size: 38px;\n}\n.annual-spending-wrapper,\n.today-wrapper{\n  display: flex;\n  border: 1px solid;\n  height: 4rem;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 1rem;\n  color: #E8F6EF;\n  background-color:#4C4C6D;\n  font-size:15px;\n}\n\n/* card displays */\n.trip-info-card-past,\n.trip-info-card-pend,\n.trip-info-card-upcoming {\n  border: 2px solid black;\n  width: 80%;\n  display: flex;\n  overflow-y: scroll;\n  scrollbar-width: 11px;\n  flex-direction: column;\n  align-items: center;\n  height: 10rem;\n  background-color: #4C4C6D;\n}\n.book-card {\n  border: 1px solid black;\n  height: 26rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color:#E8F6EF;\n  margin-top: 3rem;\n  width: 66%;\n  box-shadow: 22px 13px;\n}\n.section-label{\n color:black;\n size:17px;\n font-weight: 400;\n}\n\n.book-card >img {\n  height:8rem;\n  \n}\n.post-Fail,\n.fetch-Fail {\ncolor:black;\nfont-size: x-large;\n}\n.no-record {\n  color:#E8F6EF;\n  font-size: x-large;\n}\n\n/* login-area */\n.login-area {\n  border: 2px solid black;\n  height: 31rem;\n  position: absolute;\n  top: 10rem;\n  left: 22rem;\n  width: 48rem;\n  display: flex;\n  justify-content: space-around;\n  flex-direction: column;\n  align-items: center;\n  background-color: #FFE194;\n}\n.login-intro-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.book-title {\n  color: #4C4C6D;\n}\n\n.bookify-entry {\n  height: 14rem;\n  width: 22rem;\n}\n.entry-wrapper {\n  border: 2px solid;\n  height: 17rem;\n  width: 31rem;\n  display: flex;\n  align-items: center;\n  align-content: center;\n  justify-content: center;\n  background-color:#B8DFD8;\n}\n.size-up {\n  width: 13rem;\n  height: 3rem;\n  font-size: x-large;\n}\n.login-Btn {\n  width: 11rem;\n  height: 3rem; \n  background-color: #4C4C6D;\n  color:#EAEAEA;\n  font-size: 30px;\n}\n.login-Btn:hover {\n  background-color: #E8F6EF;\n  color:#4C4C6D;\n  cursor: grabbing;\n}\n\n.hidden {\n  display: none; \n} ", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["/* color pallet \n#FFE194 main: (golden orange medium) \n#E8F6EF : background (high light blue white)\n#B8DFD8: hover ( medium blue) \n#4C4C6D: accent color : text etc \n */\n\n\n* {\n  margin:0;\n  padding:0;\n  font-family: 'Kalam',cursive;\n}\n\n/* semantic framing */\n\nnav {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  background-color:#FFE194;\n  height: 5rem;\n  flex-direction: row;\n}\nbody {\nheight:100vh;\noverflow-y: scroll;\nbackground-color:#E8F6EF ;\n}\naside {\ndisplay:flex;\nflex-direction: column;\nwidth: 30%;\nbackground-color:#FFE194;\n}\nfieldset{\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-content: space-around;\n  justify-content: space-between;\n  align-items: center;\n}\nselect,\ninput {\n  width: 10rem;\n  height: 2rem;\n}\narticle {\n  width: 73%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 13rem;\n  background-color:#B8DFD8;\n  \n}\n\n\n/* navBarArea */\n.logout-btn-wrapper > .logout {\n  height: 100%;\n  width: 14rem;\n  background-color:#B8DFD8;\n  font-size: 31px;\n  color: black;\n  cursor:grab;\n}\n.logout:hover {\n  background-color:white;\n  color:#4C4C6D;\n}\n\n\n/* main Body Area */\n\n.trips-display {\n  position: absolute;\n  left: 31rem;\n  bottom: -17rem;\n  border: 2px solid black;\n  width: 63%;\n  height: 86vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  background-color:#FFE194;\n  \n}\n.bookify-logo {\n  height:18rem;\n}\n\n\n/* Aside Area  */\n.logo-section {\n  height: 31rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  background-color:#FFE194;\n}\n.company-wrapper {\n  border:1px solid black;\n  height: 6rem;\n  width: 24rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color:#E8F6EF;\n  color:black;\n  font-size: x-large;\n}\n.form-container {\n  display: flex;\n  height: 100%;\n  align-items: center;\n  flex-direction: column;\n}\n.disclaimer{\n  color:black;\n  font-size: larger;\n}\n.error-wrapper {\n  display: flex;\n  margin-top: 2rem;\n  width: 100%;\n  height: 7rem;\n  justify-content: center;\n  align-items: center;\n  background-color: #4C4C6D;\n  \n}\n.error-message{\n  color:#E8F6EF;\n  font-size: x-large;\n}\n\n\n.form-intro-wrapper {\n  margin-top: 6rem;\n  display: flex;\n  border: solid black;\n  height: 9rem;\n  width: 25rem;\n  justify-content: center;\n  background-color:#B8DFD8;\n  align-items: center;\n  border-radius: 5%;\n}\n.form-intro {\n  height: 66%;\n  background-color:#4C4C6D;\n  font-size: xx-large;\n  color:#E8F6EF;   \n}\n.form-intro:hover {\n  background-color: white;\n  color: #4C4C6D;\n  cursor: grab;\n}\n.booking-form-container {\n  border: 2px solid;\n  margin-top: 4rem;\n  width: 100%;\n  height: 23rem;\n  display: flex;\n  flex-direction: column;\n  background-color:#B8DFD8;\n}\n\n.traveling-people-wrapper,\n.duration-trip-wrapper,\n.destination-form-wrapper,\n.date-wrapper {\n  display: flex;\n  border: 1px solid black;\n  flex-direction: row;\n  justify-content: space-around;\n  height: 10rem;\n  align-items: center;\n  width: 100%;  \n}\n.est-cost-wrapper,\n.button-styler{\n  display: flex;\n  height: 3rem;\n  width: 57%;\n  align-content: center;\n  justify-content: center;\n  background-color: #4C4C6D;\n  \n}\n.book-input-sub {\n  height: 2rem;\n  margin-top: 7px;\n  width: 83%;\n  border-radius: 3%;\n  background-color:#EAEAEA;\n  font-size: x-large;\n}\n.book-input-sub:hover{\n  cursor:grab;\n  background-color: white;\n  color: #4C4C6D;\n}\n.estimated-cost-display{\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%; \n  color:black;\n}\n.est-cost-wrapper > .show-est-cost {\n  width: 13rem;\n  height: 2rem;\n  font-size: x-large; \n}\n\n.show-est-cost:hover{\n  cursor: grab;\n  background-color: white;\n  color: #00ABB3;\n}\n.est-cost-wrapper {\n  border: 1px solid black;\n  width: 15rem;\n  display: flex;\n  justify-content: center;\n  height: 3rem;\n}\n.dollar-styler {\n  display: flex;\n  width: 100%;\n  justify-content: space-around;\n}\n\n/* user Welcome Area  */\n.user-info-area{\n  display: flex;\n  flex-direction: column;\n  margin-left: 0rem;\n  width: 24rem;\n}\n.customer-welcome {\n  display: flex;\n  position: absolute;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  top: 6rem;\n  right: 3rem;\n  width: 63%;\n  height: 14rem;\n  margin-bottom: 3rem;\n  background-color:#B8DFD8;\n  color: black;\n}\n.customer-welcome > .hello-person {\n font-size: 38px;\n}\n.annual-spending-wrapper,\n.today-wrapper{\n  display: flex;\n  border: 1px solid;\n  height: 4rem;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  margin-top: 1rem;\n  color: #E8F6EF;\n  background-color:#4C4C6D;\n  font-size:15px;\n}\n\n/* card displays */\n.trip-info-card-past,\n.trip-info-card-pend,\n.trip-info-card-upcoming {\n  border: 2px solid black;\n  width: 80%;\n  display: flex;\n  overflow-y: scroll;\n  scrollbar-width: 11px;\n  flex-direction: column;\n  align-items: center;\n  height: 10rem;\n  background-color: #4C4C6D;\n}\n.book-card {\n  border: 1px solid black;\n  height: 26rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color:#E8F6EF;\n  margin-top: 3rem;\n  width: 66%;\n  box-shadow: 22px 13px;\n}\n.section-label{\n color:black;\n size:17px;\n font-weight: 400;\n}\n\n.book-card >img {\n  height:8rem;\n  \n}\n.post-Fail,\n.fetch-Fail {\ncolor:black;\nfont-size: x-large;\n}\n.no-record {\n  color:#E8F6EF;\n  font-size: x-large;\n}\n\n/* login-area */\n.login-area {\n  border: 2px solid black;\n  height: 31rem;\n  position: absolute;\n  top: 10rem;\n  left: 22rem;\n  width: 48rem;\n  display: flex;\n  justify-content: space-around;\n  flex-direction: column;\n  align-items: center;\n  background-color: #FFE194;\n}\n.login-intro-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.book-title {\n  color: #4C4C6D;\n}\n\n.bookify-entry {\n  height: 14rem;\n  width: 22rem;\n}\n.entry-wrapper {\n  border: 2px solid;\n  height: 17rem;\n  width: 31rem;\n  display: flex;\n  align-items: center;\n  align-content: center;\n  justify-content: center;\n  background-color:#B8DFD8;\n}\n.size-up {\n  width: 13rem;\n  height: 3rem;\n  font-size: x-large;\n}\n.login-Btn {\n  width: 11rem;\n  height: 3rem; \n  background-color: #4C4C6D;\n  color:#EAEAEA;\n  font-size: 30px;\n}\n.login-Btn:hover {\n  background-color: #E8F6EF;\n  color:#4C4C6D;\n  cursor: grabbing;\n}\n\n.hidden {\n  display: none; \n} "],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/nextTravel.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/dateNight.jpg");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Destination {
    constructor(place) {
    this.id = place.id;
    this.destination = place.destination;
    this.estimatedLodgingCostPerDay = place.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = place.estimatedFlightCostPerPerson;
    this.image = place.image;
    this.altImageTxt = place.alt;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Destination);

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class DestinationRepository {
    constructor(destinationData) {
        this.allDestinations = destinationData;
        
    }
    findLocationById(destinationID) {
      if(destinationID) {
          const selectedDest = this.allDestinations.find((place) => place.id === destinationID)
          return selectedDest
        } else{
        return 'Please, pick a destination!'
      }
    }
    estCostPerLodge(num,id) {
        const matchedLocation = this.findLocationById(id)
       const totalLodgeCost = matchedLocation.estimatedLodgingCostPerDay * num
       return totalLodgeCost  
    }
    estCostPerTraveler(num,id) {
        const matchedLocation = this.findLocationById(id)
        const flightCost = matchedLocation.estimatedFlightCostPerPerson * num
        return flightCost
    }
    getTotalCost(duration,travelers,id) {
       const lodgingCost = this.estCostPerLodge(duration,id)
        const flightCost = this.estCostPerTraveler(travelers,id)
        const total = lodgingCost + flightCost
        const fee = total * .1 
        const est = total + fee 
        const billFormat = est.toFixed(2)
        return billFormat
    }
    getAllDest() {
       const allNames = this.allDestinations.map(place => { 
        const locationFacts = {}
        locationFacts.id = place.id
        locationFacts.destination = place.destination
        return locationFacts
       })
       return allNames
    }
    getDestImgInfo(num,trait) {
        const match = this.allDestinations.find(place => place.id === num)
        return match[trait]
    }
    
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DestinationRepository); 

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Traveler {
    constructor(person) {
        this.id = person.id;
        this.name = person.name;
        this.travelerType = person.travelerType;
    }
    showFirstName() {
        return this.name.split(' ')[0]
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TravelerRepository {
    constructor(travelDataSet) {
     this.allTravelData = travelDataSet    
    }
    findById(id) {
    const match = this.allTravelData.find(person => person.id === id)
    return match
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TravelerRepository);

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TripsRepository {
    constructor(tripsDataset) {
        this.allTrips = tripsDataset;
        

    }
    filterById(id) {
        const userTrips = this.allTrips.filter((trip) =>  trip.userID === id)
        return userTrips
   
    }
   
    showAnnualTrips(yrAgo,currentDate,id) {
     const yearAgo = new Date(yrAgo)
     const today = new Date (currentDate)
     const usersTrips = this.filterById(id)
     const approvedDates = usersTrips.filter((trip) => trip.status === 'approved')
     const annualVacations = approvedDates.filter((trip) => new Date(trip.date) >= yearAgo && new Date(trip.date) <= today)
     return annualVacations 
    }
    showPastTrips(today,id) {
     const todayDate =  new Date(today)
     const usersTrips = this.filterById(id)
     const pastTrips = usersTrips.filter((trip) => new Date(trip.date) < todayDate )
     return pastTrips
    }
    showFutureTrips(today,id) {
        const todayDate = new Date(today) 
         const usersTrips = this.filterById(id)
        const futureTrips = usersTrips.filter((trip) => new Date(trip.date) > todayDate)
        return futureTrips
    }
    showAnnualSpent(destination,yrAgo,currentDate,id) {
         const userYearTrips = this.showAnnualTrips(yrAgo,currentDate,id)
         const spentMoney = userYearTrips.reduce((num,trip) => {
            destination.forEach((destination) => {
            
                if(destination.id === trip.destinationID) {
                    const flights = trip.travelers * destination.estimatedFlightCostPerPerson
                    const stay = trip.duration * destination.estimatedLodgingCostPerDay
                    const estimate = flights + stay
                    num += estimate
                }
            })
          return num
        },0)
        const fee = spentMoney * .1
        const bill = spentMoney + fee
        const dollars = bill.toFixed(2)
        return dollars
    
    }
    showPending(id) {
        const usersTrips = this.filterById(id)
        const pendingTrips = usersTrips.filter(trip => trip.status === 'pending')
        return pendingTrips
    }
    getCompanyId() {
        const getHighest = this.allTrips.sort((a,b) => b.id - a.id)
        const topId = getHighest[0].id
        const givenNumber = topId + 1;
        return givenNumber
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TripsRepository); 

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Trip {
    constructor(trip) {
        this.id = trip.id;
        this.userID = trip.userID;
        this.destinationID = trip.destinationID;
        this.travelers = trip.travelers;
        this.date = trip.date;
        this.duration = trip.duration;
        this.status =  trip.status;
        this.suggestedActivities = trip.suggestedActivities;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trip);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _images_nextTravel_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _images_dateNight_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _Destination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _DestinationRepository__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _Traveler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _TravelerRepository__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _TripsRepository__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var _Trips__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);

// Do not delete or rename this file ********
// Imports Below 
// An example of how you tell webpack to use a CSS (SCSS) file
//  Imported Images




// imported Files








// global Variables
let allDestinations;
let destinationRepo;
let allTravelers;
let travelerRepo;
let allTrips;
let tripsRepo;
let yearAgo; 
let currentUser;
let currentUserId;
let userChosenDate;
let destinationId
let daysTraveled;
let peopleTraveling;  

 

// global Const Variables
const todayDate = "2022/10/06";
const travelerUrl = 'http://localhost:3001/api/v1/travelers';
const tripsUrl = 'http://localhost:3001/api/v1/trips';
const destinationsUrl = 'http://localhost:3001/api/v1/destinations';

//  Api Fetch Area 
function snagApiData(url) {
    return fetch(url)
				.then((response) => {
			if(!response.ok) {
				throw new Error('Whoops')
			}else {
			return response.json()
			}
		})
		.catch((err) => showAreaMessage(fetchErrDisplay))
};

function gatherDatasets() {
	Promise.all([
		snagApiData(travelerUrl),
		snagApiData(tripsUrl),
		snagApiData(destinationsUrl)
	])
	.then((data) => {
		allTravelers = data[0].travelers
		allTrips =  data[1].trips
		allDestinations = data[2].destinations
		createInstances(allTravelers, allTrips,allDestinations)
		loadPage()
	})
}

// QuerySelectors
const messageForm =  document.querySelector('.error-message');
const messageWrapper =  document.querySelector('.error-wrapper');
const logOutBtn = document.querySelector('.logout');
const inputBookDate = document.getElementById('userChosenDate');
const destinationSelect = document.getElementById('chosenDestination');
const durationInput = document.querySelector('.duration');
const travelerInput =  document.querySelector('.traveler-count');
const formSubBtn = document.querySelector('.book-input-sub');
const estCostDisplay = document.querySelector('.show-cost-display');
const firstName = document.querySelector(".welcome-person");
const displayToday = document.querySelector(".today-Input");
const annualSpent =  document.querySelector('.annual-Spent');
const upcomingTripArea = document.querySelector('.trip-info-card-upcoming');
const pendingTripArea = document.querySelector('.trip-info-card-pend');
const pastTripArea = document.querySelector('.trip-info-card-past'); 
const postErrDisplay =  document.querySelector('.post-Fail');
const fetchErrDisplay = document.querySelector('.fetch-Fail');
const estimatedCostBtn = document.querySelector('.show-est-cost');
const wantToBook = document.querySelector('.form-intro');
const entireBookForm = document.querySelector('.booking-form-container');
const estimatedCostArea = document.querySelector('.estimated-cost-display');
const bookingHeadTitle = document.querySelector('.book-title');
const userNameInput = document.getElementById('userName');
const passwordInput = document.getElementById('password');
const loginSub = document.querySelector('.login-Btn');
const loginForm = document.querySelector('.login-form');
// pages querySelectors
const entireLoginArea = document.querySelector('.login-area');
const asideArea = document.querySelector('.left-side-bar');
const customerWelcome = document.querySelector('.customer-welcome');
const tripsDisplayArea = document.querySelector('.trips-display');
const navBarArea = document.querySelector('.navBar');




// Event Listeners
 formSubBtn.addEventListener('click',function(e) {
 createPostTrip(e);
 resetInputs(destinationSelect,durationInput,inputBookDate,travelerInput)
 disableButton(formSubBtn)
 })
 estimatedCostBtn.addEventListener('click', function(e) {
	 displayEstimatedCost(e)
 } )
 wantToBook.addEventListener('click', function(e) {
	createBookForm(e);
 })
 loginSub.addEventListener("click", function(e) {
	e.preventDefault();
   gatherDatasets();
 })

 logOutBtn.addEventListener("click", function(e){
	e.preventDefault()
	toggleLogout(entireLoginArea,asideArea,customerWelcome,tripsDisplayArea,navBarArea);
	hideFormAreas(estimatedCostArea, entireBookForm);
	entireBookForm.reset();
	loginForm.reset();
	hideMessage(messageWrapper);
 }) 

 







// function area
function createInstances(dataSet1, dataSet2, dataSet3) {
	allTravelers = dataSet1.map(person => new _Traveler__WEBPACK_IMPORTED_MODULE_6__.default(person));
	travelerRepo = new _TravelerRepository__WEBPACK_IMPORTED_MODULE_7__.default(allTravelers);
	allTrips = dataSet2.map(trip => new _Trips__WEBPACK_IMPORTED_MODULE_9__.default(trip));
	tripsRepo = new _TripsRepository__WEBPACK_IMPORTED_MODULE_8__.default(allTrips);
	allDestinations = dataSet3.map(place => new _Destination__WEBPACK_IMPORTED_MODULE_4__.default(place));
	destinationRepo = new _DestinationRepository__WEBPACK_IMPORTED_MODULE_5__.default(allDestinations);
}

function loadPage() {
	loginActivate(); 
	welcomeUser();
	showTodayDate()
	showYearSpending();
    displayUpComingTrips();
	displayPendingTrips();
	displayPastTrips();
	restrictDateRange();
	displayDestinations();
}
function loginActivate() {
 const userName = userNameInput.value
const firstPart = userName.substring(0,8);
	if(firstPart === 'traveler' && userName.length < 11 && userName.length > 8 && passwordInput.value === 'travel') {
		const letters = userName.split('');
		const myNumbers = letters.filter((letter) => Number(letter))
		
		if(userName[9] === "0") {
		myNumbers.push("0")
		}
		const getString = myNumbers.join('')
		const userIdNumber = Number(getString)
		 currentUser = travelerRepo.findById(userIdNumber);
		 currentUserId = currentUser.id
		 showHomePage(entireLoginArea,asideArea,customerWelcome,tripsDisplayArea,navBarArea);
	}else {
		bookingHeadTitle.innerHTML = 'UN:traveler1-50 PW: travel'
		setTimeout(() => {
		hideMessage(bookingHeadTitle)
	}, 5000);
	loginForm.reset() 
	}
}

function welcomeUser() {
	const personName = currentUser.showFirstName()
	firstName.innerHTML = personName
	return personName
}

function showTodayDate() {
const userToday = formatDate(todayDate);
 displayToday.innerHTML = userToday
 createYearAgo()
 console.log(yearAgo);
 return userToday

}
function createYearAgo(){
	const dateParts = todayDate.split("/")
	const yearValue = dateParts[0] - 1
	dateParts[0] = yearValue
	yearAgo = dateParts.join("/");
}

function formatDate(date) {
	const day = new Date(date);
	const sentence = day.toDateString();
	const structuredDate = sentence.split(" ").splice(0, 4).join(' ');
	return structuredDate
}
function showYearSpending() {
 const yrSpend = tripsRepo.showAnnualSpent(destinationRepo.allDestination,yearAgo,todayDate,currentUserId);
 annualSpent.innerHTML = yrSpend
 return yrSpend	
}

function displayUpComingTrips() {
	const futureTrips = tripsRepo.showFutureTrips(todayDate,currentUserId)

	upcomingTripArea.innerHTML = ''
	if(futureTrips.length) {
		futureTrips.forEach((trip) => {
			 upcomingTripArea.innerHTML += `
			 <section class="book-card"> 
				<img src="${destinationRepo.getDestImgInfo(trip.destinationID,'image')}." alt=${destinationRepo.getDestImgInfo(trip.destinationID,'alt')}>
				   <h2>Destination: <span> ${destinationRepo.findLocationById(trip.destinationID).destination} </span> </h2>
				  <h2>How many Travelers: <span> ${trip.travelers}</span> </h2>
				  <h2>Date of Trip: <span> ${trip.date} </span></h2>
				  <h2> Duration of Trip: <span> ${trip.duration}</span></h2>
				<h2> Status: <span> ${trip.status} </span></h2>
			   </section>`
		})
	}else{
		upcomingTripArea.innerHTML += `<h2 class="no-record">There are no upcoming trips booked!</h2>`
	}
 

}	

function displayPendingTrips() {
 const pendingTrips =  tripsRepo.showPending(currentUserId);
	pendingTripArea.innerHTML += ''
 	
	if(pendingTrips.length) {
		pendingTrips.forEach((trip) => {
		pendingTripArea.innerHTML += `
		<section class="book-card"> 
			<img src="${destinationRepo.getDestImgInfo(trip.destinationID,'image')}." alt=${destinationRepo.getDestImgInfo(trip.destinationID,'alt')}>
				<h2>Destination: <span> ${destinationRepo.findLocationById(trip.destinationID).destination} </span> </h2>
				<h2>How many Travelers: <span> ${trip.travelers}</span> </h2>
				<h2>Date of Trip: <span> ${trip.date} </span></h2>
				<h2> Duration of Trip: <span> ${trip.duration}</span></h2>
				<h2> Status: <span> ${trip.status} </span></h2>
		</section>`
	})
 	} else {
	 pendingTripArea.innerHTML += `<h2 class="no-record" No Pending Trips! </h2>`
 }
  	

}

function displayPastTrips() {
 const pastTrips = tripsRepo.showPastTrips(todayDate,currentUserId)
 
 if(pastTrips.length) {
	pastTrips.forEach((trip) => {
		
		pastTripArea.innerHTML += `
		<section class="book-card"> 
			<img src="${destinationRepo.getDestImgInfo(trip.destinationID,'image')}." alt=${destinationRepo.getDestImgInfo(trip.destinationID,'alt')}>
				<h2>Destination: <span> ${destinationRepo.findLocationById(trip.destinationID).destination} </span> </h2>
				<h2>How many Travelers: <span> ${trip.travelers}</span> </h2>
				<h2>Date of Trip: <span> ${trip.date} </span></h2>
				<h2> Duration of Trip: <span> ${trip.duration}</span></h2>
				<h2> Status: <span> ${trip.status} </span></h2>
		</section>`
	})
 
}else{
pastTripArea.innerHTML += `<h2 class="no-record"> No Past Trips! </h2>`

 }
}
function restrictDateRange() {
	const calendarMin = todayDate.replaceAll("/","-")
	const calendarMax = '2023-10-06'

 inputBookDate.setAttribute("min",`${calendarMin}`)
 inputBookDate.setAttribute("max",`${calendarMax}`)
	
}
function displayDestinations() {
	destinationSelect.innerHTML += ``
	const allDestinations = destinationRepo.getAllDest()
	 
	allDestinations.forEach((destination)=> {
	destinationSelect.innerHTML += `
	<option id="${destination.id}" value=${destination.id}> ${destination.destination}</option>`
})

	
}

function createPostTrip(e) {
	userChosenDate = inputBookDate.value.replaceAll("-","/");
	const validate = checkBookingDate(userChosenDate)	
	if(validate) {
		e.preventDefault()
			const postId = tripsRepo.getCompanyId();
			destinationId =  Number(destinationSelect.value);
			daysTraveled = Number(durationInput.value); 
			peopleTraveling = Number(travelerInput.value); 
			const postTrip = {
			id: postId, 
			userID: currentUserId, 
			destinationID: destinationId, 
			travelers: peopleTraveling, 
			date: userChosenDate, 
			duration: daysTraveled, 
			status:"pending", 
			suggestedActivities:[]
			}
			const endPoint = 'trips';
		triggerPost(endPoint,postTrip);

	}else {
		showAreaMessage(messageWrapper)
		messageForm.innerHTML = 'Date already Book 💻! Click Want to Book a trip to restart!'
	}
	entireBookForm.reset()

}

function displayEstimatedCost(e) {
	e.preventDefault()
	makeRequired(inputBookDate,destinationSelect,durationInput,travelerInput);
	destinationId = Number(destinationSelect.value);
	daysTraveled = Number(durationInput.value); 
	peopleTraveling = Number(travelerInput.value); 
	userChosenDate = inputBookDate.value.replaceAll("-","/")
	const provedChosen = Number(userChosenDate.split("/").join(""))

	if(destinationId > 0 && daysTraveled > 0  && peopleTraveling > 0 && provedChosen > 0 ) {
		disableButton(estimatedCostBtn)	
		estCostDisplay.innerHTML =`$ ${destinationRepo.getTotalCost(daysTraveled,peopleTraveling,destinationId)}`	
			disableButton(estimatedCostBtn);
			enableButton(formSubBtn);
			formSubBtn.setAttribute('tabindex','0')
		
	}else {
		showFillFormMessage()
		disableButton(estimatedCostBtn)
	}


}

function triggerPost(endPoint,newPostedTrip) {
	fetch(`http://localhost:3001/api/v1/${endPoint}`,{
		method:'POST',
		body: JSON.stringify(newPostedTrip),
		headers:{
			'Content-Type':'application/json'
		}
	})
		.then((response) => {
			if(!response.ok) {
				throw new Error('Whoops')
			}else{
				return response.json()
			}
		})
		.then(data => {
			gatherDatasets()
			showAreaMessage(messageWrapper)
			messageForm.innerHTML = 'Congrats, your trip has been booked!!'  
			entireBookForm.reset()
		})
		.catch((err) => {
			showAreaMessage(postErrDisplay)
			setTimeout(() => {
				hideMessage(postErrDisplay)
			}, 4000);
		})
		
		
}

function checkBookingDate(datePicked) {
	const usersTrips = tripsRepo.filterById(currentUserId);
	const match = usersTrips.find((trip) => trip.date === datePicked)	
	
	if(match) {
	return false
	} else {
	return true
	}
}
	
function createBookForm(e) {
	e.preventDefault()
	showFormAreas(estimatedCostArea, entireBookForm)
	makeRequired(inputBookDate,destinationSelect,durationInput,travelerInput)
	disableButton(formSubBtn);
	entireBookForm.reset()
	hideMessage(messageWrapper);
	enableButton(estimatedCostBtn);
}



//  helper Functions
function disableButton(button){
	button.disabled = true; 
}
function enableButton(button) {
	button.disabled = false; 
}
function showAreaMessage(area) {
	area.classList.remove("hidden");
}
function showFormAreas(area1,area2) {
	area1.classList.remove('hidden');
	area2.classList.remove('hidden');
	
}
function hideFormAreas(area1,area2){
	area1.classList.add('hidden');
	area2.classList.add('hidden');
}
function makeRequired(input1,input2,input3, input4) {
	input1.required = true;
	input2.required = true;
	input3.required = true;
	input4.required = true; 
}
function resetInputs(input1,input2,input3,input4){
	input1.value = '';
	input2.value = '';
	input3.value = '';
	input4.value = '';
}
function hideMessage(area1){
	area1.classList.add('hidden')
}
function showFillFormMessage() {
	showAreaMessage(messageWrapper)
	messageForm.innerHTML = 'Please fill out all the form inputs then click Want to Book a trip to restart! 📝'
}

function toggleLogout(area1,area2,area3,area4,area5) {
area1.classList.remove('hidden');
area2.classList.add('hidden');
area3.classList.add('hidden');
area4.classList.add('hidden');
area5.classList.add('hidden');
}
function showHomePage(area1,area2,area3,area4,area5) {
area1.classList.add('hidden');
area2.classList.remove('hidden');
area3.classList.remove('hidden');
area4.classList.remove('hidden');
area5.classList.remove('hidden');
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map