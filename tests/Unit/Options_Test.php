<?php
/**
 * Option repository tests.
 *
 * @package MotionForWP
 */

declare( strict_types=1 );

use MotionForWP\Settings\Options;
use PHPUnit\Framework\TestCase;

/** Tests the option contract without booting WordPress. */
final class Options_Test extends TestCase {
	/**
	 * The public defaults remain stable for PHP, REST, and JavaScript consumers.
	 */
	public function test_defaults_are_stable(): void {
		$this->assertSame(
			array(
				'enabled'           => true,
				'reduced_motion'    => true,
				'preview_enabled'   => true,
				'preview_mode'      => 'automatic',
				'repeat'            => 'once',
				'mobile_behavior'   => 'same',
				'concurrent_limit'  => 0,
				'stagger_enabled'   => false,
				'stagger_delay'     => 0.1,
				'default_animation' => 'none',
				'duration'          => 0.5,
				'delay'             => 0,
				'easing'            => 'ease-in-out',
				'margin'            => 100,
				'threshold'         => 0,
			),
			Options::defaults()
		);
	}
}
