<?php

namespace MotionForWP;

class Template
{
    const TEMPLATE_DIR = MOTION_FOR_WP_DIR . 'templates/';

    public static function render(string $slug, array $data = []): void
    {
        $template = self::TEMPLATE_DIR . $slug . '.php';
        if (!file_exists($template)) {
            return;
        }

        global $wp_query;
        $wp_query->query_vars['data'] = (object)$data;
        load_template($template, false);
    }
}
