<?php

namespace MotionForWP\Helpers;

class
Easings
{
	public static function getAll(): array
	{
		if (!defined('MOTION_FOR_WP_DIR')) {
			return [];
		}

		$easingsContentRaw = file_get_contents(MOTION_FOR_WP_DIR . '/resources/animations/easings.json');
		$easingsContent = json_decode($easingsContentRaw, true);
		return apply_filters('motion_for_wp/get_easings', $easingsContent);
	}
}
