<?php

namespace MotionForGutenberg\Helpers;

class Options
{
	public static function getAll(): array
	{
		$options = get_option('motion_for_gutenberg') ?: [];
		return apply_filters('motion_for_gutenberg/get_options', $options);
	}
}
