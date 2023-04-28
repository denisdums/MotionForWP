/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/flip-horizontal.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/flip-horizontal.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const flipHorizontal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M4 6v12c0 1.1.9 2 2 2h3v-1.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h3V4H6c-1.1 0-2 .9-2 2zm7.2 16h1.5V2h-1.5v20zM15 5.5h1.5V4H15v1.5zm3.5.5H20c0-1.1-.9-2-2-2v1.5c.3 0 .5.2.5.5zm0 10.5H20v-2h-1.5v2zm0-3.5H20v-2h-1.5v2zm-.5 5.5V20c1.1 0 2-.9 2-2h-1.5c0 .3-.2.5-.5.5zM15 20h1.5v-1.5H15V20zm3.5-10.5H20v-2h-1.5v2z"
}));
/* harmony default export */ __webpack_exports__["default"] = (flipHorizontal);
//# sourceMappingURL=flip-horizontal.js.map

/***/ }),

/***/ "./resources/blocks/MotionGroup/edit.js":
/*!**********************************************!*\
  !*** ./resources/blocks/MotionGroup/edit.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./resources/blocks/MotionGroup/editor.scss");
/* harmony import */ var _js_hooks_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../js/hooks/hooks */ "./resources/js/hooks/hooks.js");





function Edit() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Motion For Gutenberg – hello from the editor!', 'motion-for-gutenberg'));
}
(0,_js_hooks_hooks__WEBPACK_IMPORTED_MODULE_4__.motionHooks)().register();

/***/ }),

/***/ "./resources/blocks/MotionGroup/index.js":
/*!***********************************************!*\
  !*** ./resources/blocks/MotionGroup/index.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./resources/blocks/MotionGroup/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./resources/blocks/MotionGroup/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./resources/blocks/MotionGroup/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./resources/blocks/MotionGroup/block.json");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./resources/blocks/MotionGroup/save.js":
/*!**********************************************!*\
  !*** ./resources/blocks/MotionGroup/save.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


function save() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save(), 'Motion For Gutenberg – hello from the saved content!');
}

/***/ }),

/***/ "./resources/js/hooks/hooks.js":
/*!*************************************!*\
  !*** ./resources/js/hooks/hooks.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "motionHooks": function() { return /* binding */ motionHooks; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/flip-horizontal.js");







