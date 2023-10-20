<?php

namespace MotionForWP\Helpers;

class SettingsSection
{
    public static function renderSectionsByPage($page): void
    {
        global $wp_settings_sections;

        if (!isset($wp_settings_sections[$page])) {
            return;
        }

        foreach ((array)$wp_settings_sections[$page] as $section) {
            self::renderSettingFields($page, $section['id']);
        }
    }

    public static function renderSettingFields($page, $section): void
    {
        global $wp_settings_fields;

        if (!isset($wp_settings_fields[$page][$section])) {
            return;
        }

        foreach ((array)$wp_settings_fields[$page][$section] as $field) {
            $class = '';

            if (!empty($field['args']['class'])) {
                $class = ' class="' . esc_attr($field['args']['class']) . '"';
            }

            echo "<div{$class}>";

            if (!empty($field['args']['label_for'])) {
                echo '<label for="' . esc_attr($field['args']['label_for']) . '" class="font-bold">' .
                    $field['title'] .
                    '</label>';
            } else {
                echo '<p class="font-bold">' . $field['title'] . '</p>';
            }

            call_user_func($field['callback'], $field['args']);
            echo '</div>';
        }
    }
}
