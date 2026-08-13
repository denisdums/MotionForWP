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
				'duration' => 0.5,
				'delay'    => 0,
				'easing'   => 'ease-in-out',
				'margin'   => 100,
			),
			Options::defaults()
		);
	}
}
