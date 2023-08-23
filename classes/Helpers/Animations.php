<?php

namespace MotionForWP\Helpers;

class Animations
{
	public static function getAll(): array
	{
		if (!defined('MOTION_FOR_WP_DIR')) {
			return [];
		}

		$animationsContentRaw = file_get_contents(MOTION_FOR_WP_DIR . '/resources/animations/animations.json');
		$animationsContent = json_decode($animationsContentRaw, true);
		return apply_filters('motion_for_wp/get_animations', $animationsContent);
	}
}
