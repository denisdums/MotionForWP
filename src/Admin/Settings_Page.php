<?php
/**
 * Settings page service.
 *
 * @package MotionForWP
 */

declare( strict_types=1 );

namespace MotionForWP\Admin;

use MotionForWP\Content\Catalog;
use MotionForWP\Contracts\Service;
use MotionForWP\Settings\Options;

/** Registers and renders the native WordPress settings page. */
final class Settings_Page implements Service {
	/**
	 * Animation catalog.
	 *
	 * @var Catalog
	 */
	private $catalog;

	/**
	 * Option repository.
	 *
	 * @var Options
	 */
	private $options;

	/**
	 * Creates the settings page service.
	 *
	 * @param Catalog $catalog Animation catalog.
	 * @param Options $options Option repository.
	 */
	public function __construct( Catalog $catalog, Options $options ) {
		$this->catalog = $catalog;
		$this->options = $options;
	}

	/**
	 * Registers WordPress hooks.
	 */
	public function register(): void {
		add_action( 'admin_menu', array( $this, 'register_page' ) );
		add_action( 'admin_init', array( $this, 'register_settings' ) );
	}

	/**
	 * Registers the settings menu page.
	 */
	public function register_page(): void {
		/**
		 * Filters whether the plugin settings menu is displayed.
		 *
		 * @param bool $display_menu Whether to display the menu.
		 */
		if ( ! apply_filters( 'motion_for_wp/display_menu', true ) ) {
			return;
		}

		add_options_page(
			esc_html__( 'MotionForWP', 'motion-for-wp' ),
			esc_html__( 'Motion', 'motion-for-wp' ),
			'manage_options',
			Options::OPTION_NAME,
			array( $this, 'render_page' )
		);
	}

	/**
	 * Registers the option, section, and fields with the Settings API.
	 */
	public function register_settings(): void {
		register_setting(
			Options::OPTION_NAME,
			Options::OPTION_NAME,
			array(
				'type'              => 'array',
				'default'           => array(),
				'sanitize_callback' => array( $this, 'sanitize_options' ),
			)
		);

		add_settings_section(
			'motion_for_wp_editor',
			esc_html__( 'Animation behavior', 'motion-for-wp' ),
			array( $this, 'render_editor_section' ),
			Options::OPTION_NAME
		);

		add_settings_field(
			'motion_for_wp_enabled',
			esc_html__( 'Plugin status', 'motion-for-wp' ),
			array( $this, 'render_enabled_field' ),
			Options::OPTION_NAME,
			'motion_for_wp_editor'
		);

		add_settings_field(
			'motion_for_wp_reduced_motion',
			esc_html__( 'Accessibility', 'motion-for-wp' ),
			array( $this, 'render_reduced_motion_field' ),
			Options::OPTION_NAME,
			'motion_for_wp_editor'
		);

		add_settings_field(
			'motion_for_wp_preview_enabled',
			esc_html__( 'Block previews', 'motion-for-wp' ),
			array( $this, 'render_preview_field' ),
			Options::OPTION_NAME,
			'motion_for_wp_editor'
		);

		add_settings_field(
			'motion_for_wp_repeat',
			esc_html__( 'Playback', 'motion-for-wp' ),
			array( $this, 'render_repeat_field' ),
			Options::OPTION_NAME,
			'motion_for_wp_editor'
		);

		add_settings_section(
			'motion_for_wp_defaults',
			esc_html__( 'Animation defaults', 'motion-for-wp' ),
			array( $this, 'render_section' ),
			Options::OPTION_NAME
		);

		$fields = array(
			'duration' => array(
				'label' => __( 'Duration', 'motion-for-wp' ),
				'min'   => 0,
				'max'   => 60,
				'step'  => 0.1,
			),
			'delay'    => array(
				'label' => __( 'Delay', 'motion-for-wp' ),
				'min'   => 0,
				'max'   => 60,
				'step'  => 0.1,
			),
			'margin'   => array(
				'label' => __( 'Viewport margin', 'motion-for-wp' ),
				'min'   => 0,
				'max'   => 1000,
				'step'  => 1,
			),
		);

		foreach ( $fields as $field_name => $field ) {
			add_settings_field(
				'motion_for_wp_' . $field_name,
				$field['label'],
				array( $this, 'render_number_field' ),
				Options::OPTION_NAME,
				'motion_for_wp_defaults',
				array_merge( $field, array( 'name' => $field_name ) )
			);
		}

		add_settings_field(
			'motion_for_wp_default_animation',
			esc_html__( 'Default animation', 'motion-for-wp' ),
			array( $this, 'render_default_animation_field' ),
			Options::OPTION_NAME,
			'motion_for_wp_defaults'
		);

		add_settings_field(
			'motion_for_wp_easing',
			esc_html__( 'Easing', 'motion-for-wp' ),
			array( $this, 'render_easing_field' ),
			Options::OPTION_NAME,
			'motion_for_wp_defaults'
		);

		add_settings_field(
			'motion_for_wp_threshold',
			esc_html__( 'Visibility threshold', 'motion-for-wp' ),
			array( $this, 'render_number_field' ),
			Options::OPTION_NAME,
			'motion_for_wp_defaults',
			array(
				'name' => 'threshold',
				'min'  => 0,
				'max'  => 100,
				'step' => 1,
			)
		);
	}

