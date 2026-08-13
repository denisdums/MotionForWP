<?php
/**
 * Unit test bootstrap.
 *
 * @package MotionForWP
 */

declare( strict_types=1 );

spl_autoload_register(
	static function ( string $class_name ): void {
		$namespace = 'MotionForWP\\';

		if ( 0 !== strncmp( $class_name, $namespace, strlen( $namespace ) ) ) {
			return;
		}

		$relative_class = substr( $class_name, strlen( $namespace ) );
		$class_file     = dirname( __DIR__ ) . '/src/' . str_replace( '\\', '/', $relative_class ) . '.php';

		if ( is_readable( $class_file ) ) {
			require_once $class_file;
		}
	}
);
