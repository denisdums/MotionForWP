<?php

use MotionForWP\API;
use MotionForWP\Assets;
use MotionForWP\Blocks;
use MotionForWP\ConfigFiles;
use MotionForWP\Options;
use MotionForWP\Translations;

/**
 * Plugin Name:       Motion For WP
 * Description:       Put the magic of motion in your Gutenberg blocks.
 * Requires at least: 5.7
 * Requires PHP:      7.4
 * Version:           0.9.0
 * Author:            denisdums
 * Author URI:        https://denisdums.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       motion-for-wp
 *
 * @package           motion-for-wp
 */


class MotionForWP
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
        ConfigFiles::boot();
	}

	public function setConstants(): void
	{
		define('MOTION_FOR_WP_DIR', plugin_dir_path(__FILE__));
		define('MOTION_FOR_WP_URL', plugin_dir_url(__FILE__));
		define('MOTION_FOR_WP_TEXT_DOMAIN', 'motion-for-wp');
	}

	public function registerAutoload(): void
	{
		require_once MOTION_FOR_WP_DIR . '/vendor/autoload.php';
	}
}

$motionForWP = new MotionForWP();
$motionForWP->boot();
