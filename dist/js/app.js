/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@motionone/animation/dist/Animation.es.js":
/*!****************************************************************!*\
  !*** ./node_modules/@motionone/animation/dist/Animation.es.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Animation": () => (/* binding */ Animation)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/defaults.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/noop.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-easing-generator.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-easing-list.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/interpolate.es.js");
/* harmony import */ var _utils_easing_es_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/easing.es.js */ "./node_modules/@motionone/animation/dist/utils/easing.es.js");



class Animation {
    constructor(output, keyframes = [0, 1], { easing, duration: initialDuration = _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.defaults.duration, delay = _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.defaults.delay, endDelay = _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.defaults.endDelay, repeat = _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.defaults.repeat, offset, direction = "normal", } = {}) {
        this.startTime = null;
        this.rate = 1;
        this.t = 0;
        this.cancelTimestamp = null;
        this.easing = _motionone_utils__WEBPACK_IMPORTED_MODULE_1__.noopReturn;
        this.duration = 0;
        this.totalDuration = 0;
        this.repeat = 0;
        this.playState = "idle";
        this.finished = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        easing = easing || _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.defaults.easing;
        if ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_2__.isEasingGenerator)(easing)) {
            const custom = easing.createAnimation(keyframes);
            easing = custom.easing;
            keyframes = custom.keyframes || keyframes;
            initialDuration = custom.duration || initialDuration;
        }
        this.repeat = repeat;
        this.easing = (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_3__.isEasingList)(easing) ? _motionone_utils__WEBPACK_IMPORTED_MODULE_1__.noopReturn : (0,_utils_easing_es_js__WEBPACK_IMPORTED_MODULE_4__.getEasingFunction)(easing);
        this.updateDuration(initialDuration);
        const interpolate$1 = (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_5__.interpolate)(keyframes, offset, (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_3__.isEasingList)(easing) ? easing.map(_utils_easing_es_js__WEBPACK_IMPORTED_MODULE_4__.getEasingFunction) : _motionone_utils__WEBPACK_IMPORTED_MODULE_1__.noopReturn);
        this.tick = (timestamp) => {
            var _a;
            // TODO: Temporary fix for OptionsResolver typing
            delay = delay;
            let t = 0;
            if (this.pauseTime !== undefined) {
                t = this.pauseTime;
            }
            else {
                t = (timestamp - this.startTime) * this.rate;
            }
            this.t = t;
            // Convert to seconds
            t /= 1000;
            // Rebase on delay
            t = Math.max(t - delay, 0);
            /**
             * If this animation has finished, set the current time
             * to the total duration.
             */
            if (this.playState === "finished" && this.pauseTime === undefined) {
                t = this.totalDuration;
            }
            /**
             * Get the current progress (0-1) of the animation. If t is >
             * than duration we'll get values like 2.5 (midway through the
             * third iteration)
             */
            const progress = t / this.duration;
            // TODO progress += iterationStart
            /**
             * Get the current iteration (0 indexed). For instance the floor of
             * 2.5 is 2.
             */
            let currentIteration = Math.floor(progress);
            /**
             * Get the current progress of the iteration by taking the remainder
             * so 2.5 is 0.5 through iteration 2
             */
            let iterationProgress = progress % 1.0;
            if (!iterationProgress && progress >= 1) {
                iterationProgress = 1;
            }
            /**
             * If iteration progress is 1 we count that as the end
             * of the previous iteration.
             */
            iterationProgress === 1 && currentIteration--;
            /**
             * Reverse progress if we're not running in "normal" direction
             */
            const iterationIsOdd = currentIteration % 2;
            if (direction === "reverse" ||
                (direction === "alternate" && iterationIsOdd) ||
                (direction === "alternate-reverse" && !iterationIsOdd)) {
                iterationProgress = 1 - iterationProgress;
            }
            const p = t >= this.totalDuration ? 1 : Math.min(iterationProgress, 1);
            const latest = interpolate$1(this.easing(p));
            output(latest);
            const isAnimationFinished = this.pauseTime === undefined &&
                (this.playState === "finished" || t >= this.totalDuration + endDelay);
            if (isAnimationFinished) {
                this.playState = "finished";
                (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, latest);
            }
            else if (this.playState !== "idle") {
                this.frameRequestId = requestAnimationFrame(this.tick);
            }
        };
        this.play();
    }
    play() {
        const now = performance.now();
        this.playState = "running";
        if (this.pauseTime !== undefined) {
            this.startTime = now - this.pauseTime;
        }
        else if (!this.startTime) {
            this.startTime = now;
        }
        this.cancelTimestamp = this.startTime;
        this.pauseTime = undefined;
        this.frameRequestId = requestAnimationFrame(this.tick);
    }
    pause() {
        this.playState = "paused";
        this.pauseTime = this.t;
    }
    finish() {
        this.playState = "finished";
        this.tick(0);
    }
    stop() {
        var _a;
        this.playState = "idle";
        if (this.frameRequestId !== undefined) {
            cancelAnimationFrame(this.frameRequestId);
        }
        (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, false);
    }
    cancel() {
        this.stop();
        this.tick(this.cancelTimestamp);
    }
    reverse() {
        this.rate *= -1;
    }
    commitStyles() { }
    updateDuration(duration) {
        this.duration = duration;
        this.totalDuration = duration * (this.repeat + 1);
    }
    get currentTime() {
        return this.t;
    }
    set currentTime(t) {
        if (this.pauseTime !== undefined || this.rate === 0) {
            this.pauseTime = t;
        }
        else {
            this.startTime = performance.now() - t / this.rate;
        }
    }
    get playbackRate() {
        return this.rate;
    }
    set playbackRate(rate) {
        this.rate = rate;
    }
}




/***/ }),

/***/ "./node_modules/@motionone/animation/dist/utils/easing.es.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@motionone/animation/dist/utils/easing.es.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEasingFunction": () => (/* binding */ getEasingFunction)
/* harmony export */ });
/* harmony import */ var _motionone_easing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/easing */ "./node_modules/@motionone/easing/dist/cubic-bezier.es.js");
/* harmony import */ var _motionone_easing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @motionone/easing */ "./node_modules/@motionone/easing/dist/steps.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-function.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-cubic-bezier.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/noop.es.js");



