import { SelectControl, TextControl } from '@wordpress/components';
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { easingOptions, globalValueHelp, runtime } from './runtime';

void createElement;

export function MotionSettingControl( { settingKey, value, onChange } ) {
	if ( settingKey === 'easing' ) {
		return (
			<SelectControl
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				label={ __( 'Easing', 'motion-for-wp' ) }
				value={ value }
				options={ easingOptions }
				onChange={ onChange }
			/>
		);
	}

	const controls = {
		duration: {
			label: __( 'Duration', 'motion-for-wp' ),
			globalValue: runtime.options?.duration ?? 0.5,
			step: 0.1,
			unit: 's',
		},
		delay: {
			label: __( 'Delay', 'motion-for-wp' ),
			globalValue: runtime.options?.delay ?? 0,
			step: 0.1,
			unit: 's',
		},
		margin: {
			label: __( 'Viewport margin', 'motion-for-wp' ),
			globalValue: runtime.options?.margin ?? 100,
			step: 1,
			unit: 'px',
		},
	};
	const control = controls[ settingKey ];

	return (
		<TextControl
			__next40pxDefaultSize
			__nextHasNoMarginBottom
			type="number"
			min={ 0 }
			step={ control.step }
			label={ control.label }
			help={ globalValueHelp( control.globalValue, control.unit ) }
			placeholder={ String( control.globalValue ) }
			value={ value === '0' ? '' : value }
			onChange={ ( nextValue ) => onChange( nextValue || '0' ) }
		/>
	);
}
