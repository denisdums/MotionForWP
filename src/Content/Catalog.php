<?php
/**
 * Animation catalog repository.
 *
 * @package MotionForWP
 */

declare( strict_types=1 );

namespace MotionForWP\Content;

/** Reads animation and easing definitions. */
final class Catalog {
	/**
	 * Returns the available animations.
	 *
	 * @return array<string, array<string, mixed>>
	 */
	public function get_animations(): array {
		$animations = $this->read_json_file( MOTION_FOR_WP_PATH . 'resources/animations/animations.json' );
		$animations = array_replace( $animations, $this->read_theme_file( 'animations.json' ) );
		$animations = $this->translate_names( $animations, $this->get_animation_names() );

		/**
		 * Filters the available animations.
		 *
		 * @param array<string, array<string, mixed>> $animations Animation definitions keyed by slug.
		 */
		$filtered = apply_filters( 'motion_for_wp/get_animations', $animations );

		return is_array( $filtered ) ? $filtered : $animations;
	}

	/**
	 * Returns the available easing functions.
	 *
	 * @return array<string, array<string, mixed>>
	 */
	public function get_easings(): array {
		$easings = $this->read_json_file( MOTION_FOR_WP_PATH . 'resources/animations/easings.json' );
		$easings = array_replace( $easings, $this->read_theme_file( 'easings.json' ) );
		$easings = $this->translate_names( $easings, $this->get_easing_names() );

		/**
		 * Filters the available easing definitions.
		 *
		 * @param array<string, array<string, mixed>> $easings Easing definitions keyed by slug.
		 */
		$filtered = apply_filters( 'motion_for_wp/get_easings', $easings );

		return is_array( $filtered ) ? $filtered : $easings;
	}

	/**
	 * Reads an optional catalog override from the active theme.
	 *
	 * @param string $file_name JSON filename.
	 * @return array<string, array<string, mixed>>
	 */
	private function read_theme_file( string $file_name ): array {
		return $this->read_json_file( trailingslashit( get_stylesheet_directory() ) . 'animations/' . $file_name );
	}

	/**
	 * Replaces catalog labels with translated labels when known.
	 *
	 * Theme-provided entries keep their authored name unless they reuse a core slug.
	 *
	 * @param array<string, array<string, mixed>> $catalog Catalog entries.
	 * @param array<string, string>               $names   Translated names by slug.
	 * @return array<string, array<string, mixed>>
	 */
	private function translate_names( array $catalog, array $names ): array {
		foreach ( $names as $slug => $name ) {
			if ( isset( $catalog[ $slug ] ) && is_array( $catalog[ $slug ] ) ) {
				$catalog[ $slug ]['name'] = $name;
			}
		}

		return $catalog;
	}

	/**
	 * Returns translated animation labels.
	 *
	 * @return array<string, string>
	 */
	private function get_animation_names(): array {
		return array(
			'none'                    => __( 'None', 'motion-for-wp' ),
			'fade-in'                 => __( 'Fade In', 'motion-for-wp' ),
			'slide-top'               => __( 'Slide from Top', 'motion-for-wp' ),
			'slide-bottom'            => __( 'Slide from Bottom', 'motion-for-wp' ),
			'slide-right'             => __( 'Slide from Right', 'motion-for-wp' ),
			'slide-left'              => __( 'Slide from Left', 'motion-for-wp' ),
			'rotate-right'            => __( 'Rotate Right', 'motion-for-wp' ),
			'rotate-left'             => __( 'Rotate Left', 'motion-for-wp' ),
			'rotate-translate-top'    => __( 'Rotate and Move Up', 'motion-for-wp' ),
			'rotate-translate-bottom' => __( 'Rotate and Move Down', 'motion-for-wp' ),
			'rotate-translate-right'  => __( 'Rotate and Move Right', 'motion-for-wp' ),
			'rotate-translate-left'   => __( 'Rotate and Move Left', 'motion-for-wp' ),
		);
	}

	/**
	 * Returns translated easing labels.
	 *
	 * @return array<string, string>
	 */
	private function get_easing_names(): array {
		return array(
			'none'        => __( 'None', 'motion-for-wp' ),
			'ease-in'     => __( 'Ease In', 'motion-for-wp' ),
			'ease-out'    => __( 'Ease Out', 'motion-for-wp' ),
			'ease-in-out' => __( 'Ease In Out', 'motion-for-wp' ),
			'ease'        => __( 'Ease', 'motion-for-wp' ),
			'linear'      => __( 'Linear', 'motion-for-wp' ),
		);
	}

	/**
	 * Safely reads a JSON object from disk.
	 *
	 * @param string $file_path Absolute JSON file path.
	 * @return array<string, array<string, mixed>>
	 */
	private function read_json_file( string $file_path ): array {
		if ( ! is_readable( $file_path ) ) {
			return array();
		}

		$content = file_get_contents( $file_path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- This is a validated local path, never a URL.

		if ( false === $content ) {
			return array();
		}

		$decoded = json_decode( $content, true );

		return is_array( $decoded ) ? $decoded : array();
	}
}