const namedEasings = {
    ease: (0,_motionone_easing__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(0.25, 0.1, 0.25, 1.0),
    "ease-in": (0,_motionone_easing__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(0.42, 0.0, 1.0, 1.0),
    "ease-in-out": (0,_motionone_easing__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(0.42, 0.0, 0.58, 1.0),
    "ease-out": (0,_motionone_easing__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(0.0, 0.0, 0.58, 1.0),
};
const functionArgsRegex = /\((.*?)\)/;
function getEasingFunction(definition) {
    // If already an easing function, return
    if ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_1__.isFunction)(definition))
        return definition;
    // If an easing curve definition, return bezier function
    if ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_2__.isCubicBezier)(definition))
        return (0,_motionone_easing__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(...definition);
    // If we have a predefined easing function, return
    if (namedEasings[definition])
        return namedEasings[definition];
    // If this is a steps function, attempt to create easing curve
    if (definition.startsWith("steps")) {
        const args = functionArgsRegex.exec(definition);
        if (args) {
            const argsArray = args[1].split(",");
            return (0,_motionone_easing__WEBPACK_IMPORTED_MODULE_3__.steps)(parseFloat(argsArray[0]), argsArray[1].trim());
        }
    }
    return _motionone_utils__WEBPACK_IMPORTED_MODULE_4__.noopReturn;
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/animate-style.es.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/animate-style.es.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animateStyle": () => (/* binding */ animateStyle)
/* harmony export */ });
/* harmony import */ var _data_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data.es.js */ "./node_modules/@motionone/dom/dist/animate/data.es.js");
/* harmony import */ var _utils_css_var_es_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/css-var.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/css-var.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/defaults.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-easing-generator.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-function.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-easing-list.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-number.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/time.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/noop.es.js");
/* harmony import */ var _utils_transforms_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/transforms.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/transforms.es.js");
/* harmony import */ var _utils_easing_es_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils/easing.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/easing.es.js");
/* harmony import */ var _utils_feature_detection_es_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/feature-detection.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/feature-detection.es.js");
/* harmony import */ var _utils_keyframes_es_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/keyframes.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/keyframes.es.js");
/* harmony import */ var _style_es_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style.es.js */ "./node_modules/@motionone/dom/dist/animate/style.es.js");
/* harmony import */ var _utils_get_style_name_es_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/get-style-name.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js");
/* harmony import */ var _utils_stop_animation_es_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/stop-animation.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/stop-animation.es.js");
/* harmony import */ var _utils_get_unit_es_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/get-unit.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/get-unit.es.js");












