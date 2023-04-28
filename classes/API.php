<?php

namespace MotionForGutenberg;

use MotionForGutenberg\Helpers\Animations;
use MotionForGutenberg\Helpers\Easings;
use MotionForGutenberg\Helpers\Options;

class API extends BootLoadClass
{
	public function register(): void
	{
		add_action('rest_api_init', [$this, 'registerRestApiEndpoints']);
	}

	public function registerRestApiEndpoints(): void
	{
		register_rest_route('motion-for-gutenberg/v1', '/animations', [
			'methods' => 'GET',
			'callback' => [Animations::class, 'getAll'],
		]);

		register_rest_route('motion-for-gutenberg/v1', '/easings', [
			'methods' => 'GET',
			'callback' => [Easings::class, 'getAll'],
		]);

		register_rest_route('motion-for-gutenberg/v1', '/options', [
			'methods' => 'GET',
			'callback' => [Options::class, 'getAll'],
		]);
	}
}



