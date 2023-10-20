<?php

namespace MotionForWP;

class Image
{
    const IMAGES_URL = MOTION_FOR_WP_URL . 'resources/images/';
    const IMAGES_PATH = MOTION_FOR_WP_DIR . 'resources/images/';

    public static function getUrl(string $file): ?string
    {
        $imageUrl = self::IMAGES_URL . $file;
        $imagePath = self::IMAGES_PATH . $file;
        if (!file_exists($imagePath)) {
            return null;
        }

        return $imageUrl;
    }
}
