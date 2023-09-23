<?php

namespace MotionForWP;

class ConfigFiles extends BootLoadClass
{
    public function register(): void
    {
        add_filter('motion_for_wp/get_animations', [$this, 'getThemeAnimations']);
        add_filter('motion_for_wp/get_easings', [$this, 'getThemeEasings']);
    }

    public function getThemeAnimations(array $animations): array
    {
        $animationsFile = get_stylesheet_directory() . DIRECTORY_SEPARATOR . 'animations' . DIRECTORY_SEPARATOR . 'animations.json';

        if (!file_exists($animationsFile)) return $animations;
        $animationsFileContent = file_get_contents($animationsFile);
        $animationsFileContent = json_decode($animationsFileContent, true);
        return array_merge($animations, $animationsFileContent);
    }

    public function getThemeEasings(array $easings): array
    {
        $easingsFile = get_stylesheet_directory() . DIRECTORY_SEPARATOR . 'animations' . DIRECTORY_SEPARATOR . 'easings.json';

        if (!file_exists($easingsFile)) return $easings;
        $easingsFileContent = file_get_contents($easingsFile);
        $easingsFileContent = json_decode($easingsFileContent, true);
        return array_merge($easings, $easingsFileContent);
    }
}
