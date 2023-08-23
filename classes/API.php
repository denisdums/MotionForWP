<?php

namespace MotionForWP;

use MotionForWP\Helpers\Animations;
use MotionForWP\Helpers\Easings;
use MotionForWP\Helpers\Options;

class API extends BootLoadClass
{
	public function register(): void
	{
		add_action('rest_api_init', [$this, 'registerRestApiEndpoints']);
	}

	public function registerRestApiEndpoints(): void
	{
		register_rest_route('motion-for-wp/v1', '/animations', [
			'methods' => 'GET',
			'callback' => [Animations::class, 'getAll'],
            'permission_callback' => '__return_true',
		]);

		register_rest_route('motion-for-wp/v1', '/easings', [
			'methods' => 'GET',
			'callback' => [Easings::class, 'getAll'],
            'permission_callback' => '__return_true',
		]);

		register_rest_route('motion-for-wp/v1', '/options', [
			'methods' => 'GET',
			'callback' => [Options::class, 'getAll'],
            'permission_callback' => '__return_true',
		]);
	}
}



