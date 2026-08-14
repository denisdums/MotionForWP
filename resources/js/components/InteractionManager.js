import { animate } from 'motion';

const MAGNETIC_PULL_STRENGTH = 0.35;
const MAGNETIC_MAX_PULL = 26;

export function InteractionManager() {
	return {
		cleanups: [],

		init() {
			const hasFinePointer = window.matchMedia(
				'(hover: hover) and (pointer: fine)'
			).matches;

			document
				.querySelectorAll( '[data-motion-interaction]' )
				.forEach( ( field ) => {
					const interaction = field.getAttribute(
						'data-motion-interaction'
					);
					if ( interaction === 'magnetic-pull' && hasFinePointer ) {
						this.initMagneticPull( field );
					}
					if ( interaction === 'rolling-button' ) {
						this.initRollingButton( field, hasFinePointer );
					}
				} );
		},

		initRollingButton( field, hasFinePointer ) {
			const target = field.querySelector( '.wp-block-button__link' );
			if ( ! target || target.dataset.motionRollingButton === 'true' ) {
				return;
			}

			const viewport = document.createElement( 'span' );
			const primary = document.createElement( 'span' );
			const duplicate = document.createElement( 'span' );
			viewport.className = 'motion-for-wp-rolling-button__viewport';
			primary.className = 'motion-for-wp-rolling-button__label';
			duplicate.className =
				'motion-for-wp-rolling-button__label motion-for-wp-rolling-button__label--duplicate';
			duplicate.setAttribute( 'aria-hidden', 'true' );

			while ( target.firstChild ) {
				primary.appendChild( target.firstChild );
			}
			duplicate.append(
				...Array.from( primary.childNodes, ( node ) =>
					node.cloneNode( true )
				)
			);
			viewport.append( primary, duplicate );
			target.appendChild( viewport );
			target.dataset.motionRollingButton = 'true';

			let controls = [];
			const roll = ( active ) => {
				controls.forEach( ( control ) => control.cancel() );
				controls = [
					animate(
						primary,
						{ y: active ? '-100%' : '0%' },
						{ duration: 0.32, easing: 'ease-in-out' }
					),
					animate(
						duplicate,
						{ y: active ? '-100%' : '0%' },
						{ duration: 0.32, easing: 'ease-in-out' }
					),
				];
			};
			const enter = () => roll( true );
			const leave = () => roll( false );

			if ( hasFinePointer ) {
				target.addEventListener( 'pointerenter', enter );
				target.addEventListener( 'pointerleave', leave );
			}
			target.addEventListener( 'focus', enter );
			target.addEventListener( 'blur', leave );

			this.cleanups.push( () => {
				target.removeEventListener( 'pointerenter', enter );
				target.removeEventListener( 'pointerleave', leave );
				target.removeEventListener( 'focus', enter );
				target.removeEventListener( 'blur', leave );
				controls.forEach( ( control ) => control.cancel() );
				while ( primary.firstChild ) {
					target.insertBefore( primary.firstChild, viewport );
				}
				viewport.remove();
				delete target.dataset.motionRollingButton;
			} );
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

			target.addEventListener( 'pointermove', move );
			target.addEventListener( 'pointerleave', reset );
			this.cleanups.push( () => {
				target.removeEventListener( 'pointermove', move );
				target.removeEventListener( 'pointerleave', reset );
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