function getDevToolsRecord() {
    return window.__MOTION_DEV_TOOLS_RECORD;
}
function animateStyle(element, key, keyframesDefinition, options = {}, AnimationPolyfill) {
    const record = getDevToolsRecord();
    const isRecording = options.record !== false && record;
    let animation;
    let { duration = _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.defaults.duration, delay = _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.defaults.delay, endDelay = _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.defaults.endDelay, repeat = _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.defaults.repeat, easing = _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.defaults.easing, persist = false, direction, offset, allowWebkitAcceleration = false, } = options;
    const data = (0,_data_es_js__WEBPACK_IMPORTED_MODULE_1__.getAnimationData)(element);
    const valueIsTransform = (0,_utils_transforms_es_js__WEBPACK_IMPORTED_MODULE_2__.isTransform)(key);
    let canAnimateNatively = _utils_feature_detection_es_js__WEBPACK_IMPORTED_MODULE_3__.supports.waapi();
    /**
     * If this is an individual transform, we need to map its
     * key to a CSS variable and update the element's transform style
     */
    valueIsTransform && (0,_utils_transforms_es_js__WEBPACK_IMPORTED_MODULE_2__.addTransformToElement)(element, key);
    const name = (0,_utils_get_style_name_es_js__WEBPACK_IMPORTED_MODULE_4__.getStyleName)(key);
    const motionValue = (0,_data_es_js__WEBPACK_IMPORTED_MODULE_1__.getMotionValue)(data.values, name);
    /**
     * Get definition of value, this will be used to convert numerical
     * keyframes into the default value type.
     */
    const definition = _utils_transforms_es_js__WEBPACK_IMPORTED_MODULE_2__.transformDefinitions.get(name);
    /**
     * Stop the current animation, if any. Because this will trigger
     * commitStyles (DOM writes) and we might later trigger DOM reads,
     * this is fired now and we return a factory function to create
     * the actual animation that can get called in batch,
     */
    (0,_utils_stop_animation_es_js__WEBPACK_IMPORTED_MODULE_5__.stopAnimation)(motionValue.animation, !((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_6__.isEasingGenerator)(easing) && motionValue.generator) &&
        options.record !== false);
    /**
     * Batchable factory function containing all DOM reads.
     */
    return () => {
        const readInitialValue = () => { var _a, _b; return (_b = (_a = _style_es_js__WEBPACK_IMPORTED_MODULE_7__.style.get(element, name)) !== null && _a !== void 0 ? _a : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0; };
        /**
         * Replace null values with the previous keyframe value, or read
         * it from the DOM if it's the first keyframe.
         */
        let keyframes = (0,_utils_keyframes_es_js__WEBPACK_IMPORTED_MODULE_8__.hydrateKeyframes)((0,_utils_keyframes_es_js__WEBPACK_IMPORTED_MODULE_8__.keyframesList)(keyframesDefinition), readInitialValue);
        /**
         * Detect unit type of keyframes.
         */
        const toUnit = (0,_utils_get_unit_es_js__WEBPACK_IMPORTED_MODULE_9__.getUnitConverter)(keyframes, definition);
        if ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_6__.isEasingGenerator)(easing)) {
            const custom = easing.createAnimation(keyframes, key !== "opacity", readInitialValue, name, motionValue);
            easing = custom.easing;
            keyframes = custom.keyframes || keyframes;
            duration = custom.duration || duration;
        }
        /**
         * If this is a CSS variable we need to register it with the browser
         * before it can be animated natively. We also set it with setProperty
         * rather than directly onto the element.style object.
         */
        if ((0,_utils_css_var_es_js__WEBPACK_IMPORTED_MODULE_10__.isCssVar)(name)) {
            if (_utils_feature_detection_es_js__WEBPACK_IMPORTED_MODULE_3__.supports.cssRegisterProperty()) {
                (0,_utils_css_var_es_js__WEBPACK_IMPORTED_MODULE_10__.registerCssVariable)(name);
            }
            else {
                canAnimateNatively = false;
            }
        }
        /**
         * If we've been passed a custom easing function, and this browser
         * does **not** support linear() easing, and the value is a transform
         * (and thus a pure number) we can still support the custom easing
         * by falling back to the animation polyfill.
         */
        if (valueIsTransform &&
            !_utils_feature_detection_es_js__WEBPACK_IMPORTED_MODULE_3__.supports.linearEasing() &&
            ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_11__.isFunction)(easing) || ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_12__.isEasingList)(easing) && easing.some(_motionone_utils__WEBPACK_IMPORTED_MODULE_11__.isFunction)))) {
            canAnimateNatively = false;
        }
        /**
         * If we can animate this value with WAAPI, do so.
         */
        if (canAnimateNatively) {
            /**
             * Convert numbers to default value types. Currently this only supports
             * transforms but it could also support other value types.
             */
            if (definition) {
                keyframes = keyframes.map((value) => (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_13__.isNumber)(value) ? definition.toDefaultUnit(value) : value);
            }
            /**
             * If this browser doesn't support partial/implicit keyframes we need to
             * explicitly provide one.
             */
            if (keyframes.length === 1 &&
                (!_utils_feature_detection_es_js__WEBPACK_IMPORTED_MODULE_3__.supports.partialKeyframes() || isRecording)) {
                keyframes.unshift(readInitialValue());
            }
            const animationOptions = {
                delay: _motionone_utils__WEBPACK_IMPORTED_MODULE_14__.time.ms(delay),
                duration: _motionone_utils__WEBPACK_IMPORTED_MODULE_14__.time.ms(duration),
                endDelay: _motionone_utils__WEBPACK_IMPORTED_MODULE_14__.time.ms(endDelay),
                easing: !(0,_motionone_utils__WEBPACK_IMPORTED_MODULE_12__.isEasingList)(easing)
                    ? (0,_utils_easing_es_js__WEBPACK_IMPORTED_MODULE_15__.convertEasing)(easing, duration)
                    : undefined,
                direction,
                iterations: repeat + 1,
                fill: "both",
            };
            animation = element.animate({
                [name]: keyframes,
                offset,
                easing: (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_12__.isEasingList)(easing)
                    ? easing.map((thisEasing) => (0,_utils_easing_es_js__WEBPACK_IMPORTED_MODULE_15__.convertEasing)(thisEasing, duration))
                    : undefined,
            }, animationOptions);
            /**
             * Polyfill finished Promise in browsers that don't support it
             */
            if (!animation.finished) {
                animation.finished = new Promise((resolve, reject) => {
                    animation.onfinish = resolve;
                    animation.oncancel = reject;
                });
            }
            const target = keyframes[keyframes.length - 1];
            animation.finished
                .then(() => {
                if (persist)
                    return;
                // Apply styles to target
                _style_es_js__WEBPACK_IMPORTED_MODULE_7__.style.set(element, name, target);
                // Ensure fill modes don't persist
                animation.cancel();
            })
                .catch(_motionone_utils__WEBPACK_IMPORTED_MODULE_16__.noop);
            /**
             * This forces Webkit to run animations on the main thread by exploiting
             * this condition:
             * https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/platform/graphics/ca/GraphicsLayerCA.cpp?rev=281238#L1099
             *
             * This fixes Webkit's timing bugs, like accelerated animations falling
             * out of sync with main thread animations and massive delays in starting
             * accelerated animations in WKWebView.
             */
            if (!allowWebkitAcceleration)
                animation.playbackRate = 1.000001;
            /**
             * If we can't animate the value natively then we can fallback to the numbers-only
             * polyfill for transforms.
             */
        }
        else if (AnimationPolyfill && valueIsTransform) {
            /**
             * If any keyframe is a string (because we measured it from the DOM), we need to convert
             * it into a number before passing to the Animation polyfill.
             */
            keyframes = keyframes.map((value) => typeof value === "string" ? parseFloat(value) : value);
            /**
             * If we only have a single keyframe, we need to create an initial keyframe by reading
             * the current value from the DOM.
             */
            if (keyframes.length === 1) {
                keyframes.unshift(parseFloat(readInitialValue()));
            }
            animation = new AnimationPolyfill((latest) => {
                _style_es_js__WEBPACK_IMPORTED_MODULE_7__.style.set(element, name, toUnit ? toUnit(latest) : latest);
            }, keyframes, Object.assign(Object.assign({}, options), { duration,
                easing }));
        }
        else {
            const target = keyframes[keyframes.length - 1];
            _style_es_js__WEBPACK_IMPORTED_MODULE_7__.style.set(element, name, definition && (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_13__.isNumber)(target)
                ? definition.toDefaultUnit(target)
                : target);
        }
        if (isRecording) {
            record(element, key, keyframes, {
                duration,
                delay: delay,
                easing,
                repeat,
                offset,
            }, "motion-one");
        }
        motionValue.setAnimation(animation);
        return animation;
    };
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/create-animate.es.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/create-animate.es.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAnimate": () => (/* binding */ createAnimate)
/* harmony export */ });
/* harmony import */ var hey_listen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hey-listen */ "./node_modules/hey-listen/dist/hey-listen.es.js");
/* harmony import */ var _animate_style_es_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./animate-style.es.js */ "./node_modules/@motionone/dom/dist/animate/animate-style.es.js");
/* harmony import */ var _utils_options_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/options.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/options.es.js");
/* harmony import */ var _utils_resolve_elements_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/resolve-elements.es.js */ "./node_modules/@motionone/dom/dist/utils/resolve-elements.es.js");
/* harmony import */ var _utils_controls_es_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/controls.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/controls.es.js");
/* harmony import */ var _utils_stagger_es_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/stagger.es.js */ "./node_modules/@motionone/dom/dist/utils/stagger.es.js");







function createAnimate(AnimatePolyfill) {
    return function animate(elements, keyframes, options = {}) {
        elements = (0,_utils_resolve_elements_es_js__WEBPACK_IMPORTED_MODULE_1__.resolveElements)(elements);
        const numElements = elements.length;
        (0,hey_listen__WEBPACK_IMPORTED_MODULE_0__.invariant)(Boolean(numElements), "No valid element provided.");
        (0,hey_listen__WEBPACK_IMPORTED_MODULE_0__.invariant)(Boolean(keyframes), "No keyframes defined.");
        /**
         * Create and start new animations
         */
        const animationFactories = [];
        for (let i = 0; i < numElements; i++) {
            const element = elements[i];
            for (const key in keyframes) {
                const valueOptions = (0,_utils_options_es_js__WEBPACK_IMPORTED_MODULE_2__.getOptions)(options, key);
                valueOptions.delay = (0,_utils_stagger_es_js__WEBPACK_IMPORTED_MODULE_3__.resolveOption)(valueOptions.delay, i, numElements);
                const animation = (0,_animate_style_es_js__WEBPACK_IMPORTED_MODULE_4__.animateStyle)(element, key, keyframes[key], valueOptions, AnimatePolyfill);
                animationFactories.push(animation);
            }
        }
        return (0,_utils_controls_es_js__WEBPACK_IMPORTED_MODULE_5__.withControls)(animationFactories, options, 
        /**
         * TODO:
         * If easing is set to spring or glide, duration will be dynamically
         * generated. Ideally we would dynamically generate this from
         * animation.effect.getComputedTiming().duration but this isn't
         * supported in iOS13 or our number polyfill. Perhaps it's possible
         * to Proxy animations returned from animateStyle that has duration
         * as a getter.
         */
        options.duration);
    };
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/data.es.js":
/*!*************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/data.es.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAnimationData": () => (/* binding */ getAnimationData),
/* harmony export */   "getMotionValue": () => (/* binding */ getMotionValue)
/* harmony export */ });
/* harmony import */ var _motionone_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/types */ "./node_modules/@motionone/types/dist/MotionValue.es.js");


