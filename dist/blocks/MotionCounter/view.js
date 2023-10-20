/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@motionone/dom/dist/gestures/in-view.es.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/in-view.es.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inView": function() { return /* binding */ inView; }
/* harmony export */ });
/* harmony import */ var _utils_resolve_elements_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/resolve-elements.es.js */ "./node_modules/@motionone/dom/dist/utils/resolve-elements.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-function.es.js");



const thresholds = {
    any: 0,
    all: 1,
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "any" } = {}) {
    /**
     * If this browser doesn't support IntersectionObserver, return a dummy stop function.
     * Default triggering of onStart is tricky - it could be used for starting/stopping
     * videos, lazy loading content etc. We could provide an option to enable a fallback, or
     * provide a fallback callback option.
     */
    if (typeof IntersectionObserver === "undefined") {
        return () => { };
    }
    const elements = (0,_utils_resolve_elements_es_js__WEBPACK_IMPORTED_MODULE_0__.resolveElements)(elementOrSelector);
    const activeIntersections = new WeakMap();
    const onIntersectionChange = (entries) => {
        entries.forEach((entry) => {
            const onEnd = activeIntersections.get(entry.target);
            /**
             * If there's no change to the intersection, we don't need to
             * do anything here.
             */
            if (entry.isIntersecting === Boolean(onEnd))
                return;
            if (entry.isIntersecting) {
                const newOnEnd = onStart(entry);
                if ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_1__.isFunction)(newOnEnd)) {
                    activeIntersections.set(entry.target, newOnEnd);
                }
                else {
                    observer.unobserve(entry.target);
                }
            }
            else if (onEnd) {
                onEnd(entry);
                activeIntersections.delete(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(onIntersectionChange, {
        root,
        rootMargin,
        threshold: typeof amount === "number" ? amount : thresholds[amount],
    });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/utils/resolve-elements.es.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/utils/resolve-elements.es.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveElements": function() { return /* binding */ resolveElements; }
/* harmony export */ });
function resolveElements(elements, selectorCache) {
    var _a;
    if (typeof elements === "string") {
        if (selectorCache) {
            (_a = selectorCache[elements]) !== null && _a !== void 0 ? _a : (selectorCache[elements] = document.querySelectorAll(elements));
            elements = selectorCache[elements];
        }
        else {
            elements = document.querySelectorAll(elements);
        }
    }
    else if (elements instanceof Element) {
        elements = [elements];
    }
    /**
     * Return an empty array
     */
    return Array.from(elements || []);
}




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/is-function.es.js":
/*!**************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/is-function.es.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFunction": function() { return /* binding */ isFunction; }
/* harmony export */ });
const isFunction = (value) => typeof value === "function";




/***/ })

/******/ 	});
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
/******/ 			// no module.id needed
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************************************!*\
  !*** ./resources/blocks/MotionCounter/view.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var motion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion */ "./node_modules/@motionone/dom/dist/gestures/in-view.es.js");

const counters = {
  countersItems: [],
  init: function () {
    this.countersItems = document.querySelectorAll('.motion-counter');
    this.countersItems.forEach(item => {
      (0,motion__WEBPACK_IMPORTED_MODULE_0__.inView)(item, this.handleInView);
    });
  },
  handleInView: function (el) {
    counters.startCounter(el.target);
  },
  startCounter: function (el) {
    let speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 40;
    const counterNumberText = el.textContent;
    const counterNumberEnd = parseInt(counterNumberText.replace(/\s/g, ''));
    const counterNumberStart = 0;
    const counterNumberStep = Math.ceil((counterNumberEnd - counterNumberStart) / speed);
    let counterNumberCurrent = counterNumberStart;
    let counterNumberInterval = setInterval(function () {
      counterNumberCurrent += counterNumberStep;
      if (counterNumberCurrent >= counterNumberEnd) {
        el.textContent = counterNumberEnd;
        clearInterval(counterNumberInterval);
      } else {
        el.textContent = counterNumberCurrent;
      }
    }, speed);
  }
};

//on dom ready

document.addEventListener('DOMContentLoaded', function () {
  counters.init();
});
}();
/******/ })()
;
//# sourceMappingURL=view.js.map