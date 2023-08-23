<?php

namespace MotionForWP;

use MotionForWP\Helpers\Animations;
use MotionForWP\Helpers\Easings;
use MotionForWP\Helpers\Options;

class Assets extends BootLoadClass
{
    public function register(): void
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueueFrontAssets']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueAdminAssets']);
    }

    public function enqueueFrontAssets(): void
    {
        if (!defined('MOTION_FOR_WP_URL')) return;
        wp_register_style('motion-for-wp-style', MOTION_FOR_WP_URL . 'dist/css/app.css');
        wp_register_script('motion-for-wp-script', MOTION_FOR_WP_URL . 'dist/js/app.js', ['wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor']);

        wp_enqueue_style('motion-for-wp-style');
        wp_enqueue_script('motion-for-wp-script');

        wp_localize_script('motion-for-wp-script', 'motionForWPAnimations', Animations::getAll());
        wp_localize_script('motion-for-wp-script', 'motionForWPEasings', Easings::getAll());
        wp_localize_script('motion-for-wp-script', 'motionForWPOptions', Options::getAll());
    }

    public function enqueueAdminAssets(): void
    {
        wp_register_script('motion-for-wp-admin-script', MOTION_FOR_WP_URL . 'dist/js/admin.js', ['wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor']);

        wp_enqueue_script('motion-for-wp-admin-script');

        wp_localize_script('motion-for-wp-admin-script', 'motionForWPOptions', Options::getAll());
        wp_localize_script('motion-for-wp-admin-script', 'motionForWPAnimations', Animations::getAll());
        wp_localize_script('motion-for-wp-admin-script', 'motionForWPEasings', Easings::getAll());
    }
}
