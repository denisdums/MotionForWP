import { BaseControl, Button, Flex } from '@wordpress/components';
import { createElement, useEffect, useRef, useState } from '@wordpress/element';
import { rotateRight } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { animate } from 'motion';

import { resolveMotionEasing, resolveMotionNumber, runtime } from './runtime';

void createElement;

export function MotionAnimationPreview( {
	animationSlug,
	delay,
	duration,
	easing,
	reducedMotion,
} ) {
	const target = useRef();
	const [ replayKey, setReplayKey ] = useState( 0 );

	useEffect( () => {
		const animation = runtime.animations?.[ animationSlug ];
		if ( reducedMotion || ! target.current || ! animation?.properties ) {
			return undefined;
		}

		const controls = animate( target.current, animation.properties, {
			duration: resolveMotionNumber(
				duration,
				runtime.options?.duration,
				0.5
			),
			delay: resolveMotionNumber( delay, runtime.options?.delay, 0 ),
			easing: resolveMotionEasing( easing ),
		} );

		return () => controls.cancel();
	}, [ animationSlug, delay, duration, easing, reducedMotion, replayKey ] );

	return (
		<BaseControl
			id="motion-for-wp-animation-preview"
			__nextHasNoMarginBottom
			label={
				<Flex justify="space-between">
					<span>{ __( 'Preview', 'motion-for-wp' ) }</span>
					<Button
						icon={ rotateRight }
						iconSize={ 20 }
						label={ __( 'Replay preview', 'motion-for-wp' ) }
						isSmall
						disabled={ reducedMotion }
						onClick={ () =>
							setReplayKey( ( current ) => current + 1 )
						}
					/>
				</Flex>
			}
		>
			<div
				id="motion-for-wp-animation-preview"
				className="motion-for-wp-inspector__preview"
				aria-hidden="true"
			>
				<span
					className="motion-for-wp-inspector__preview-target"
					ref={ target }
				/>
			</div>
		</BaseControl>
	);
}
