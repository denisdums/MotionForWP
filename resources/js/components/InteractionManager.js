import { animate } from 'motion';

const MAGNETIC_PULL_STRENGTH = 0.35;
const MAGNETIC_MAX_PULL = 26;

export function InteractionManager() {
	return {
		cleanups: [],

		init() {
			if (
				! window.matchMedia( '(hover: hover) and (pointer: fine)' )
					.matches
			) {
				return;
			}

			document
				.querySelectorAll( '[data-motion-interaction="magnetic-pull"]' )
				.forEach( ( field ) => this.initMagneticPull( field ) );
		},

		initMagneticPull( field ) {
			const target =
				field.querySelector( '.wp-block-button__link' ) || field;
			let frame = null;
			let currentX = 0;
			let currentY = 0;
			let pointerX = 0;
			let pointerY = 0;
			let controls = null;

			const move = ( event ) => {
				if ( event.pointerType === 'touch' ) {
					return;
				}
				pointerX = event.clientX;
				pointerY = event.clientY;

				if ( frame !== null ) {
					return;
				}

				frame = window.requestAnimationFrame( () => {
					frame = null;
					const rect = target.getBoundingClientRect();
					const centerX = rect.left + rect.width / 2 - currentX;
					const centerY = rect.top + rect.height / 2 - currentY;
					currentX = clamp(
						( pointerX - centerX ) * MAGNETIC_PULL_STRENGTH,
						-MAGNETIC_MAX_PULL,
						MAGNETIC_MAX_PULL
					);
					currentY = clamp(
						( pointerY - centerY ) * MAGNETIC_PULL_STRENGTH,
						-MAGNETIC_MAX_PULL,
						MAGNETIC_MAX_PULL
					);
					controls?.cancel();
					controls = animate(
						target,
						{ x: currentX, y: currentY },
						{ duration: 0.16, easing: 'ease-out' }
					);
				} );
			};

			const reset = () => {
				if ( frame !== null ) {
					window.cancelAnimationFrame( frame );
					frame = null;
				}
				currentX = 0;
				currentY = 0;
				controls?.cancel();
				controls = animate(
					target,
					{ x: 0, y: 0 },
					{ type: 'spring', stiffness: 320, damping: 24 }
				);
			};

			field.addEventListener( 'pointermove', move );
			field.addEventListener( 'pointerleave', reset );
			this.cleanups.push( () => {
				field.removeEventListener( 'pointermove', move );
				field.removeEventListener( 'pointerleave', reset );
				if ( frame !== null ) {
					window.cancelAnimationFrame( frame );
				}
				controls?.cancel();
			} );
		},

		destroy() {
			this.cleanups.splice( 0 ).forEach( ( cleanup ) => cleanup() );
		},
	};
}

function clamp( value, min, max ) {
	return Math.min( max, Math.max( min, value ) );
}