const data = new WeakMap();
function getAnimationData(element) {
    if (!data.has(element)) {
        data.set(element, {
            transforms: [],
            values: new Map(),
        });
    }
    return data.get(element);
}
function getMotionValue(motionValues, name) {
    if (!motionValues.has(name)) {
        motionValues.set(name, new _motionone_types__WEBPACK_IMPORTED_MODULE_0__.MotionValue());
    }
    return motionValues.get(name);
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/index.es.js":
/*!**************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/index.es.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animate": () => (/* binding */ animate)
/* harmony export */ });
/* harmony import */ var _motionone_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/animation */ "./node_modules/@motionone/animation/dist/Animation.es.js");
/* harmony import */ var _create_animate_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-animate.es.js */ "./node_modules/@motionone/dom/dist/animate/create-animate.es.js");



const animate = (0,_create_animate_es_js__WEBPACK_IMPORTED_MODULE_0__.createAnimate)(_motionone_animation__WEBPACK_IMPORTED_MODULE_1__.Animation);




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/style.es.js":
/*!**************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/style.es.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "style": () => (/* binding */ style)
/* harmony export */ });
/* harmony import */ var _utils_css_var_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/css-var.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/css-var.es.js");
/* harmony import */ var _utils_get_style_name_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/get-style-name.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js");
/* harmony import */ var _utils_transforms_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/transforms.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/transforms.es.js");




const style = {
    get: (element, name) => {
        name = (0,_utils_get_style_name_es_js__WEBPACK_IMPORTED_MODULE_0__.getStyleName)(name);
        let value = (0,_utils_css_var_es_js__WEBPACK_IMPORTED_MODULE_1__.isCssVar)(name)
            ? element.style.getPropertyValue(name)
            : getComputedStyle(element)[name];
        if (!value && value !== 0) {
            const definition = _utils_transforms_es_js__WEBPACK_IMPORTED_MODULE_2__.transformDefinitions.get(name);
            if (definition)
                value = definition.initialValue;
        }
        return value;
    },
    set: (element, name, value) => {
        name = (0,_utils_get_style_name_es_js__WEBPACK_IMPORTED_MODULE_0__.getStyleName)(name);
        if ((0,_utils_css_var_es_js__WEBPACK_IMPORTED_MODULE_1__.isCssVar)(name)) {
            element.style.setProperty(name, value);
        }
        else {
            element.style[name] = value;
        }
    },
};




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/utils/controls.es.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/utils/controls.es.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "controls": () => (/* binding */ controls),
/* harmony export */   "withControls": () => (/* binding */ withControls)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/defaults.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/time.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/noop.es.js");
/* harmony import */ var _stop_animation_es_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stop-animation.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/stop-animation.es.js");



const createAnimation = (factory) => factory();
const withControls = (animationFactory, options, duration = _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.defaults.duration) => {
    return new Proxy({
        animations: animationFactory.map(createAnimation).filter(Boolean),
        duration,
        options,
    }, controls);
};
/**
 * TODO:
 * Currently this returns the first animation, ideally it would return
 * the first active animation.
 */
const getActiveAnimation = (state) => state.animations[0];
const controls = {
    get: (target, key) => {
        const activeAnimation = getActiveAnimation(target);
        switch (key) {
            case "duration":
                return target.duration;
            case "currentTime":
                return _motionone_utils__WEBPACK_IMPORTED_MODULE_1__.time.s((activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) || 0);
            case "playbackRate":
            case "playState":
                return activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key];
            case "finished":
                if (!target.finished) {
                    target.finished = Promise.all(target.animations.map(selectFinished)).catch(_motionone_utils__WEBPACK_IMPORTED_MODULE_2__.noop);
                }
                return target.finished;
            case "stop":
                return () => {
                    target.animations.forEach((animation) => (0,_stop_animation_es_js__WEBPACK_IMPORTED_MODULE_3__.stopAnimation)(animation));
                };
            case "forEachNative":
                /**
                 * This is for internal use only, fire a callback for each
                 * underlying animation.
                 */
                return (callback) => {
                    target.animations.forEach((animation) => callback(animation, target));
                };
            default:
                return typeof (activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) === "undefined"
                    ? undefined
                    : () => target.animations.forEach((animation) => animation[key]());
        }
    },
    set: (target, key, value) => {
        switch (key) {
            case "currentTime":
                value = _motionone_utils__WEBPACK_IMPORTED_MODULE_1__.time.ms(value);
            case "currentTime":
            case "playbackRate":
                for (let i = 0; i < target.animations.length; i++) {
                    target.animations[i][key] = value;
                }
                return true;
        }
        return false;
    },
};
const selectFinished = (animation) => animation.finished;




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/utils/css-var.es.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/utils/css-var.es.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isCssVar": () => (/* binding */ isCssVar),
/* harmony export */   "registerCssVariable": () => (/* binding */ registerCssVariable),
/* harmony export */   "registeredProperties": () => (/* binding */ registeredProperties)
/* harmony export */ });
/* harmony import */ var _transforms_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transforms.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/transforms.es.js");