function motionHooks() {
  return {
    namespace: 'motion-for-gutenberg',
    register() {
      this.bind();
      this.addFilters();
    },
    bind() {
      this.addFilters = this.addFilters.bind(this);
      this.addAttributes = this.addAttributes.bind(this);
      this.addAdvancedControls = this.addAdvancedControls.bind(this);
      this.addExtraProps = this.addExtraProps.bind(this);
    },
    addFilters() {
      wp.hooks.addFilter('blocks.registerBlockType', `${this.namespace}/custom-attributes`, this.addAttributes);
      wp.hooks.addFilter('editor.BlockEdit', `${this.namespace}/advanced-control`, this.addAdvancedControls);
      wp.hooks.addFilter('blocks.getSaveContent.extraProps', `${this.namespace}/extra-props`, this.addExtraProps);
    },
    addAttributes(settings, name) {
      settings.attributes = {
        ...settings.attributes,
        motion: {
          type: 'string',
          default: 'none'
        },
        duration: {
          type: 'string',
          default: '0'
        },
        delay: {
          type: 'string',
          default: '0'
        },
        easing: {
          type: 'string',
          default: 'none'
        },
        margin: {
          type: 'string',
          default: '0'
        }
      };
      return settings;
    },
    addAdvancedControls: (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => {
      return props => {
        const [availableAnimations, setAvailableAnimations] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
        const [availableEasings, setAvailableEasings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
        const {
          attributes,
          setAttributes
        } = props;
        const {
          motion,
          duration,
          delay,
          easing,
          margin
        } = attributes;
        const handleReset = () => {
          setAttributes({
            motion: 'none',
            duration: 0,
            delay: 0,
            easing: 'ease-out',
            margin: 0
          });
        };
        (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
          fetch('/wp-json/motion-for-gutenberg/v1/animations').then(response => response.json()).then(data => {
            setAvailableAnimations(Object.keys(data).map(key => {
              const animation = data[key];
              return {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(animation.name, 'motion-for-gutenberg'),
                value: key
              };
            }));
          });
          fetch('/wp-json/motion-for-gutenberg/v1/easings').then(response => response.json()).then(data => {
            setAvailableEasings(Object.keys(data).map(key => {
              const easing = data[key];
              return {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)(easing.name, 'motion-for-gutenberg'),
                value: key
              };
            }));
          });
        }, []);
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Motion', 'motion-for-gutenberg'),
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"]
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ComboboxControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Animation', 'motion-for-gutenberg'),
          value: motion,
          options: availableAnimations,
          onChange: value => setAttributes({
            motion: value
          })
        })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          type: 'number',
          min: 0,
          step: 0.1,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Duration (in seconds)', 'motion-for-gutenberg'),
          value: duration,
          onChange: value => setAttributes({
            duration: value
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          type: 'number',
          min: 0,
          step: 0.1,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Delay (in seconds)', 'motion-for-gutenberg'),
          value: delay,
          onChange: value => setAttributes({
            delay: value
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.BaseControl, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ComboboxControl, {
          options: availableEasings,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Easing', 'motion-for-gutenberg'),
          value: easing,
          onChange: value => setAttributes({
            easing: value
          })
        })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
          type: 'number',
          min: 0,
          step: 1,
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Margin (in pixels)', 'motion-for-gutenberg'),
          value: margin,
          onChange: value => setAttributes({
            margin: value
          })
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ButtonGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
          onClick: () => handleReset()
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset Motion', 'motion-for-gutenberg'))))));
      };
    }, 'addAdvancedControls'),
    addExtraProps(props, blockType, attributes) {
      if (attributes.motion === 'none') {
        delete props['data-motion'];
        delete props['data-motion-animation'];
        delete props['data-motion-duration'];
        delete props['data-motion-delay'];
        delete props['data-motion-easing'];
        delete props['data-motion-margin'];
      } else {
        props['data-motion'] = true;
        props['data-motion-animation'] = attributes.motion;
        if (attributes.easing !== 'none') {
          props['data-motion-easing'] = attributes.easing;
        } else {
          delete props['data-motion-easing'];
        }
        if (attributes.duration !== '0') {
          props['data-motion-duration'] = attributes.duration;
        } else {
          delete props['data-motion-duration'];
        }
        if (attributes.delay !== '0') {
          props['data-motion-delay'] = attributes.delay;
        } else {
          delete props['data-motion-delay'];
        }
        if (attributes.margin !== '0') {
          props['data-motion-margin'] = attributes.margin;
        } else {
          delete props['data-motion-margin'];
        }
      }
      return props;
    }
  };
}

/***/ }),

/***/ "./resources/blocks/MotionGroup/editor.scss":
/*!**************************************************!*\
  !*** ./resources/blocks/MotionGroup/editor.scss ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/blocks/MotionGroup/style.scss":
/*!*************************************************!*\
  !*** ./resources/blocks/MotionGroup/style.scss ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "./resources/blocks/MotionGroup/block.json":
/*!*************************************************!*\
  !*** ./resources/blocks/MotionGroup/block.json ***!
  \*************************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"motion-for-gutenberg/motion-group","version":"0.1.0","title":"Motion For Gutenberg","category":"motion-for-gutenberg","icon":"smiley","description":"Group block for same motion animation","supports":{"html":false},"textdomain":"motion-for-gutenberg","editorScript":"file:index.js","editorStyle":"file:index.css","style":"file:style-index.css"}');

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"MotionGroup/index": 0,
/******/ 			"MotionGroup/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmotion_for_gutenberg"] = self["webpackChunkmotion_for_gutenberg"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["MotionGroup/style-index"], function() { return __webpack_require__("./resources/blocks/MotionGroup/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map