	/**
	 * Sanitizes and validates settings before storage.
	 *
	 * @param mixed $input Submitted option value.
	 * @return array<string, bool|int|float|string>
	 */
	public function sanitize_options( $input ): array {
		$input             = is_array( $input ) ? $input : array();
		$easings           = $this->catalog->get_easings();
		$animations        = $this->catalog->get_animations();
		$easing            = isset( $input['easing'] ) ? sanitize_key( $input['easing'] ) : 'ease-in-out';
		$default_animation = isset( $input['default_animation'] ) ? sanitize_key( $input['default_animation'] ) : 'none';
		$repeat            = isset( $input['repeat'] ) ? sanitize_key( $input['repeat'] ) : 'once';

		if ( ! isset( $easings[ $easing ] ) ) {
			$easing = 'ease-in-out';
		}
		if ( ! isset( $animations[ $default_animation ] ) ) {
			$default_animation = 'none';
		}
		if ( ! in_array( $repeat, array( 'once', 'always' ), true ) ) {
			$repeat = 'once';
		}

		$sanitized = array(
			'enabled'           => ! empty( $input['enabled'] ),
			'reduced_motion'    => ! empty( $input['reduced_motion'] ),
			'preview_enabled'   => ! empty( $input['preview_enabled'] ),
			'repeat'            => $repeat,
			'default_animation' => $default_animation,
			'duration'          => $this->sanitize_number( $input['duration'] ?? 0.5, 0, 60, 0.5 ),
			'delay'             => $this->sanitize_number( $input['delay'] ?? 0, 0, 60, 0 ),
			'easing'            => $easing,
			'margin'            => (int) $this->sanitize_number( $input['margin'] ?? 100, 0, 1000, 100 ),
			'threshold'         => (int) $this->sanitize_number( $input['threshold'] ?? 0, 0, 100, 0 ),
		);

		/**
		 * Fires after MotionForWP settings have been sanitized.
		 *
		 * @param array<string, int|float|string> $sanitized Sanitized settings.
		 * @param array<int, string>              $fields    Registered field names.
		 * @param array<string, mixed>            $input     Submitted settings data.
		 * @param Settings_Page                   $page      Settings page instance.
		 */
		do_action(
			'motion_for_wp_settings_sanitized',
			$sanitized,
			array(
				'enabled',
				'reduced_motion',
				'preview_enabled',
				'repeat',
				'default_animation',
				'duration',
				'delay',
				'easing',
				'margin',
				'threshold',
			),
			$input,
			$this
		);

		return $sanitized;
	}

