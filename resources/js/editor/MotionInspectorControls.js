import { InspectorControls } from '@wordpress/block-editor';
import { Flex, Notice, SelectControl } from '@wordpress/components';
import { createElement, Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { MotionAnimationPreview } from './MotionAnimationPreview';
import { MotionOptionsMenu } from './MotionOptionsMenu';
import { MotionSettingControl } from './MotionSettingControl';
import {
	animationOptions,
	motionEnabled,
	previewsEnabled,
	runtime,
} from './runtime';
import { stopMotionPreview, useMotionPreview } from './use-motion-preview';

void createElement;

export function MotionInspectorControls( {
	attributes,
	clientId,
	setAttributes,
} ) {
	const [ visibleSettings, setVisibleSettings ] = useState( {} );
	const { motion, duration, delay, easing, margin } = attributes;
	const resolvedMotion =
		motion === 'global' ? runtime.options?.default_animation : motion;
	const hasAnimation = resolvedMotion !== 'none';
	const hasOverrides =
		duration !== '0' ||
		delay !== '0' ||
		easing !== 'none' ||
		margin !== '0';
	const { previewError, reducedMotion, replay, setPreviewError } =
		useMotionPreview(
			clientId,
			attributes,
			previewsEnabled && motionEnabled
		);
	const settings = [
		{
			key: 'duration',
			label: __( 'Duration', 'motion-for-wp' ),
			value: duration,
			defaultValue: '0',
		},
		{
			key: 'delay',
			label: __( 'Delay', 'motion-for-wp' ),
			value: delay,
			defaultValue: '0',
		},
		{
			key: 'easing',
			label: __( 'Easing', 'motion-for-wp' ),
			value: easing,
			defaultValue: 'none',
		},
		{
			key: 'margin',
			label: __( 'Viewport margin', 'motion-for-wp' ),
			value: margin,
			defaultValue: '0',
		},
	];
	const isSettingVisible = ( setting ) =>
		Boolean( visibleSettings[ setting.key ] ) ||
		setting.value !== setting.defaultValue;
	const toggleSetting = ( setting ) => {
		const isVisible = isSettingVisible( setting );

		setVisibleSettings( ( current ) => ( {
			...current,
			[ setting.key ]: ! isVisible,
		} ) );

		if ( isVisible ) {
			setAttributes( { [ setting.key ]: setting.defaultValue } );
		}
	};
	const resetOverrides = () => {
		stopMotionPreview( clientId );
		setVisibleSettings( {} );
		setAttributes( {
			duration: '0',
			delay: '0',
			easing: 'none',
			margin: '0',
		} );
	};
	const removeAnimation = () => {
		stopMotionPreview( clientId );
		setPreviewError( false );
		setVisibleSettings( {} );
		setAttributes( {
			motion: 'none',
			duration: '0',
			delay: '0',
			easing: 'none',
			margin: '0',
		} );
	};
	return (
		<InspectorControls>
			<div className="motion-for-wp-inspector">
				<Flex justify="space-between">
					<h2 className="motion-for-wp-inspector__title">
						{ __( 'Motion', 'motion-for-wp' ) }
					</h2>
					{ hasAnimation && (
						<MotionOptionsMenu
							settings={ settings }
							isSettingVisible={ isSettingVisible }
							toggleSetting={ toggleSetting }
							reducedMotion={ reducedMotion }
							hasOverrides={ hasOverrides }
							previewEnabled={ previewsEnabled && motionEnabled }
							onReplay={ replay }
							onReset={ resetOverrides }
						/>
					) }
				</Flex>
				<SelectControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={ __( 'Animation', 'motion-for-wp' ) }
					help={ __(
						'Choose how this block appears in the viewport.',
						'motion-for-wp'
					) }
					value={ motion }
					options={ animationOptions }
					onChange={ ( value ) =>
						value === 'none'
							? removeAnimation()
							: setAttributes( { motion: value } )
					}
				/>
				{ ! motionEnabled && (
					<Notice status="info" isDismissible={ false }>
						{ __(
							'Animations are globally disabled in Motion settings. Block configuration is preserved.',
							'motion-for-wp'
						) }
					</Notice>
				) }
				{ hasAnimation && (
					<Fragment>
						{ settings.map( ( setting ) =>
							isSettingVisible( setting ) ? (
								<MotionSettingControl
									key={ setting.key }
									settingKey={ setting.key }
									value={ setting.value }
									onChange={ ( value ) =>
										setAttributes( {
											[ setting.key ]: value,
										} )
									}
								/>
							) : null
						) }
					</Fragment>
				) }
				{ hasAnimation && previewsEnabled && motionEnabled && (
					<MotionAnimationPreview
						animationSlug={ resolvedMotion }
						duration={ duration }
						delay={ delay }
						easing={ easing }
						reducedMotion={ reducedMotion }
					/>
				) }
				{ reducedMotion &&
					hasAnimation &&
					previewsEnabled &&
					motionEnabled && (
						<Notice status="info" isDismissible={ false }>
							{ __(
								'Animation previews are disabled because reduced motion is enabled in your system settings.',
								'motion-for-wp'
							) }
						</Notice>
					) }
				{ previewError &&
					hasAnimation &&
					previewsEnabled &&
					motionEnabled && (
						<Notice status="warning" isDismissible={ false }>
							{ __(
								'The animation preview is unavailable for this block.',
								'motion-for-wp'
							) }
						</Notice>
					) }
			</div>
		</InspectorControls>
	);
}
