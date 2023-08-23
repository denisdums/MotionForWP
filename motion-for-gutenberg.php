<?php

use MotionForGutenberg\API;
use MotionForGutenberg\Assets;
use MotionForGutenberg\Blocks;
use MotionForGutenberg\Options;
use MotionForGutenberg\Translations;

/**
 * Plugin Name:       Motion For Gutenberg
 * Description:       Put the magic of motion in your Gutenberg blocks.
 * Requires at least: 5.7
 * Requires PHP:      7.4
 * Version:           0.9.0
 * Author:            denisdums
 * Author URI:        https://denisdums.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       motion-for-gutenberg
 *
 * @package           motion-for-gutenberg
 */


class MotionForGutenberg
{
	public function boot(): void
	{
		$this->setConstants();
		$this->registerAutoload();

		Blocks::boot();
		API::boot();
		Assets::boot();
		Options::boot();
        Translations::boot();
	}

	public function setConstants(): void
	{
		define('MOTION_FOR_GUTENBERG_DIR', plugin_dir_path(__FILE__));
		define('MOTION_FOR_GUTENBERG_URL', plugin_dir_url(__FILE__));
		define('MOTION_FOR_GUTENBERG_TEXT_DOMAIN', 'motion-for-gutenberg');
	}

	public function registerAutoload(): void
	{
		require_once MOTION_FOR_GUTENBERG_DIR . '/vendor/autoload.php';
	}
}

$motionForGutenberg = new MotionForGutenberg();
$motionForGutenberg->boot();
