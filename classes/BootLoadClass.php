<?php

namespace MotionForGutenberg;

abstract class BootLoadClass
{
	public static object|null $_instance = null;

	public static function boot(): void
	{
		self::$_instance = new static();
		self::$_instance->register();
	}
}
