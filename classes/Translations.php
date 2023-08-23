<?php

namespace MotionForWP;

class Translations extends BootLoadClass
{
    public function register(): void
    {
        add_action('admin_enqueue_scripts', [$this, 'loadScriptTranslations'], 20);
        add_action('plugins_loaded', [$this, 'loadPluginTranslations']);
    }

    public function loadScriptTranslations(): void
    {
        if (!defined('MOTION_FOR_WP_DIR')) return;
        wp_set_script_translations(
            'motion-for-wp-admin-script',
            MOTION_FOR_WP_TEXT_DOMAIN,
            MOTION_FOR_WP_DIR . 'languages'
        );
    }

    public function loadPluginTranslations(): void
    {
        if (!defined('MOTION_FOR_WP_DIR')) return;
        load_plugin_textdomain(
            MOTION_FOR_WP_TEXT_DOMAIN,
            false,
            MOTION_FOR_WP_DIR . 'languages'
        );
    }
}
