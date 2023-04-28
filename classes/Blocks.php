<?php

namespace MotionForGutenberg;

class Blocks extends BootLoadClass
{
	public function register(): void
	{
		add_action('block_categories_all', [$this, 'registerBlockCategory']);
		add_action('init', [$this, 'registerBlockTypes']);
	}

	public function registerBlockTypes(): void
	{
		if (!defined('MOTION_FOR_GUTENBERG_DIR')) return;
		$gutenbergBuildDir = MOTION_FOR_GUTENBERG_DIR . '/dist/blocks';
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
					'slug' => 'motion-for-gutenberg',
					'title' => 'Motion For Gutenberg',
					'icon' => 'wordpress',
				],
			]
		);
	}
}



