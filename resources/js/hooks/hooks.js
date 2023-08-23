const {Fragment, Component} = wp.element;
const {__} = wp.i18n;
const {createHigherOrderComponent} = wp.compose;
const {InspectorControls} = wp.blockEditor;
const {BaseControl, Button, ButtonGroup, ComboboxControl, PanelBody, TextControl} = wp.components;

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
            return class BlockEditWithMotion extends Component {
                constructor(props) {
                    super(props);

                    this.state = {
                        availableAnimations: [],
                        availableEasings: [],
                    };
                }

                componentDidMount() {
                    const animations = Object.keys(motionForGutenbergAnimations).map(key => {
                        const animation = motionForGutenbergAnimations[key];
                        return {
                            label: __(animation.name, 'motion-for-gutenberg'),
                            value: key
                        }
                    });

                    const easings = Object.keys(motionForGutenbergEasings).map(key => {
                        const easing = motionForGutenbergEasings[key];
                        return {
                            label: __(easing.name, 'motion-for-gutenberg'),
                            value: key
                        }
                    });

                    this.setState({
                        availableAnimations: animations,
                        availableEasings: easings,
                        isDataLoaded: true
                    });
                };

                render() {
                    const {attributes, setAttributes} = this.props;
                    const {motion, duration, delay, easing, margin} = attributes;
                    const handleReset = () => {
                        setAttributes({
                            motion: 'none',
                            duration: undefined,
                            delay: undefined,
                            easing: 'ease-out',
                            margin: undefined
                        });
                    };

                    return (
                        <Fragment>
                            <BlockEdit {...this.props} />

                            <InspectorControls>
                                <PanelBody title={__('Motion', 'motion-for-gutenberg')}>
                                    <BaseControl>
                                        <ComboboxControl
                                            label={__('Animation', 'motion-for-gutenberg')}
                                            value={motion}
                                            options={this.state.availableAnimations}
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
                                            options={this.state.availableEasings}
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
                }
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
                } else {
                    delete props['data-motion-margin']
                }
            }
            return props;
        }
    }
}
