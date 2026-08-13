<?php
/**
 * Block registration service.
 *
 * @package MotionForWP
 */

declare( strict_types=1 );

namespace MotionForWP;

use MotionForWP\Contracts\Service;

/** Registers the plugin's block types and block category. */
final class Blocks implements Service {
	/**
	 * Registers WordPress hooks.
	 */
	public function register(): void {
		add_action( 'init', array( $this, 'register_block_types' ) );
		add_filter( 'block_categories_all', array( $this, 'register_block_category' ) );
	}

	/**
	 * Registers every compiled block metadata directory.
	 */
	public function register_block_types(): void {
		$metadata_files = glob( MOTION_FOR_WP_PATH . 'dist/blocks/*/block.json' );

		if ( false === $metadata_files ) {
			return;
		}

		foreach ( $metadata_files as $metadata_file ) {
			register_block_type( dirname( $metadata_file ) );
		}
	}

	/**
	 * Adds the plugin's block category.
	 *
	 * @param array<int, array<string, mixed>> $categories Existing block categories.
	 * @return array<int, array<string, mixed>>
	 */
	public function register_block_category( array $categories ): array {
		$categories[] = array(
			'slug'  => 'motion-for-wp',
			'title' => __( 'Motion For WP', 'motion-for-wp' ),
			'icon'  => 'wordpress',
		);

		return $categories;
	}
}
