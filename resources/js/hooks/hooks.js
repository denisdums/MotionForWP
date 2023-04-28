import {__} from "@wordpress/i18n";
import {Fragment, useEffect, useState} from "@wordpress/element";
import {InspectorControls} from "@wordpress/block-editor";
import {createHigherOrderComponent} from "@wordpress/compose";
import {BaseControl, Button, ButtonGroup, ComboboxControl, PanelBody, TextControl} from "@wordpress/components";
import {flipHorizontal} from "@wordpress/icons";


export function motionHooks() {
	return {
		namespace: 'motion-for-gutenberg',

		register() {
			this.bind();
			this.addFilters();
		},

		bind() {
			this.addFilters = this.addFilters.bind(this);
			this.addAttributes = this.addAttributes.bind(this);
			this.addAdvancedControls = this.addAdvancedControls.bind(this);
			this.addExtraProps = this.addExtraProps.bind(this);
		},

		addFilters() {
			wp.hooks.addFilter(
				'blocks.registerBlockType',
				`${this.namespace}/custom-attributes`,
				this.addAttributes
			);

			wp.hooks.addFilter(
				'editor.BlockEdit',
				`${this.namespace}/advanced-control`,
				this.addAdvancedControls
			);

			wp.hooks.addFilter(
				'blocks.getSaveContent.extraProps',
				`${this.namespace}/extra-props`,
				this.addExtraProps
			);
		},

		addAttributes(settings, name) {
			settings.attributes = {
				...settings.attributes,
				motion: {
					type: 'string',
					default: 'none'
				},
				duration: {
					type: 'string',
					default: '0'
				},
				delay: {
					type: 'string',
					default: '0'
				},
				easing: {
					type: 'string',
					default: 'none'
				},
				margin: {
					type: 'string',
					default: '0'
				}
			};

			return settings;
		},

		addAdvancedControls: createHigherOrderComponent((BlockEdit) => {
			return (props) => {
				const [availableAnimations, setAvailableAnimations] = useState([]);
				const [availableEasings, setAvailableEasings] = useState([]);

				const {attributes, setAttributes} = props;
				const {motion, duration, delay, easing, margin} = attributes;
				const handleReset = () => {
					setAttributes({
						motion: 'none',
						duration: 0,
						delay: 0,
						easing: 'ease-out',
						margin: 0
					});
				};

				useEffect(() => {
					fetch('/wp-json/motion-for-gutenberg/v1/animations')
						.then(response => response.json())
						.then(data => {
							setAvailableAnimations(Object.keys(data).map(key => {
								const animation = data[key];
								return {
									label: __(animation.name, 'motion-for-gutenberg'),
									value: key
								}
							}));
						});

					fetch('/wp-json/motion-for-gutenberg/v1/easings')
						.then(response => response.json())
						.then(data => {
							setAvailableEasings(Object.keys(data).map(key => {
								const easing = data[key];
								return {
									label: __(easing.name, 'motion-for-gutenberg'),
									value: key
								}
							}));
						});
				}, []);

				return (
					<Fragment>
						<BlockEdit {...props} />
						<InspectorControls>
							<PanelBody title={__('Motion', 'motion-for-gutenberg')} icon={flipHorizontal}>
								<BaseControl>
									<ComboboxControl
										label={__('Animation', 'motion-for-gutenberg')}
										value={motion}
										options={availableAnimations}
										onChange={(value) => setAttributes({motion: value})}
									/>
								</BaseControl>
								<TextControl type={'number'}
											 min={0}
											 step={0.1}
											 label={__('Duration (in seconds)', 'motion-for-gutenberg')}
											 value={duration}
											 onChange={(value) => setAttributes({duration: value})}
								/>
								<TextControl type={'number'}
											 min={0}
											 step={0.1}
											 label={__('Delay (in seconds)', 'motion-for-gutenberg')}
											 value={delay}
											 onChange={(value) => setAttributes({delay: value})}
								/>
								<BaseControl>
									<ComboboxControl
										options={availableEasings}
										label={__('Easing', 'motion-for-gutenberg')}
										value={easing}
										onChange={(value) => setAttributes({easing: value})}
									/>
								</BaseControl>
								<TextControl type={'number'}
											 min={0}
											 step={1}
											 label={__('Margin (in pixels)', 'motion-for-gutenberg')}
											 value={margin}
											 onChange={(value) => setAttributes({margin: value})}
								/>
								<ButtonGroup>
									<Button onClick={() => handleReset()}>
										{__('Reset Motion', 'motion-for-gutenberg')}
									</Button>
								</ButtonGroup>
							</PanelBody>
						</InspectorControls>
					</Fragment>
				);
			};
		}, 'addAdvancedControls'),

		addExtraProps(props, blockType, attributes) {
			if (attributes.motion === 'none') {
				delete props['data-motion']
				delete props['data-motion-animation']
				delete props['data-motion-duration']
				delete props['data-motion-delay']
				delete props['data-motion-easing']
				delete props['data-motion-margin']
			} else {
				props['data-motion'] = true;
				props['data-motion-animation'] = attributes.motion;

				if (attributes.easing !== 'none') {
					props['data-motion-easing'] = attributes.easing;
				} else {
					delete props['data-motion-easing']
				}

				if (attributes.duration !== '0') {
					props['data-motion-duration'] = attributes.duration;
				} else {
					delete props['data-motion-duration']
				}

				if (attributes.delay !== '0') {
					props['data-motion-delay'] = attributes.delay;
				} else {
					delete props['data-motion-delay']
				}

				if (attributes.margin !== '0') {
					props['data-motion-margin'] = attributes.margin;
				}else {
					delete props['data-motion-margin']
				}
			}
			return props;
		}
	}
}
