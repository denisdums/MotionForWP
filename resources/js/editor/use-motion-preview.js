import { useCallback, useEffect, useState } from '@wordpress/element';
import { animate } from 'motion';

import {
	resolveMotionEasing,
	resolveMotionNumber,
	respectsReducedMotion,
	runtime,
} from './runtime';

const activePreviews = new Map();

const findBlockElement = ( clientId ) => {
	const selector = `[data-block="${ clientId }"]`;
	const canvas = document.querySelector(
		'iframe[name="editor-canvas"], iframe.editor-canvas__iframe'
	);
	const documents = [ canvas?.contentDocument, document ].filter( Boolean );

	for ( const currentDocument of documents ) {
		const element = currentDocument.querySelector( selector );
		if ( element ) {
			return element;
		}
	}

	return null;
};

export const stopMotionPreview = ( clientId ) => {
	const preview = activePreviews.get( clientId );
	if ( ! preview ) {
		return;
	}

	activePreviews.delete( clientId );
	preview.controls.cancel();

	if ( preview.originalStyle === null ) {
		preview.element.removeAttribute( 'style' );
	} else {
		preview.element.setAttribute( 'style', preview.originalStyle );
	}
};

export function useMotionPreview(
	clientId,
	attributes,
	previewEnabled = true
) {
	const [ previewError, setPreviewError ] = useState( false );
	const reducedMotion =
		respectsReducedMotion &&
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	useEffect(
		() => () => {
			stopMotionPreview( clientId );
		},
		[ clientId ]
	);

	const replay = useCallback( () => {
		if ( ! previewEnabled ) {
			stopMotionPreview( clientId );
			setPreviewError( false );
			return;
		}

		const element = findBlockElement( clientId );
		const animationSlug =
			attributes.motion === 'global'
				? runtime.options?.default_animation
				: attributes.motion;
		const animation = runtime.animations?.[ animationSlug ];

		setPreviewError( false );
		if ( reducedMotion || ! element || ! animation?.properties ) {
			setPreviewError( ! reducedMotion );
			return;
		}

		stopMotionPreview( clientId );

		const preview = {
			element,
			originalStyle: element.getAttribute( 'style' ),
			controls: animate( element, animation.properties, {
				duration: resolveMotionNumber(
					attributes.duration,
					runtime.options?.duration,
					0.5
				),
				delay: resolveMotionNumber(
					attributes.delay,
					runtime.options?.delay,
					0
				),
				easing: resolveMotionEasing( attributes.easing ),
			} ),
		};

		activePreviews.set( clientId, preview );
		preview.controls.finished
			.then( () => {
				if ( activePreviews.get( clientId ) === preview ) {
					stopMotionPreview( clientId );
				}
			} )
			.catch( () => {} );
	}, [ attributes, clientId, previewEnabled, reducedMotion ] );

	return { previewError, reducedMotion, replay, setPreviewError };
}
