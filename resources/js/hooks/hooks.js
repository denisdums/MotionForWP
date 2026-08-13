import { createHigherOrderComponent } from '@wordpress/compose';
// The classic JSX transform consumes createElement after linting.
import { createElement, Fragment } from '@wordpress/element';
import { addFilter, applyFilters } from '@wordpress/hooks';

import { MotionInspectorControls } from '../editor/MotionInspectorControls';
import { runtime } from '../editor/runtime';

// Referenced by Babel's classic JSX transform after linting.
void createElement;

const namespace = 'motion-for-wp';
const excludedBlocks = new Set( runtime.excludedBlocks || [] );
const supportedBlocks = new Set();

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

	return {
		...settings,
		attributes: {
			...settings.attributes,
			motion: { type: 'string', default: 'global' },
			duration: { type: 'string', default: '0' },
			delay: { type: 'string', default: '0' },
			easing: { type: 'string', default: 'none' },
			margin: { type: 'string', default: '0' },
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
					setAttributes={ props.setAttributes }
				/>
			</Fragment>
		);
	},
	'addAdvancedControls'
);

const addExtraProps = ( props, blockType, attributes ) => {
	if (
		! supportedBlocks.has( blockType.name ) ||
		attributes.motion === 'none' ||
		( attributes.motion === 'global' &&
			runtime.options?.default_animation === 'none' )
	) {
		return props;
	}

	const extraProps = {
		'data-motion': true,
		'data-motion-animation':
			attributes.motion === 'global'
				? runtime.options?.default_animation
				: attributes.motion,
	};

	if ( attributes.easing && attributes.easing !== 'none' ) {
		extraProps[ 'data-motion-easing' ] = attributes.easing;
	}
	if ( attributes.duration && attributes.duration !== '0' ) {
		extraProps[ 'data-motion-duration' ] = attributes.duration;
	}
	if ( attributes.delay && attributes.delay !== '0' ) {
		extraProps[ 'data-motion-delay' ] = attributes.delay;
	}
	if ( attributes.margin && attributes.margin !== '0' ) {
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
