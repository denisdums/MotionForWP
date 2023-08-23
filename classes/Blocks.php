<?php

namespace MotionForWP;

class Blocks extends BootLoadClass
{
	public function register(): void
	{
		add_action('block_categories_all', [$this, 'registerBlockCategory']);
		add_action('init', [$this, 'registerBlockTypes']);
	}

	public function registerBlockTypes(): void
	{
		if (!defined('MOTION_FOR_WP_DIR')) return;
		$gutenbergBuildDir = MOTION_FOR_WP_DIR . '/dist/blocks';
		$gutenbergBuildDirChildren = scandir($gutenbergBuildDir);
		$gutenbergBuildDirChildren = array_filter($gutenbergBuildDirChildren, function ($child) {
			return $child !== '.' && $child !== '..';
		});
		$gutenbergBuildDirChildren = array_map(function ($child) use ($gutenbergBuildDir) {
			return $gutenbergBuildDir . '/' . $child;
		}, $gutenbergBuildDirChildren);

		foreach ($gutenbergBuildDirChildren as $buildDirChild) {
			register_block_type($buildDirChild);
		}
	}

	public function registerBlockCategory($categories): array
	{
		return array_merge(
			$categories,
			[
				[
					'slug' => 'motion-for-wp',
					'title' => 'Motion For WP',
					'icon' => 'wordpress',
				],
			]
		);
	}
}



