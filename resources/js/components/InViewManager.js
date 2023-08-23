import {animate, inView, stagger} from "motion";

export function InViewManager() {
    return {
        inViewElements: null,

        init() {
            this.bind();
            this.initInViewListeners();
        },
        bind() {
            this.inViewElements = document.querySelectorAll('[data-motion="true"]');
            this.initInViewListeners = this.initInViewListeners.bind(this);
            this.handleInViewEvent = this.handleInViewEvent.bind(this);
        },

        initInViewListeners() {
            if (!this.inViewElements) return;
            this.inViewElements.forEach((element) => {
                inView(element, this.handleInViewEvent, this.getInViewOptions(element));
            });
        },

        handleInViewEvent(infos) {
            const motionTarget = new MotionTarget(infos);
            motionTarget.animate()
        },

        getInViewOptions(element) {
            return {
                margin: this.getMargin(element)
            }
        },

        getMargin(element) {
            let margin;

            if (element.getAttribute('data-motion-margin')) {
                margin = element.getAttribute('data-motion-margin');
            } else if (motionForGutenbergOptions.margin) {
                margin = motionForGutenbergOptions.margin;
            } else {
                margin = 100;
            }

            return `-${margin}px`;
        }
    }
}

export class MotionTarget {
    element
    animation
    animationOptions

    constructor(infos) {
        this.element = infos.target
        if (!this.element) return;
        this.animation = this.getAnimation();
        this.animationOptions = this.getAnimationOptions();
    }

    animate() {
        if (!this.element || !this.animation) return;
        animate(this.element, this.animation, this.animationOptions);
    }

    getAnimation() {
        const animationSlug = this.element.getAttribute('data-motion-animation');
        if (!motionForGutenbergAnimations[animationSlug]) return null;
        return motionForGutenbergAnimations[animationSlug].properties;
    }

    getAnimationOptions() {
        return {
            duration: this.getDuration(),
            easing: this.getEasing(),
            delay: this.getDelay(),
        }
    }

    getDelay() {
        return this.element.getAttribute('data-motion-delay') ?? motionForGutenbergOptions.delay ?? 0;
    }

    getDuration() {
        return this.element.getAttribute('data-motion-duration') ?? motionForGutenbergOptions.duration ?? 0.5;
    }

    getEasing() {
        const easingSlug = this.element.getAttribute('data-motion-easing');
        if (!motionForGutenbergEasings[easingSlug]) return motionForGutenbergOptions.easing ?? 'ease-in-out';
        return motionForGutenbergEasings[easingSlug].property;
    }
}

