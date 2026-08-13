import { inView } from 'motion';

const counters = {
	countersItems: [],
	init() {
		this.countersItems = document.querySelectorAll( '.motion-counter' );
		this.countersItems.forEach( ( item ) => {
			inView( item, this.handleInView );
		} );
	},

	handleInView( el ) {
		counters.startCounter( el.target );
	},

	startCounter( el, speed = 40 ) {
		const counterNumberText = el.textContent;
		const counterNumberEnd = parseInt(
			counterNumberText.replace( /\s/g, '' ),
			10
		);
		if (
			! Number.isFinite( counterNumberEnd ) ||
			counterNumberEnd <= 0 ||
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
		) {
			return;
		}
		const counterNumberStart = 0;
		const counterNumberStep = Math.ceil(
			( counterNumberEnd - counterNumberStart ) / speed
		);
		let counterNumberCurrent = counterNumberStart;
		const counterNumberInterval = setInterval( function () {
			counterNumberCurrent += counterNumberStep;
			if ( counterNumberCurrent >= counterNumberEnd ) {
				el.textContent = counterNumberEnd;
				clearInterval( counterNumberInterval );
			} else {
				el.textContent = counterNumberCurrent;
			}
		}, speed );
	},
};
document.addEventListener( 'DOMContentLoaded', function () {
	counters.init();
} );