	/**
	 * Renders the settings page.
	 */
	public function render_page(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		?>
		<div class="wrap plugin-admin plugin-admin--motion-for-wp">
			<h1 class="screen-reader-text"><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<div class="plugin-admin__hero">
				<div class="plugin-admin__hero-content">
					<div class="plugin-admin__hero-title" aria-hidden="true"><?php echo esc_html( get_admin_page_title() ); ?></div>
					<p><?php echo esc_html__( 'Bring purposeful motion to the WordPress block editor.', 'motion-for-wp' ); ?></p>
				</div>
				<div class="plugin-admin__logo-frame" aria-hidden="true">
					<img
						class="plugin-admin__logo"
						src="<?php echo esc_url( MOTION_FOR_WP_URL . 'resources/icons/motion-logo.svg' ); ?>"
						alt=""
						width="180"
						height="180"
					/>
				</div>
			</div>
			<form action="options.php" method="post" class="plugin-admin__settings-form">
				<?php settings_fields( Options::OPTION_NAME ); ?>
				<div class="plugin-admin__settings-grid">
					<section class="postbox plugin-admin__panel plugin-admin__panel--editor is-active" aria-labelledby="motion-for-wp-editor-title">
						<div class="postbox-header">
							<h2 id="motion-for-wp-editor-title" class="hndle"><?php echo esc_html__( 'Animation behavior', 'motion-for-wp' ); ?></h2>
						</div>
						<div class="inside">
							<?php $this->render_editor_section(); ?>
							<table class="form-table" role="presentation">
								<?php do_settings_fields( Options::OPTION_NAME, 'motion_for_wp_editor' ); ?>
							</table>
						</div>
					</section>
					<section class="postbox plugin-admin__panel is-active" aria-labelledby="motion-for-wp-defaults-title">
						<div class="postbox-header">
							<h2 id="motion-for-wp-defaults-title" class="hndle"><?php echo esc_html__( 'Animation defaults', 'motion-for-wp' ); ?></h2>
						</div>
						<div class="inside">
							<?php $this->render_section(); ?>
							<table class="form-table" role="presentation">
								<?php do_settings_fields( Options::OPTION_NAME, 'motion_for_wp_defaults' ); ?>
							</table>
						</div>
					</section>
				</div>
				<div class="plugin-admin__actions">
					<?php submit_button( __( 'Save settings', 'motion-for-wp' ), 'primary', 'submit', false ); ?>
				</div>
			</form>
		</div>
		<?php
	}

	/**
	 * Renders the settings section description.
	 */
	public function render_section(): void {
		echo '<p>' . esc_html__( 'Set the default parameters used when a block does not define its own values.', 'motion-for-wp' ) . '</p>';
	}

	/**
	 * Renders the editor preview section description.
	 */
	public function render_editor_section(): void {
		echo '<p>' . esc_html__( 'Control animations globally, accessibility preferences, playback, and editor previews.', 'motion-for-wp' ) . '</p>';
	}

	/** Renders the global plugin toggle. */
	public function render_enabled_field(): void {
		$this->render_checkbox_field(
			'enabled',
			__( 'Enable animations on the site', 'motion-for-wp' ),
			__( 'Turn off all frontend animations without deleting the settings stored on blocks.', 'motion-for-wp' )
		);
	}

	/** Renders the reduced-motion preference toggle. */
	public function render_reduced_motion_field(): void {
		$this->render_checkbox_field(
			'reduced_motion',
			__( 'Respect the visitor’s reduced-motion preference', 'motion-for-wp' ),
			__( 'Recommended. Animations are skipped when the operating system requests reduced motion.', 'motion-for-wp' )
		);
	}

	/**
	 * Renders the editor preview toggle.
	 */
	public function render_preview_field(): void {
		$this->render_checkbox_field(
			'preview_enabled',
			__( 'Enable animation previews in the block editor', 'motion-for-wp' ),
			__( 'When disabled, illustrative previews and replay actions are hidden. Frontend animations remain active.', 'motion-for-wp' )
		);
	}

	/** Renders the global repeat behavior. */
	public function render_repeat_field(): void {
		$options = $this->options->get();
		$current = $options['repeat'] ?? 'once';
		?>
		<select name="<?php echo esc_attr( Options::OPTION_NAME . '[repeat]' ); ?>">
			<option value="once" <?php selected( $current, 'once' ); ?>>
				<?php echo esc_html__( 'Play once', 'motion-for-wp' ); ?>
			</option>
			<option value="always" <?php selected( $current, 'always' ); ?>>
				<?php echo esc_html__( 'Replay each time the block enters the viewport', 'motion-for-wp' ); ?>
			</option>
		</select>
		<p class="description"><?php echo esc_html__( 'Controls whether an animation may run again after leaving the viewport.', 'motion-for-wp' ); ?></p>
		<?php
	}

