<?php
/**
 * Plugin orchestrator.
 *
 * @package MotionForWP
 */

declare( strict_types=1 );

namespace MotionForWP;

use MotionForWP\Admin\Settings_Page;
use MotionForWP\Admin\Assets as Admin_Assets;
use MotionForWP\Content\Catalog;
use MotionForWP\Contracts\Service;
use MotionForWP\Rest\Controller;
use MotionForWP\Settings\Options;

/** Composes and boots the plugin services. */
final class Plugin {
	/**
	 * Boots all plugin services.
	 */
	public static function boot(): void {
		$catalog = new Catalog();
		$options = new Options();

		$services = array(
			new I18n(),
			new Admin_Assets(),
			new Blocks(),
			new Assets( $catalog, $options ),
			new Settings_Page( $catalog, $options ),
			new Controller( $catalog, $options ),
		);

		foreach ( $services as $service ) {
			if ( $service instanceof Service ) {
				$service->register();
			}
		}
	}
}