const isCssVar = (name) => name.startsWith("--");
const registeredProperties = new Set();
function registerCssVariable(name) {
    if (registeredProperties.has(name))
        return;
    registeredProperties.add(name);
    try {
        const { syntax, initialValue } = _transforms_es_js__WEBPACK_IMPORTED_MODULE_0__.transformDefinitions.has(name)
            ? _transforms_es_js__WEBPACK_IMPORTED_MODULE_0__.transformDefinitions.get(name)
            : {};
        CSS.registerProperty({
            name,
            inherits: false,
            syntax,
            initialValue,
        });
    }
    catch (e) { }
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/utils/easing.es.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/utils/easing.es.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertEasing": () => (/* binding */ convertEasing),
/* harmony export */   "cubicBezierAsString": () => (/* binding */ cubicBezierAsString),
/* harmony export */   "generateLinearEasingPoints": () => (/* binding */ generateLinearEasingPoints)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/progress.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-function.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/defaults.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-cubic-bezier.es.js");
/* harmony import */ var _feature_detection_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feature-detection.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/feature-detection.es.js");



// Create a linear easing point for every x second
const resolution = 0.015;
const generateLinearEasingPoints = (easing, duration) => {
    let points = "";
    const numPoints = Math.round(duration / resolution);
    for (let i = 0; i < numPoints; i++) {
        points += easing((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_0__.progress)(0, numPoints - 1, i)) + ", ";
    }
    return points.substring(0, points.length - 2);
};
const convertEasing = (easing, duration) => {
    if ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_1__.isFunction)(easing)) {
        return _feature_detection_es_js__WEBPACK_IMPORTED_MODULE_2__.supports.linearEasing()
            ? `linear(${generateLinearEasingPoints(easing, duration)})`
            : _motionone_utils__WEBPACK_IMPORTED_MODULE_3__.defaults.easing;
    }
    else {
        return (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_4__.isCubicBezier)(easing) ? cubicBezierAsString(easing) : easing;
    }
};
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/utils/feature-detection.es.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/utils/feature-detection.es.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "supports": () => (/* binding */ supports)
/* harmony export */ });
const testAnimation = (keyframes, options) => document.createElement("div").animate(keyframes, options);
const featureTests = {
    cssRegisterProperty: () => typeof CSS !== "undefined" &&
        Object.hasOwnProperty.call(CSS, "registerProperty"),
    waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
    partialKeyframes: () => {
        try {
            testAnimation({ opacity: [1] });
        }
        catch (e) {
            return false;
        }
        return true;
    },
    finished: () => Boolean(testAnimation({ opacity: [0, 1] }, { duration: 0.001 }).finished),
    linearEasing: () => {
        try {
            testAnimation({ opacity: 0 }, { easing: "linear(0, 1)" });
        }
        catch (e) {
            return false;
        }
        return true;
    },
};
const results = {};
const supports = {};
for (const key in featureTests) {
    supports[key] = () => {
        if (results[key] === undefined)
            results[key] = featureTests[key]();
        return results[key];
    };
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/utils/get-style-name.es.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStyleName": () => (/* binding */ getStyleName)
/* harmony export */ });
/* harmony import */ var _transforms_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transforms.es.js */ "./node_modules/@motionone/dom/dist/animate/utils/transforms.es.js");


function getStyleName(key) {
    if (_transforms_es_js__WEBPACK_IMPORTED_MODULE_0__.transformAlias[key])
        key = _transforms_es_js__WEBPACK_IMPORTED_MODULE_0__.transformAlias[key];
    return (0,_transforms_es_js__WEBPACK_IMPORTED_MODULE_0__.isTransform)(key) ? (0,_transforms_es_js__WEBPACK_IMPORTED_MODULE_0__.asTransformCssVar)(key) : key;
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/utils/get-unit.es.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/utils/get-unit.es.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUnitConverter": () => (/* binding */ getUnitConverter)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/noop.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-string.es.js");


function getUnitConverter(keyframes, definition) {
    var _a;
    let toUnit = (definition === null || definition === void 0 ? void 0 : definition.toDefaultUnit) || _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.noopReturn;
    const finalKeyframe = keyframes[keyframes.length - 1];
    if ((0,_motionone_utils__WEBPACK_IMPORTED_MODULE_1__.isString)(finalKeyframe)) {
        const unit = ((_a = finalKeyframe.match(/(-?[\d.]+)([a-z%]*)/)) === null || _a === void 0 ? void 0 : _a[2]) || "";
        if (unit)
            toUnit = (value) => value + unit;
    }
    return toUnit;
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/utils/keyframes.es.js":
/*!************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/utils/keyframes.es.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hydrateKeyframes": () => (/* binding */ hydrateKeyframes),
/* harmony export */   "keyframesList": () => (/* binding */ keyframesList)
/* harmony export */ });
function hydrateKeyframes(keyframes, readInitialValue) {
    for (let i = 0; i < keyframes.length; i++) {
        if (keyframes[i] === null) {
            keyframes[i] = i ? keyframes[i - 1] : readInitialValue();
        }
    }
    return keyframes;
}
const keyframesList = (keyframes) => Array.isArray(keyframes) ? keyframes : [keyframes];




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/utils/options.es.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/utils/options.es.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getOptions": () => (/* binding */ getOptions)
/* harmony export */ });
const getOptions = (options, key) => 
/**
 * TODO: Make test for this
 * Always return a new object otherwise delay is overwritten by results of stagger
 * and this results in no stagger
 */
options[key] ? Object.assign(Object.assign({}, options), options[key]) : Object.assign({}, options);




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/utils/stop-animation.es.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/utils/stop-animation.es.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stopAnimation": () => (/* binding */ stopAnimation)
/* harmony export */ });
function stopAnimation(animation, needsCommit = true) {
    if (!animation || animation.playState === "finished")
        return;
    // Suppress error thrown by WAAPI
    try {
        if (animation.stop) {
            animation.stop();
        }
        else {
            needsCommit && animation.commitStyles();
            animation.cancel();
        }
    }
    catch (e) { }
}




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/animate/utils/transforms.es.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/animate/utils/transforms.es.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTransformToElement": () => (/* binding */ addTransformToElement),
/* harmony export */   "asTransformCssVar": () => (/* binding */ asTransformCssVar),
/* harmony export */   "axes": () => (/* binding */ axes),
/* harmony export */   "buildTransformTemplate": () => (/* binding */ buildTransformTemplate),
/* harmony export */   "compareTransformOrder": () => (/* binding */ compareTransformOrder),
/* harmony export */   "isTransform": () => (/* binding */ isTransform),
/* harmony export */   "transformAlias": () => (/* binding */ transformAlias),
/* harmony export */   "transformDefinitions": () => (/* binding */ transformDefinitions)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/noop.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/array.es.js");
/* harmony import */ var _data_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data.es.js */ "./node_modules/@motionone/dom/dist/animate/data.es.js");



/**
 * A list of all transformable axes. We'll use this list to generated a version
 * of each axes for each transform.
 */
const axes = ["", "X", "Y", "Z"];
/**
 * An ordered array of each transformable value. By default, transform values
 * will be sorted to this order.
 */
const order = ["translate", "scale", "rotate", "skew"];
const transformAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
};
const rotation = {
    syntax: "<angle>",
    initialValue: "0deg",
    toDefaultUnit: (v) => v + "deg",
};
const baseTransformProperties = {
    translate: {
        syntax: "<length-percentage>",
        initialValue: "0px",
        toDefaultUnit: (v) => v + "px",
    },
    rotate: rotation,
    scale: {
        syntax: "<number>",
        initialValue: 1,
        toDefaultUnit: _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.noopReturn,
    },
    skew: rotation,
};
const transformDefinitions = new Map();
const asTransformCssVar = (name) => `--motion-${name}`;
/**
 * Generate a list of every possible transform key
 */
const transforms = ["x", "y", "z"];
order.forEach((name) => {
    axes.forEach((axis) => {
        transforms.push(name + axis);
        transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
    });
});
/**
 * A function to use with Array.sort to sort transform keys by their default order.
 */
