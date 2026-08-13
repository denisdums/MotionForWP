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
			'repeat'            => 'once',
			'default_animation' => 'none',
			'duration'          => 0.5,
			'delay'             => 0,
			'easing'            => 'ease-in-out',
			'margin'            => 100,
			'threshold'         => 0,
		);
	}
}
