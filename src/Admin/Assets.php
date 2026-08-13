<?php
/**
 * Admin design system assets.
 *
 * @package MotionForWP
 */

declare( strict_types=1 );

namespace MotionForWP\Admin;

use MotionForWP\Contracts\Service;

/** Loads admin assets on the plugin settings screen. */
final class Assets implements Service {
	/**
	 * Registers WordPress hooks.
	 */
	public function register(): void {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
	}

	/**
	 * Loads branded styles only on the MotionForWP settings page.
	 *
	 * @param string $hook_suffix Current admin screen suffix.
	 */
	public function enqueue( string $hook_suffix ): void {
		if ( 'settings_page_motion_for_wp' !== $hook_suffix ) {
			return;
		}

		wp_enqueue_style(
			'motion-for-wp-admin-design-system',
			MOTION_FOR_WP_URL . 'resources/css/admin-design-system.css',
			array(),
			$this->version( 'resources/css/admin-design-system.css' )
		);

		wp_enqueue_style(
			'motion-for-wp-admin-theme',
			MOTION_FOR_WP_URL . 'resources/css/admin-theme.css',
			array( 'motion-for-wp-admin-design-system' ),
			$this->version( 'resources/css/admin-theme.css' )
		);
	}

	/**
	 * Returns a cache-busting version.
	 *
	 * @param string $relative_path Plugin-relative file path.
	 */
	private function version( string $relative_path ): string {
		$file_path = MOTION_FOR_WP_PATH . $relative_path;

		return is_readable( $file_path ) ? (string) filemtime( $file_path ) : MOTION_FOR_WP_VERSION;
	}
}