	/** Renders the default animation selector. */
	public function render_default_animation_field(): void {
		$options = $this->options->get();
		$current = $options['default_animation'] ?? 'none';
		?>
		<select name="<?php echo esc_attr( Options::OPTION_NAME . '[default_animation]' ); ?>">
			<?php foreach ( $this->catalog->get_animations() as $slug => $animation ) : ?>
				<option value="<?php echo esc_attr( $slug ); ?>" <?php selected( $current, $slug ); ?>>
					<?php echo esc_html( $animation['name'] ?? $slug ); ?>
				</option>
			<?php endforeach; ?>
		</select>
		<p class="description"><?php echo esc_html__( 'Applied when a supported block does not define its own animation. “None” preserves the current opt-in behavior.', 'motion-for-wp' ); ?></p>
		<?php
	}

	/**
	 * Renders a numeric setting.
	 *
	 * @param array<string, int|float|string> $args Field arguments.
	 */
	public function render_number_field( array $args ): void {
		$options = $this->options->get();
		$name    = sanitize_key( (string) $args['name'] );
		$value   = $options[ $name ] ?? ( 'duration' === $name ? 0.5 : ( 'margin' === $name ? 100 : 0 ) );
		?>
		<input
			type="number"
			class="small-text"
			name="<?php echo esc_attr( Options::OPTION_NAME . '[' . $name . ']' ); ?>"
			value="<?php echo esc_attr( (string) $value ); ?>"
			min="<?php echo esc_attr( (string) $args['min'] ); ?>"
			max="<?php echo esc_attr( (string) $args['max'] ); ?>"
			step="<?php echo esc_attr( (string) $args['step'] ); ?>"
		/>
		<?php if ( 'duration' === $name || 'delay' === $name ) : ?>
			<span class="plugin-admin__unit"><?php echo esc_html_x( 'seconds', 'time unit', 'motion-for-wp' ); ?></span>
		<?php elseif ( 'margin' === $name ) : ?>
			<span class="plugin-admin__unit"><?php echo esc_html_x( 'pixels', 'length unit', 'motion-for-wp' ); ?></span>
		<?php elseif ( 'threshold' === $name ) : ?>
			<span class="plugin-admin__unit">%</span>
			<p class="description"><?php echo esc_html__( 'Percentage of the block that must be visible before its animation starts. Zero starts as soon as it enters the viewport.', 'motion-for-wp' ); ?></p>
		<?php endif; ?>
		<?php
	}

	/**
	 * Renders the easing selector.
	 */
	public function render_easing_field(): void {
		$options = $this->options->get();
		$current = $options['easing'] ?? 'ease-in-out';
		?>
		<select name="<?php echo esc_attr( Options::OPTION_NAME . '[easing]' ); ?>">
			<?php foreach ( $this->catalog->get_easings() as $slug => $easing ) : ?>
				<option value="<?php echo esc_attr( $slug ); ?>" <?php selected( $current, $slug ); ?>>
					<?php echo esc_html( $easing['name'] ?? $slug ); ?>
				</option>
			<?php endforeach; ?>
		</select>
		<?php
	}

	/**
	 * Renders a checkbox with consistent help text.
	 *
	 * @param string $name        Option key.
	 * @param string $label       Checkbox label.
	 * @param string $description Help text.
	 */
	private function render_checkbox_field( string $name, string $label, string $description ): void {
		$options = $this->options->get();
		$id      = 'motion-for-wp-' . str_replace( '_', '-', $name );
		?>
		<label for="<?php echo esc_attr( $id ); ?>">
			<input
				type="checkbox"
				id="<?php echo esc_attr( $id ); ?>"
				name="<?php echo esc_attr( Options::OPTION_NAME . '[' . $name . ']' ); ?>"
				value="1"
				<?php checked( ! empty( $options[ $name ] ) ); ?>
			/>
			<?php echo esc_html( $label ); ?>
		</label>
		<p class="description"><?php echo esc_html( $description ); ?></p>
		<?php
	}

	/**
	 * Clamps a numeric value to an allowed range.
	 *
	 * @param mixed     $value Submitted value.
	 * @param int|float $min   Minimum value.
	 * @param int|float $max   Maximum value.
	 * @param int|float $fallback Value returned for a non-numeric input.
	 * @return int|float
	 */
	private function sanitize_number( $value, $min, $max, $fallback ) {
		$value = is_numeric( $value ) ? (float) $value : (float) $fallback;

		return min( (float) $max, max( (float) $min, $value ) );
	}
}
