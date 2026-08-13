<?php
/**
 * Plugin Name:       MotionForWP
 * Description:       Put the magic of motion in your Gutenberg blocks.
 * Requires at least: 6.3
 * Requires PHP:      7.4
 * Version:           0.11.0
 * Author:            denisdums
 * Author URI:        https://denisdums.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       motion-for-wp
 * Domain Path:       /languages
 *
 * @package MotionForWP
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MOTION_FOR_WP_VERSION', '0.11.0' );
define( 'MOTION_FOR_WP_FILE', __FILE__ );
define( 'MOTION_FOR_WP_PATH', plugin_dir_path( __FILE__ ) );
define( 'MOTION_FOR_WP_URL', plugin_dir_url( __FILE__ ) );

// Backward-compatible aliases used by legacy integrations.
define( 'MOTION_FOR_WP_DIR', MOTION_FOR_WP_PATH );
define( 'MOTION_FOR_WP_TEXT_DOMAIN', 'motion-for-wp' );

spl_autoload_register(
	static function ( string $class_name ): void {
		$namespace = 'MotionForWP\\';

		if ( 0 !== strncmp( $class_name, $namespace, strlen( $namespace ) ) ) {
			return;
		}

		$relative_class = substr( $class_name, strlen( $namespace ) );
		$class_file     = MOTION_FOR_WP_PATH . 'src/' . str_replace( '\\', '/', $relative_class ) . '.php';

		if ( is_readable( $class_file ) ) {
			require_once $class_file;
		}
	}
);

MotionForWP\Plugin::boot();
