<?php

namespace MotionForGutenberg;

class Translations extends BootLoadClass
{
    public function register(): void
    {
        add_action('admin_enqueue_scripts', [$this, 'loadScriptTranslations'], 20);
        add_action('plugins_loaded', [$this, 'loadPluginTranslations']);
    }

    public function loadScriptTranslations(): void
    {
        if (!defined('MOTION_FOR_GUTENBERG_DIR')) return;
        wp_set_script_translations(
            'motion-for-gutenberg-admin-script',
            MOTION_FOR_GUTENBERG_TEXT_DOMAIN,
            MOTION_FOR_GUTENBERG_DIR . 'languages'
        );
    }

    public function loadPluginTranslations(): void
    {
        if (!defined('MOTION_FOR_GUTENBERG_DIR')) return;
        load_plugin_textdomain(
            MOTION_FOR_GUTENBERG_TEXT_DOMAIN,
            false,
            MOTION_FOR_GUTENBERG_DIR . 'languages'
        );
    }
}
