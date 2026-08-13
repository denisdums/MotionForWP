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
			esc_html__( 'Motion for WP', 'motion-for-wp' ),
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
			'motion_for_wp_easing',
			esc_html__( 'Easing', 'motion-for-wp' ),
			array( $this, 'render_easing_field' ),
			Options::OPTION_NAME,
			'motion_for_wp_defaults'
		);
	}

	/**
	 * Sanitizes and validates settings before storage.
	 *
	 * @param mixed $input Submitted option value.
	 * @return array<string, int|float|string>
	 */
	public function sanitize_options( $input ): array {
		$input   = is_array( $input ) ? $input : array();
		$easings = $this->catalog->get_easings();
		$easing  = isset( $input['easing'] ) ? sanitize_key( $input['easing'] ) : 'ease-in-out';

		if ( ! isset( $easings[ $easing ] ) ) {
			$easing = 'ease-in-out';
		}

		$sanitized = array(
			'duration' => $this->sanitize_number( $input['duration'] ?? 0.5, 0, 60, 0.5 ),
			'delay'    => $this->sanitize_number( $input['delay'] ?? 0, 0, 60, 0 ),
			'easing'   => $easing,
			'margin'   => (int) $this->sanitize_number( $input['margin'] ?? 100, 0, 1000, 100 ),
		);

		/**
		 * Fires after Motion for WP settings have been sanitized.
		 *
		 * @param array<string, int|float|string> $sanitized Sanitized settings.
		 * @param array<int, string>              $fields    Registered field names.
		 * @param array<string, mixed>            $input     Submitted settings data.
		 * @param Settings_Page                   $page      Settings page instance.
		 */
		do_action(
			'motion_for_wp_settings_sanitized',
			$sanitized,
			array( 'duration', 'delay', 'easing', 'margin' ),
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
			<div class="plugin-admin__hero">
				<div class="plugin-admin__hero-content">
					<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
					<p><?php echo esc_html__( 'Bring purposeful motion to the WordPress block editor.', 'motion-for-wp' ); ?></p>
				</div>
			</div>
			<?php settings_errors(); ?>
			<div class="postbox plugin-admin__panel is-active">
				<div class="inside plugin-admin__stack">
					<form action="options.php" method="post">
						<?php
						settings_fields( Options::OPTION_NAME );
						do_settings_sections( Options::OPTION_NAME );
						submit_button();
						?>
					</form>
				</div>
			</div>
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
