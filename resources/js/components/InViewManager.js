import { animate, inView } from 'motion';

const runtime = window.motionForWP || {
	animations: {},
	easings: {},
	options: {},
};

export function InViewManager() {
	return {
		inViewElements: null,

		init() {
			this.bind();
			this.initInViewListeners();
		},
		bind() {
			this.inViewElements = document.querySelectorAll(
				'[data-motion="true"]'
			);
			this.initInViewListeners = this.initInViewListeners.bind( this );
			this.handleInViewEvent = this.handleInViewEvent.bind( this );
		},

		initInViewListeners() {
			if ( ! this.inViewElements?.length ) {
				return;
			}
			this.inViewElements.forEach( ( element ) => {
				inView(
					element,
					this.handleInViewEvent,
					this.getInViewOptions( element )
				);
			} );
		},

		handleInViewEvent( infos ) {
			const motionTarget = new MotionTarget( infos );
			motionTarget.animate();
		},

		getInViewOptions( element ) {
			return {
				margin: this.getMargin( element ),
			};
		},

		getMargin( element ) {
			const configuredMargin =
				element.getAttribute( 'data-motion-margin' ) ??
				runtime.options.margin ??
				100;
			const margin = clampNumber( configuredMargin, 0, 1000, 100 );

			return `-${ margin }px`;
		},
	};
}

export class MotionTarget {
	element;
	animation;
	animationOptions;

	constructor( infos ) {
		this.element = infos.target;
		if ( ! this.element ) {
			return;
		}
		this.animation = this.getAnimation();
		this.animationOptions = this.getAnimationOptions();
	}

	animate() {
		if ( ! this.element || ! this.animation ) {
			return;
		}
		animate( this.element, this.animation, this.animationOptions );
	}

	getAnimation() {
		const animationSlug = this.element.getAttribute(
			'data-motion-animation'
		);
		if ( ! runtime.animations[ animationSlug ] ) {
			return null;
		}
		return runtime.animations[ animationSlug ].properties;
	}

	getAnimationOptions() {
		return {
			duration: this.getDuration(),
			easing: this.getEasing(),
			delay: this.getDelay(),
		};
	}

	getDelay() {
		return clampNumber(
			this.element.getAttribute( 'data-motion-delay' ) ??
				runtime.options.delay,
			0,
			60,
			0
		);
	}

	getDuration() {
		return clampNumber(
			this.element.getAttribute( 'data-motion-duration' ) ??
				runtime.options.duration,
			0,
			60,
			0.5
		);
	}

	getEasing() {
		const easingSlug = this.element.getAttribute( 'data-motion-easing' );
		if ( ! runtime.easings[ easingSlug ] ) {
			return runtime.options.easing ?? 'ease-in-out';
		}
		return runtime.easings[ easingSlug ].property;
	}
}

function clampNumber( value, min, max, fallback ) {
	const number = Number.parseFloat( value );
	return Number.isFinite( number )
		? Math.min( max, Math.max( min, number ) )
		: fallback;
}
