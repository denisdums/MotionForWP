<?php
/**
 * Translation registration service.
 *
 * @package MotionForWP
 */

declare( strict_types=1 );

namespace MotionForWP;

use MotionForWP\Contracts\Service;

/** Registers the plugin translations. */
final class I18n implements Service {
	/**
	 * Registers WordPress hooks.
	 */
	public function register(): void {
		add_action( 'init', array( $this, 'load_textdomain' ) );
	}

	/**
	 * Registers the bundled translation directory.
	 */
	public function load_textdomain(): void {
		load_plugin_textdomain(
			'motion-for-wp',
			false,
			dirname( plugin_basename( MOTION_FOR_WP_FILE ) ) . '/languages'
		);
	}
}
