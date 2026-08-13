<?php
/**
 * Service contract.
 *
 * @package MotionForWP
 */

declare( strict_types=1 );

namespace MotionForWP\Contracts;

interface Service {
	/**
	 * Registers the service's WordPress hooks.
	 */
	public function register(): void;
}
