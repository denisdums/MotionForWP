<?php
/**
 * Animation option repository.
 *
 * @package MotionForWP
 */

declare( strict_types=1 );

namespace MotionForWP\Settings;

/** Provides the public animation option contract. */
final class Options {
	public const OPTION_NAME = 'motion_for_wp';

	/**
	 * Returns the stored animation defaults.
	 *
	 * @return array<string, mixed>
	 */
	public function get(): array {
		$options = get_option( self::OPTION_NAME, array() );
		$options = is_array( $options ) ? $options : array();

		// Keep installations created before preview modes backward compatible.
		if ( ! isset( $options['preview_mode'] ) ) {
			$options['preview_mode'] = isset( $options['preview_enabled'] ) && false === $options['preview_enabled'] ? 'disabled' : 'automatic';
		}
		$options = wp_parse_args( $options, self::defaults() );

		/**
		 * Filters animation defaults exposed by MotionForWP.
		 *
		 * @param array<string, mixed> $options Animation options.
		 */
		$filtered = apply_filters( 'motion_for_wp/get_options', $options );

		return is_array( $filtered ) ? $filtered : $options;
	}

	/**
	 * Returns the stable option defaults.
	 *
	 * @return array<string, bool|int|float|string>
	 */
	public static function defaults(): array {
		return array(
			'enabled'           => true,
			'reduced_motion'    => true,
			'preview_enabled'   => true,
			'preview_mode'      => 'automatic',
			'repeat'            => 'once',
			'mobile_behavior'   => 'same',
			'concurrent_limit'  => 0,
			'stagger_enabled'   => false,
			'stagger_delay'     => 0.1,
			'default_animation' => 'none',
			'duration'          => 0.5,
			'delay'             => 0,
			'easing'            => 'ease-in-out',
			'margin'            => 100,
			'threshold'         => 0,
		);
	}
}
