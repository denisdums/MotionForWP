<?php
/**
 * Public catalog REST controller.
 *
 * @package MotionForWP
 */

declare( strict_types=1 );

namespace MotionForWP\Rest;

use MotionForWP\Content\Catalog;
use MotionForWP\Contracts\Service;
use MotionForWP\Settings\Options;
use WP_REST_Response;
use WP_REST_Server;

/** Preserves the plugin's public, read-only REST API. */
final class Controller implements Service {
	private const NAMESPACE = 'motion-for-wp/v1';

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
	 * Creates the REST controller.
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
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Registers the public, read-only catalog routes.
	 */
	public function register_routes(): void {
		$routes = array(
			'/animations' => array( $this, 'get_animations' ),
			'/easings'    => array( $this, 'get_easings' ),
			'/options'    => array( $this, 'get_options' ),
		);

		foreach ( $routes as $route => $callback ) {
			register_rest_route(
				self::NAMESPACE,
				$route,
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => $callback,
					'permission_callback' => '__return_true',
				)
			);
		}
	}

	/**
	 * Returns animation definitions.
	 */
	public function get_animations(): WP_REST_Response {
		return rest_ensure_response( $this->catalog->get_animations() );
	}

	/**
	 * Returns easing definitions.
	 */
	public function get_easings(): WP_REST_Response {
		return rest_ensure_response( $this->catalog->get_easings() );
	}

	/**
	 * Returns public animation defaults.
	 */
	public function get_options(): WP_REST_Response {
		return rest_ensure_response( $this->options->get() );
	}
}
