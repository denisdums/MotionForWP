import { __, sprintf } from '@wordpress/i18n';

export const runtime = window.motionForWP || {
	animations: {},
	easings: {},
	options: {},
};

export const resolveMotionNumber = ( value, globalValue, fallback ) => {
	const resolved = value && value !== '0' ? value : globalValue;
	const number = Number.parseFloat( resolved );

	return Number.isFinite( number ) ? number : fallback;
};

export const resolveMotionEasing = ( value ) => {
	const easingSlug =
		value && value !== 'none' ? value : runtime.options?.easing;

	return (
		runtime.easings?.[ easingSlug ]?.property || easingSlug || 'ease-in-out'
	);
};

export const animationOptions = [
	{
		label: __( 'No animation', 'motion-for-wp' ),
		value: 'none',
	},
	...Object.entries( runtime.animations )
		.filter( ( [ value ] ) => value !== 'none' )
		.map( ( [ value, animation ] ) => ( {
			label: animation.name,
			value,
		} ) ),
];

const globalEasing =
	runtime.easings?.[ runtime.options?.easing ]?.name ||
	runtime.options?.easing ||
	'ease-in-out';

export const easingOptions = [
	{
		label: sprintf(
			/* translators: %s: global easing name. */
			__( 'Use global setting (%s)', 'motion-for-wp' ),
			globalEasing
		),
		value: 'none',
	},
	...Object.entries( runtime.easings )
		.filter( ( [ value ] ) => value !== 'none' )
		.map( ( [ value, easing ] ) => ( {
			label: easing.name,
			value,
		} ) ),
];

export const globalValueHelp = ( value, unit ) =>
	sprintf(
		/* translators: 1: global setting value, 2: unit. */
		__(
			'Leave empty to use the global value: %1$s %2$s.',
			'motion-for-wp'
		),
		value,
		unit
	);