const compareTransformOrder = (a, b) => transforms.indexOf(a) - transforms.indexOf(b);
/**
 * Provide a quick way to check if a string is the name of a transform
 */
const transformLookup = new Set(transforms);
const isTransform = (name) => transformLookup.has(name);
const addTransformToElement = (element, name) => {
    // Map x to translateX etc
    if (transformAlias[name])
        name = transformAlias[name];
    const { transforms } = (0,_data_es_js__WEBPACK_IMPORTED_MODULE_1__.getAnimationData)(element);
    (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_2__.addUniqueItem)(transforms, name);
    /**
     * TODO: An optimisation here could be to cache the transform in element data
     * and only update if this has changed.
     */
    element.style.transform = buildTransformTemplate(transforms);
};
const buildTransformTemplate = (transforms) => transforms
    .sort(compareTransformOrder)
    .reduce(transformListToString, "")
    .trim();
const transformListToString = (template, name) => `${template} ${name}(var(${asTransformCssVar(name)}))`;




/***/ }),

/***/ "./node_modules/@motionone/dom/dist/gestures/in-view.es.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/gestures/in-view.es.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "inView": () => (/* binding */ inView)
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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveElements": () => (/* binding */ resolveElements)
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

/***/ "./node_modules/@motionone/dom/dist/utils/stagger.es.js":
/*!**************************************************************!*\
  !*** ./node_modules/@motionone/dom/dist/utils/stagger.es.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFromIndex": () => (/* binding */ getFromIndex),
/* harmony export */   "resolveOption": () => (/* binding */ resolveOption),
/* harmony export */   "stagger": () => (/* binding */ stagger)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-number.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-function.es.js");
/* harmony import */ var _motionone_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/animation */ "./node_modules/@motionone/animation/dist/utils/easing.es.js");



function stagger(duration = 0.1, { start = 0, from = 0, easing } = {}) {
    return (i, total) => {
        const fromIndex = (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(from) ? from : getFromIndex(from, total);
        const distance = Math.abs(fromIndex - i);
        let delay = duration * distance;
        if (easing) {
            const maxDelay = total * duration;
            const easingFunction = (0,_motionone_animation__WEBPACK_IMPORTED_MODULE_1__.getEasingFunction)(easing);
            delay = easingFunction(delay / maxDelay) * maxDelay;
        }
        return start + delay;
    };
}
function getFromIndex(from, total) {
    if (from === "first") {
        return 0;
    }
    else {
        const lastIndex = total - 1;
        return from === "last" ? lastIndex : lastIndex / 2;
    }
}
function resolveOption(option, i, total) {
    return (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_2__.isFunction)(option) ? option(i, total) : option;
}




/***/ }),

/***/ "./node_modules/@motionone/easing/dist/cubic-bezier.es.js":
/*!****************************************************************!*\
  !*** ./node_modules/@motionone/easing/dist/cubic-bezier.es.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cubicBezier": () => (/* binding */ cubicBezier)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/noop.es.js");


/*
  Bezier function generator

  This has been modified from Gaëtan Renaudeau's BezierEasing
  https://github.com/gre/bezier-easing/blob/master/src/index.js
  https://github.com/gre/bezier-easing/blob/master/LICENSE
  
  I've removed the newtonRaphsonIterate algo because in benchmarking it
  wasn't noticiably faster than binarySubdivision, indeed removing it
  usually improved times, depending on the curve.

  I also removed the lookup table, as for the added bundle size and loop we're
  only cutting ~4 or so subdivision iterations. I bumped the max iterations up
  to 12 to compensate and this still tended to be faster for no perceivable
  loss in accuracy.

  Usage
    const easeOut = cubicBezier(.17,.67,.83,.67);
    const x = easeOut(0.5); // returns 0.627...
*/
// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const calcBezier = (t, a1, a2) => (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) * t;
const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
    let currentX;
    let currentT;
    let i = 0;
    do {
        currentT = lowerBound + (upperBound - lowerBound) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - x;
        if (currentX > 0.0) {
            upperBound = currentT;
        }
        else {
            lowerBound = currentT;
        }
    } while (Math.abs(currentX) > subdivisionPrecision &&
        ++i < subdivisionMaxIterations);
    return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
    // If this is a linear gradient, return linear easing
    if (mX1 === mY1 && mX2 === mY2)
        return _motionone_utils__WEBPACK_IMPORTED_MODULE_0__.noopReturn;
    const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
    // If animation is at start/end, return t without easing
    return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}




/***/ }),

/***/ "./node_modules/@motionone/easing/dist/steps.es.js":
/*!*********************************************************!*\
  !*** ./node_modules/@motionone/easing/dist/steps.es.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "steps": () => (/* binding */ steps)
/* harmony export */ });
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/clamp.es.js");


const steps = (steps, direction = "end") => (progress) => {
    progress =
        direction === "end"
            ? Math.min(progress, 0.999)
            : Math.max(progress, 0.001);
    const expanded = progress * steps;
    const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
    return (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(0, 1, rounded / steps);
};




/***/ }),

/***/ "./node_modules/@motionone/types/dist/MotionValue.es.js":
/*!**************************************************************!*\
  !*** ./node_modules/@motionone/types/dist/MotionValue.es.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MotionValue": () => (/* binding */ MotionValue)
/* harmony export */ });
/**
 * The MotionValue tracks the state of a single animatable
 * value. Currently, updatedAt and current are unused. The
 * long term idea is to use this to minimise the number
 * of DOM reads, and to abstract the DOM interactions here.
 */
class MotionValue {
    setAnimation(animation) {
        this.animation = animation;
        animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => { });
    }
    clearAnimation() {
        this.animation = this.generator = undefined;
    }
}




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/array.es.js":
/*!********************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/array.es.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addUniqueItem": () => (/* binding */ addUniqueItem),
/* harmony export */   "removeItem": () => (/* binding */ removeItem)
/* harmony export */ });
function addUniqueItem(array, item) {
    array.indexOf(item) === -1 && array.push(item);
}
function removeItem(arr, item) {
    const index = arr.indexOf(item);
    index > -1 && arr.splice(index, 1);
}




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/clamp.es.js":
/*!********************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/clamp.es.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clamp": () => (/* binding */ clamp)
/* harmony export */ });
const clamp = (min, max, v) => Math.min(Math.max(v, min), max);




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/defaults.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/defaults.es.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaults": () => (/* binding */ defaults)
/* harmony export */ });
const defaults = {
    duration: 0.3,
    delay: 0,
    endDelay: 0,
    repeat: 0,
    easing: "ease",
};




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/easing.es.js":
/*!*********************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/easing.es.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEasingForSegment": () => (/* binding */ getEasingForSegment)
/* harmony export */ });
/* harmony import */ var _is_easing_list_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-easing-list.es.js */ "./node_modules/@motionone/utils/dist/is-easing-list.es.js");
/* harmony import */ var _wrap_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrap.es.js */ "./node_modules/@motionone/utils/dist/wrap.es.js");



