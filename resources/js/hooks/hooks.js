import { createHigherOrderComponent } from '@wordpress/compose';
// The classic JSX transform consumes createElement after linting.
import { createElement, Fragment } from '@wordpress/element';
import { addFilter, applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

import { MotionInspectorControls } from '../editor/MotionInspectorControls';
import { runtime } from '../editor/runtime';

// Referenced by Babel's classic JSX transform after linting.
void createElement;

const namespace = 'motion-for-wp';
const excludedBlocks = new Set( runtime.excludedBlocks || [] );
const supportedBlocks = new Set();

const getBlockInteractions = ( blockName ) => {
	const interactions =
		blockName === 'core/button'
			? [
					{
						label: __( 'Magnetic pull', 'motion-for-wp' ),
						value: 'magnetic-pull',
					},
					{
						label: __( 'Rolling button', 'motion-for-wp' ),
						value: 'rolling-button',
					},
			  ]
			: [];

	/**
	 * Filters the interactive effects available for a supported block type.
	 *
	 * @param {Array}  interactions Available interaction options.
	 * @param {string} blockName    Registered block name.
	 */
	const filteredInteractions = applyFilters(
		'motionForWP.blockInteractions',
		interactions,
		blockName
	);

	return Array.isArray( filteredInteractions )
		? filteredInteractions.filter(
				( interaction ) =>
					typeof interaction?.label === 'string' &&
					typeof interaction?.value === 'string' &&
					interaction.value !== 'none'
		  )
		: interactions;
};

const canSupportMotion = ( settings, blockName ) => {
	const hasSerializedRoot = typeof settings?.save === 'function';
	const isSupported =
		Boolean( blockName ) &&
		hasSerializedRoot &&
		! excludedBlocks.has( blockName );

	/**
	 * Filters whether Motion controls support a registered block type.
	 *
	 * @param {boolean} isSupported Whether the block is supported by default.
	 * @param {string}  blockName   Registered block name.
	 * @param {Object}  settings    Block type settings.
	 */
	const filteredSupport = Boolean(
		applyFilters(
			'motionForWP.isBlockSupported',
			isSupported,
			blockName,
			settings
		)
	);

	return hasSerializedRoot && filteredSupport;
};

const addAttributes = ( settings, name ) => {
	if ( ! canSupportMotion( settings, name ) ) {
		return settings;
	}

	supportedBlocks.add( name );
	const interactions = getBlockInteractions( name );

	return {
		...settings,
		attributes: {
			...settings.attributes,
			motion: { type: 'string', default: 'global' },
			duration: { type: 'string', default: '0' },
			delay: { type: 'string', default: '0' },
			easing: { type: 'string', default: 'none' },
			margin: { type: 'string', default: '0' },
			...( interactions.length > 0
				? {
						motionInteraction: {
							type: 'string',
							default: 'none',
						},
				  }
				: {} ),
		},
	};
};

const addAdvancedControls = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		if ( ! supportedBlocks.has( props.name ) ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<MotionInspectorControls
					attributes={ props.attributes }
					clientId={ props.clientId }
					interactionOptions={ getBlockInteractions( props.name ) }
					setAttributes={ props.setAttributes }
				/>
			</Fragment>
		);
	},
	'addAdvancedControls'
);

const addExtraProps = ( props, blockType, attributes ) => {
	if ( ! supportedBlocks.has( blockType.name ) ) {
		return props;
	}

	const extraProps = {};
	const hasEntranceAnimation =
		attributes.motion !== 'none' &&
		! (
			attributes.motion === 'global' &&
			runtime.options?.default_animation === 'none'
		);

	if ( hasEntranceAnimation ) {
		extraProps[ 'data-motion' ] = true;
		extraProps[ 'data-motion-animation' ] =
			attributes.motion === 'global'
				? runtime.options?.default_animation
				: attributes.motion;
	}

	if (
		getBlockInteractions( blockType.name ).some(
			( interaction ) =>
				interaction.value === attributes.motionInteraction
		)
	) {
		extraProps[ 'data-motion-interaction' ] = attributes.motionInteraction;
	}

	if (
		hasEntranceAnimation &&
		attributes.easing &&
		attributes.easing !== 'none'
	) {
		extraProps[ 'data-motion-easing' ] = attributes.easing;
	}
	if (
		hasEntranceAnimation &&
		attributes.duration &&
		attributes.duration !== '0'
	) {
		extraProps[ 'data-motion-duration' ] = attributes.duration;
	}
	if (
		hasEntranceAnimation &&
		attributes.delay &&
		attributes.delay !== '0'
	) {
		extraProps[ 'data-motion-delay' ] = attributes.delay;
	}
	if (
		hasEntranceAnimation &&
		attributes.margin &&
		attributes.margin !== '0'
	) {
		extraProps[ 'data-motion-margin' ] = attributes.margin;
	}

	return { ...props, ...extraProps };
};

export function registerMotionHooks() {
	addFilter(
		'blocks.registerBlockType',
		`${ namespace }/custom-attributes`,
		addAttributes
	);
	addFilter(
		'editor.BlockEdit',
		`${ namespace }/advanced-control`,
		addAdvancedControls
	);
	addFilter(
		'blocks.getSaveContent.extraProps',
		`${ namespace }/extra-props`,
		addExtraProps
	);
}
