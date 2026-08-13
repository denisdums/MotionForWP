import { animate, inView } from 'motion';

const runtime = window.motionForWP || {
	animations: {},
	easings: {},
	options: {},
};

export function InViewManager() {
	return {
		inViewElements: null,
		activeAnimations: 0,
		animationQueue: [],

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
			const queuedAnimation = {
				cancelled: false,
				run: () => {
					if ( queuedAnimation.cancelled ) {
						return;
					}
					this.activeAnimations += 1;
					const controls = motionTarget.animate();
					Promise.resolve( controls?.finished )
						.catch( () => undefined )
						.finally( () => {
							this.activeAnimations = Math.max(
								0,
								this.activeAnimations - 1
							);
							this.runNextAnimation();
						} );
				},
			};

			this.scheduleAnimation( queuedAnimation );

			if ( runtime.options.repeat === 'always' ) {
				return () => {
					queuedAnimation.cancelled = true;
					motionTarget.stop();
				};
			}
		},

		scheduleAnimation( queuedAnimation ) {
			const limit = clampNumber(
				runtime.options.concurrent_limit,
				0,
				20,
				0
			);
			if ( limit > 0 && this.activeAnimations >= limit ) {
				this.animationQueue.push( queuedAnimation );
				return;
			}
			queuedAnimation.run();
		},

		runNextAnimation() {
			let next = this.animationQueue.shift();
			while ( next?.cancelled ) {
				next = this.animationQueue.shift();
			}
			if ( next ) {
				this.scheduleAnimation( next );
			}
		},

		getInViewOptions( element ) {
			return {
				margin: this.getMargin( element ),
				amount: clampNumber(
					Number( runtime.options.threshold ?? 0 ) / 100,
					0,
					1,
					0
				),
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
			return null;
		}
		this.controls = animate(
			this.element,
			this.animation,
			this.animationOptions
		);
		return this.controls;
	}

	stop() {
		this.controls?.cancel();
	}

	getAnimation() {
		if (
			window.matchMedia( '(max-width: 782px)' ).matches &&
			runtime.options.mobile_behavior === 'simplified'
		) {
			return (
				runtime.animations?.[ 'fade-in' ]?.properties || {
					opacity: [ 0, 1 ],
				}
			);
		}
		const animationSlug =
			this.element.getAttribute( 'data-motion-animation' ) ||
			runtime.options.default_animation;
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
		const delay = clampNumber(
			this.element.getAttribute( 'data-motion-delay' ) ??
				runtime.options.delay,
			0,
			60,
			0
		);
		return delay + this.getStaggerDelay();
	}

	getStaggerDelay() {
		if (
			runtime.options.stagger_enabled !== true ||
			! this.element.parentElement
		) {
			return 0;
		}
		const siblings = Array.from(
			this.element.parentElement.children
		).filter( ( element ) => element.matches( '[data-motion="true"]' ) );
		const index = siblings.indexOf( this.element );
		const step = clampNumber( runtime.options.stagger_delay, 0, 5, 0.1 );

		return index > 0 ? index * step : 0;
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