function getEasingForSegment(easing, i) {
    return (0,_is_easing_list_es_js__WEBPACK_IMPORTED_MODULE_0__.isEasingList)(easing)
        ? easing[(0,_wrap_es_js__WEBPACK_IMPORTED_MODULE_1__.wrap)(0, easing.length, i)]
        : easing;
}




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/interpolate.es.js":
/*!**************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/interpolate.es.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "interpolate": () => (/* binding */ interpolate)
/* harmony export */ });
/* harmony import */ var _mix_es_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mix.es.js */ "./node_modules/@motionone/utils/dist/mix.es.js");
/* harmony import */ var _noop_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./noop.es.js */ "./node_modules/@motionone/utils/dist/noop.es.js");
/* harmony import */ var _offset_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./offset.es.js */ "./node_modules/@motionone/utils/dist/offset.es.js");
/* harmony import */ var _progress_es_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./progress.es.js */ "./node_modules/@motionone/utils/dist/progress.es.js");
/* harmony import */ var _easing_es_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./easing.es.js */ "./node_modules/@motionone/utils/dist/easing.es.js");
/* harmony import */ var _clamp_es_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clamp.es.js */ "./node_modules/@motionone/utils/dist/clamp.es.js");







function interpolate(output, input = (0,_offset_es_js__WEBPACK_IMPORTED_MODULE_0__.defaultOffset)(output.length), easing = _noop_es_js__WEBPACK_IMPORTED_MODULE_1__.noopReturn) {
    const length = output.length;
    /**
     * If the input length is lower than the output we
     * fill the input to match. This currently assumes the input
     * is an animation progress value so is a good candidate for
     * moving outside the function.
     */
    const remainder = length - input.length;
    remainder > 0 && (0,_offset_es_js__WEBPACK_IMPORTED_MODULE_0__.fillOffset)(input, remainder);
    return (t) => {
        let i = 0;
        for (; i < length - 2; i++) {
            if (t < input[i + 1])
                break;
        }
        let progressInRange = (0,_clamp_es_js__WEBPACK_IMPORTED_MODULE_2__.clamp)(0, 1, (0,_progress_es_js__WEBPACK_IMPORTED_MODULE_3__.progress)(input[i], input[i + 1], t));
        const segmentEasing = (0,_easing_es_js__WEBPACK_IMPORTED_MODULE_4__.getEasingForSegment)(easing, i);
        progressInRange = segmentEasing(progressInRange);
        return (0,_mix_es_js__WEBPACK_IMPORTED_MODULE_5__.mix)(output[i], output[i + 1], progressInRange);
    };
}




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/is-cubic-bezier.es.js":
/*!******************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/is-cubic-bezier.es.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isCubicBezier": () => (/* binding */ isCubicBezier)
/* harmony export */ });
/* harmony import */ var _is_number_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-number.es.js */ "./node_modules/@motionone/utils/dist/is-number.es.js");


const isCubicBezier = (easing) => Array.isArray(easing) && (0,_is_number_es_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(easing[0]);




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/is-easing-generator.es.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/is-easing-generator.es.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isEasingGenerator": () => (/* binding */ isEasingGenerator)
/* harmony export */ });
const isEasingGenerator = (easing) => typeof easing === "object" &&
    Boolean(easing.createAnimation);




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/is-easing-list.es.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/is-easing-list.es.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isEasingList": () => (/* binding */ isEasingList)
/* harmony export */ });
/* harmony import */ var _is_number_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-number.es.js */ "./node_modules/@motionone/utils/dist/is-number.es.js");


const isEasingList = (easing) => Array.isArray(easing) && !(0,_is_number_es_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(easing[0]);




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/is-function.es.js":
/*!**************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/is-function.es.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFunction": () => (/* binding */ isFunction)
/* harmony export */ });
const isFunction = (value) => typeof value === "function";




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/is-number.es.js":
/*!************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/is-number.es.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNumber": () => (/* binding */ isNumber)
/* harmony export */ });
const isNumber = (value) => typeof value === "number";




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/is-string.es.js":
/*!************************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/is-string.es.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isString": () => (/* binding */ isString)
/* harmony export */ });
const isString = (value) => typeof value === "string";




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/mix.es.js":
/*!******************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/mix.es.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mix": () => (/* binding */ mix)
/* harmony export */ });
const mix = (min, max, progress) => -progress * min + progress * max + min;




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/noop.es.js":
/*!*******************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/noop.es.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "noopReturn": () => (/* binding */ noopReturn)
/* harmony export */ });
const noop = () => { };
const noopReturn = (v) => v;




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/offset.es.js":
/*!*********************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/offset.es.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultOffset": () => (/* binding */ defaultOffset),
/* harmony export */   "fillOffset": () => (/* binding */ fillOffset)
/* harmony export */ });
/* harmony import */ var _mix_es_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mix.es.js */ "./node_modules/@motionone/utils/dist/mix.es.js");
/* harmony import */ var _progress_es_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress.es.js */ "./node_modules/@motionone/utils/dist/progress.es.js");



function fillOffset(offset, remaining) {
    const min = offset[offset.length - 1];
    for (let i = 1; i <= remaining; i++) {
        const offsetProgress = (0,_progress_es_js__WEBPACK_IMPORTED_MODULE_0__.progress)(0, remaining, i);
        offset.push((0,_mix_es_js__WEBPACK_IMPORTED_MODULE_1__.mix)(min, 1, offsetProgress));
    }
}
function defaultOffset(length) {
    const offset = [0];
    fillOffset(offset, length - 1);
    return offset;
}




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/progress.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/progress.es.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "progress": () => (/* binding */ progress)
/* harmony export */ });
const progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/time.es.js":
/*!*******************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/time.es.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "time": () => (/* binding */ time)
/* harmony export */ });
const time = {
    ms: (seconds) => seconds * 1000,
    s: (milliseconds) => milliseconds / 1000,
};




/***/ }),

/***/ "./node_modules/@motionone/utils/dist/wrap.es.js":
/*!*******************************************************!*\
  !*** ./node_modules/@motionone/utils/dist/wrap.es.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wrap": () => (/* binding */ wrap)
/* harmony export */ });
const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};




/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_InViewManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/InViewManager */ "./resources/js/components/InViewManager.js");

(0,_components_InViewManager__WEBPACK_IMPORTED_MODULE_0__.InViewManager)().init();

/***/ }),

/***/ "./resources/js/components/InViewManager.js":
/*!**************************************************!*\
  !*** ./resources/js/components/InViewManager.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InViewManager": () => (/* binding */ InViewManager),
