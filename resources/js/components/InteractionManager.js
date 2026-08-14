import { animate } from 'motion';

const MAGNETIC_PULL_STRENGTH = 0.55;
const MAGNETIC_MAX_PULL = 34;
const TILT_CARD_MAX_ANGLE = 2;

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
					if ( interaction === 'tilt-card' && hasFinePointer ) {
						this.initTiltCard( field );
					}
				} );
		},

		initTiltCard( target ) {
			if ( target.dataset.motionTiltCard === 'true' ) {
				return;
			}

			const originalTransform = target.style.transform;
			const originalWillChange = target.style.willChange;
			let rect = null;
			let isActive = false;
			let frame = null;
			let targetDegree = 0;
			let targetRotateX = 0;
			let targetRotateY = 0;
			let currentDegree = 0;
			let currentRotateX = 0;
			let currentRotateY = 0;

			target.dataset.motionTiltCard = 'true';
			target.style.willChange = 'transform';

			const render = () => {
				frame = null;
				const smoothing = 0.18;
				currentDegree += ( targetDegree - currentDegree ) * smoothing;
				currentRotateX +=
					( targetRotateX - currentRotateX ) * smoothing;
				currentRotateY +=
					( targetRotateY - currentRotateY ) * smoothing;

				const isAtRest =
					Math.abs( currentDegree ) < 0.01 &&
					Math.abs( currentRotateX ) < 0.01 &&
					Math.abs( currentRotateY ) < 0.01 &&
					targetDegree === 0 &&
					targetRotateX === 0 &&
					targetRotateY === 0;

				if ( isAtRest ) {
					currentDegree = 0;
					currentRotateX = 0;
					currentRotateY = 0;
					target.style.transform = originalTransform;
					return;
				}

				target.style.transform = `perspective(200px) rotate3d(${ -currentRotateX }, ${ currentRotateY }, 0, ${ currentDegree }deg)`;
				frame = window.requestAnimationFrame( render );
			};

			const requestRender = () => {
				if ( frame === null ) {
					frame = window.requestAnimationFrame( render );
				}
			};

			const leave = () => {
				if ( ! isActive ) {
					return;
				}
				isActive = false;
				rect = null;
				targetDegree = 0;
				targetRotateX = 0;
				targetRotateY = 0;
				requestRender();
			};
			const enter = () => {
				rect = target.getBoundingClientRect();
				isActive = true;
			};
			const move = ( event ) => {
				if ( ! isActive || event.pointerType === 'touch' ) {
					return;
				}

				if (
					event.clientX < rect.left ||
					event.clientX > rect.right ||
					event.clientY < rect.top ||
					event.clientY > rect.bottom
				) {
					leave();
					return;
				}

				const x = clamp(
					event.clientX - ( rect.left + rect.width / 2 ),
					-rect.width / 2,
					rect.width / 2
				);
				const y = clamp(
					event.clientY - ( rect.top + rect.height / 2 ),
					-rect.height / 2,
					rect.height / 2
				);
				const maxDistance = Math.max( rect.width / 2, rect.height / 2 );
				const distance = Math.min(
					Math.sqrt( x * x + y * y ),
					maxDistance
				);
				targetDegree = ( distance / maxDistance ) * TILT_CARD_MAX_ANGLE;
				targetRotateX = y / ( rect.width / 2 );
				targetRotateY = x / ( rect.height / 2 );
				requestRender();
			};

			target.addEventListener( 'pointerenter', enter );
			document.addEventListener( 'pointermove', move );
			this.cleanups.push( () => {
				target.removeEventListener( 'pointerenter', enter );
				document.removeEventListener( 'pointermove', move );
				if ( frame !== null ) {
					window.cancelAnimationFrame( frame );
				}
				target.style.transform = originalTransform;
				target.style.willChange = originalWillChange;
				delete target.dataset.motionTiltCard;
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
			let rect = null;
			let isActive = false;
			let currentX = 0;
			let currentY = 0;
			let targetX = 0;
			let targetY = 0;
			const originalTranslate = target.style.translate;
			const originalWillChange = target.style.willChange;

			target.style.willChange = 'translate';

			const render = () => {
				frame = null;
				const smoothing = 0.2;
				currentX += ( targetX - currentX ) * smoothing;
				currentY += ( targetY - currentY ) * smoothing;

				const isAtRest =
					Math.abs( currentX ) < 0.01 &&
					Math.abs( currentY ) < 0.01 &&
					targetX === 0 &&
					targetY === 0;

				if ( isAtRest ) {
					currentX = 0;
					currentY = 0;
					target.style.translate = originalTranslate;
					return;
				}

				target.style.translate = `${ currentX }px ${ currentY }px`;
				frame = window.requestAnimationFrame( render );
			};

			const requestRender = () => {
				if ( frame === null ) {
					frame = window.requestAnimationFrame( render );
				}
			};

			const updateTarget = ( event ) => {
				if (
					event.clientX < rect.left ||
					event.clientX > rect.right ||
					event.clientY < rect.top ||
					event.clientY > rect.bottom
				) {
					reset();
					return;
				}

				const centerX = rect.left + rect.width / 2;
				const centerY = rect.top + rect.height / 2;
				targetX = clamp(
					( event.clientX - centerX ) * MAGNETIC_PULL_STRENGTH,
					-MAGNETIC_MAX_PULL,
					MAGNETIC_MAX_PULL
				);
				targetY = clamp(
					( event.clientY - centerY ) * MAGNETIC_PULL_STRENGTH,
					-MAGNETIC_MAX_PULL,
					MAGNETIC_MAX_PULL
				);
				requestRender();
			};

			const move = ( event ) => {
				if ( ! isActive || event.pointerType === 'touch' ) {
					return;
				}

				updateTarget( event );
			};

			const reset = () => {
				isActive = false;
				rect = null;
				targetX = 0;
				targetY = 0;
				requestRender();
			};
			const enter = ( event ) => {
				rect = target.getBoundingClientRect();
				isActive = true;
				updateTarget( event );
			};

			target.addEventListener( 'pointerenter', enter );
			document.addEventListener( 'pointermove', move );
			this.cleanups.push( () => {
				target.removeEventListener( 'pointerenter', enter );
				document.removeEventListener( 'pointermove', move );
				if ( frame !== null ) {
					window.cancelAnimationFrame( frame );
				}
				target.style.translate = originalTranslate;
				target.style.willChange = originalWillChange;
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
