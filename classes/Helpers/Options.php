<?php

namespace MotionForWP\Helpers;

class Options
{
	public static function getAll(): array
	{
		$options = get_option('motion_for_wp') ?: [];
		return apply_filters('motion_for_wp/get_options', $options);
	}
}