/* harmony export */   "MotionTarget": () => (/* binding */ MotionTarget)
/* harmony export */ });
/* harmony import */ var motion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion */ "./node_modules/@motionone/dom/dist/gestures/in-view.es.js");
/* harmony import */ var motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion */ "./node_modules/motion/dist/animate.es.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function InViewManager() {
  return {
    inViewElements: null,
    init: function init() {
      this.bind();
      this.initInViewListeners();
    },
    bind: function bind() {
      this.inViewElements = document.querySelectorAll('[data-motion="true"]');
      this.initInViewListeners = this.initInViewListeners.bind(this);
      this.handleInViewEvent = this.handleInViewEvent.bind(this);
    },
    initInViewListeners: function initInViewListeners() {
      var _this = this;
      if (!this.inViewElements) return;
      this.inViewElements.forEach(function (element) {
        (0,motion__WEBPACK_IMPORTED_MODULE_0__.inView)(element, _this.handleInViewEvent, _this.getInViewOptions(element));
      });
    },
    handleInViewEvent: function handleInViewEvent(infos) {
      var motionTarget = new MotionTarget(infos);
      motionTarget.animate();
    },
    getInViewOptions: function getInViewOptions(element) {
      return {
        margin: this.getMargin(element)
      };
    },
    getMargin: function getMargin(element) {
      var margin;
      if (element.getAttribute('data-motion-margin')) {
        margin = element.getAttribute('data-motion-margin');
      } else if (motionForWPOptions.margin) {
        margin = motionForWPOptions.margin;
      } else {
        margin = 100;
      }
      return "-".concat(margin, "px");
    }
  };
}
var MotionTarget = /*#__PURE__*/function () {
  function MotionTarget(infos) {
    _classCallCheck(this, MotionTarget);
    _defineProperty(this, "element", void 0);
    _defineProperty(this, "animation", void 0);
    _defineProperty(this, "animationOptions", void 0);
    this.element = infos.target;
    if (!this.element) return;
    this.animation = this.getAnimation();
    this.animationOptions = this.getAnimationOptions();
  }
  _createClass(MotionTarget, [{
    key: "animate",
    value: function animate() {
      if (!this.element || !this.animation) return;
      (0,motion__WEBPACK_IMPORTED_MODULE_1__.animate)(this.element, this.animation, this.animationOptions);
    }
  }, {
    key: "getAnimation",
    value: function getAnimation() {
      var animationSlug = this.element.getAttribute('data-motion-animation');
      if (!motionForWPAnimations[animationSlug]) return null;
      return motionForWPAnimations[animationSlug].properties;
    }
  }, {
    key: "getAnimationOptions",
    value: function getAnimationOptions() {
      return {
        duration: this.getDuration(),
        easing: this.getEasing(),
        delay: this.getDelay()
      };
    }
  }, {
    key: "getDelay",
    value: function getDelay() {
      var _ref, _this$element$getAttr;
      return (_ref = (_this$element$getAttr = this.element.getAttribute('data-motion-delay')) !== null && _this$element$getAttr !== void 0 ? _this$element$getAttr : motionForWPOptions.delay) !== null && _ref !== void 0 ? _ref : 0;
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      var _ref2, _this$element$getAttr2;
      return (_ref2 = (_this$element$getAttr2 = this.element.getAttribute('data-motion-duration')) !== null && _this$element$getAttr2 !== void 0 ? _this$element$getAttr2 : motionForWPOptions.duration) !== null && _ref2 !== void 0 ? _ref2 : 0.5;
    }
  }, {
    key: "getEasing",
    value: function getEasing() {
      var _motionForWPOptions$e;
      var easingSlug = this.element.getAttribute('data-motion-easing');
      if (!motionForWPEasings[easingSlug]) return (_motionForWPOptions$e = motionForWPOptions.easing) !== null && _motionForWPOptions$e !== void 0 ? _motionForWPOptions$e : 'ease-in-out';
      return motionForWPEasings[easingSlug].property;
    }
  }]);
  return MotionTarget;
}();

/***/ }),

/***/ "./node_modules/hey-listen/dist/hey-listen.es.js":
/*!*******************************************************!*\
  !*** ./node_modules/hey-listen/dist/hey-listen.es.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "invariant": () => (/* binding */ invariant),
/* harmony export */   "warning": () => (/* binding */ warning)
/* harmony export */ });
var warning = function () { };
var invariant = function () { };
if (true) {
    warning = function (check, message) {
        if (!check && typeof console !== 'undefined') {
            console.warn(message);
        }
    };
    invariant = function (check, message) {
        if (!check) {
            throw new Error(message);
        }
    };
}




/***/ }),

/***/ "./resources/scss/front.scss":
/*!***********************************!*\
  !*** ./resources/scss/front.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/scss/admin.scss":
/*!***********************************!*\
  !*** ./resources/scss/admin.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/motion/dist/animate.es.js":
/*!************************************************!*\
  !*** ./node_modules/motion/dist/animate.es.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animate": () => (/* binding */ animate),
/* harmony export */   "animateProgress": () => (/* binding */ animateProgress)
/* harmony export */ });
/* harmony import */ var _motionone_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @motionone/dom */ "./node_modules/@motionone/dom/dist/animate/utils/controls.es.js");
/* harmony import */ var _motionone_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @motionone/dom */ "./node_modules/@motionone/dom/dist/animate/index.es.js");
/* harmony import */ var _motionone_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @motionone/utils */ "./node_modules/@motionone/utils/dist/is-function.es.js");
/* harmony import */ var _motionone_animation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @motionone/animation */ "./node_modules/@motionone/animation/dist/Animation.es.js");




function animateProgress(target, options = {}) {
    return (0,_motionone_dom__WEBPACK_IMPORTED_MODULE_0__.withControls)([
        () => {
            const animation = new _motionone_animation__WEBPACK_IMPORTED_MODULE_1__.Animation(target, [0, 1], options);
            animation.finished.catch(() => { });
            return animation;
        },
    ], options, options.duration);
}
function animate(target, keyframesOrOptions, options) {
    const factory = (0,_motionone_utils__WEBPACK_IMPORTED_MODULE_2__.isFunction)(target) ? animateProgress : _motionone_dom__WEBPACK_IMPORTED_MODULE_3__.animate;
    return factory(target, keyframesOrOptions, options);
}




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
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/admin": 0,
/******/ 			"css/front": 0
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
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkmotion_for_wp"] = self["webpackChunkmotion_for_wp"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/admin","css/front"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	__webpack_require__.O(undefined, ["css/admin","css/front"], () => (__webpack_require__("./resources/scss/front.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/admin","css/front"], () => (__webpack_require__("./resources/scss/admin.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;