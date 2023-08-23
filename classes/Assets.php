<?php

namespace MotionForGutenberg;

use MotionForGutenberg\Helpers\Animations;
use MotionForGutenberg\Helpers\Easings;
use MotionForGutenberg\Helpers\Options;

class Assets extends BootLoadClass
{
    public function register(): void
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueueFrontAssets']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueAdminAssets']);
    }

    public function enqueueFrontAssets(): void
    {
        if (!defined('MOTION_FOR_GUTENBERG_URL')) return;
        wp_register_style('motion-for-gutenberg-style', MOTION_FOR_GUTENBERG_URL . 'dist/css/app.css');
        wp_register_script('motion-for-gutenberg-script', MOTION_FOR_GUTENBERG_URL . 'dist/js/app.js', ['wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor']);

        wp_enqueue_style('motion-for-gutenberg-style');
        wp_enqueue_script('motion-for-gutenberg-script');

        wp_localize_script('motion-for-gutenberg-script', 'motionForGutenbergAnimations', Animations::getAll());
        wp_localize_script('motion-for-gutenberg-script', 'motionForGutenbergEasings', Easings::getAll());
        wp_localize_script('motion-for-gutenberg-script', 'motionForGutenbergOptions', Options::getAll());
    }

    public function enqueueAdminAssets(): void
    {
        wp_register_script('motion-for-gutenberg-admin-script', MOTION_FOR_GUTENBERG_URL . 'dist/js/admin.js', ['wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor']);

        wp_enqueue_script('motion-for-gutenberg-admin-script');

        wp_localize_script('motion-for-gutenberg-admin-script', 'motionForGutenbergOptions', Options::getAll());
        wp_localize_script('motion-for-gutenberg-admin-script', 'motionForGutenbergAnimations', Animations::getAll());
        wp_localize_script('motion-for-gutenberg-admin-script', 'motionForGutenbergEasings', Easings::getAll());
    }
}
