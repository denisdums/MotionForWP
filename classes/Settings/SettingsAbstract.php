<?php

namespace MotionForWP\Settings;

use MotionForWP\Template;

abstract class SettingsAbstract
{

    public string $id = '';
    public string $pageTitle = '';
    public string $menuTitle = '';
    public string $parentMenu = '';
    public string $capability = 'manage_options';
    public string $iconUrl = '';
    public int $position = 99;
    public array $fields = [];

    public function __construct()
    {
        add_action('admin_menu', [$this, 'registerPage']);
        add_action('admin_init', [$this, 'registerFields']);
    }

    public function registerPage(): void
    {
        $displayMenu = apply_filters('motion_for_wp/display_menu', true);
        if (!$displayMenu) return;

        if ($this->parentMenu) {
            add_submenu_page(
                $this->parentMenu,
                $this->pageTitle,
                $this->menuTitle ?: $this->pageTitle,
                $this->capability,
                $this->id,
                [$this, 'renderPage']
            );
        } else {
            add_menu_page(
                $this->pageTitle,
                $this->menuTitle ?: $this->pageTitle,
                'manage_options',
                $this->id,
                [$this, 'renderPage'],
                $this->iconUrl,
                $this->position
            );
        }
    }

    public function renderPage(): void
    {
        Template::render('admin/settings-page', ['settingPage' => $this]);
    }

    public function getFields(): mixed
    {
        return apply_filters($this->id . '_get_fields', $this->fields);
    }

    public function registerFields(): void
    {
        $fields = $this->getFields();

        register_setting(
            $this->id,
            $this->id,
            [
                'sanitize_callback' => [$this, 'sanitize']
            ]
        );

        foreach ($fields as $field) {
            if ('section' === $field['type']) {
                add_settings_section(
                    $field['name'],
                    $field['title'] ?? null,
                    [$this, 'renderSection'],
                    $this->id,
                    $field
                );
            } else {
                add_settings_field(
                    $this->id . '_' . $field['name'],
                    $field['title'],
                    [$this, 'renderField'],
                    $this->id,
                    $field['section'],
                    $field
                );
            }
        }
    }

    public function sanitize($input): mixed
    {
        $fields = $this->getFields();

        foreach ($fields as $field) {
            if ('section' === $field['type']) {
                continue;
            }

            if (!isset($input[$field['name']])) {
                continue;
            }

            switch ($field['type']) {
                case 'text':
                    $input[$field['name']] = sanitize_text_field($input[$field['name']]);
                    break;
            }
        }

        do_action($this->id . '_settings_sanitized', $input, $fields, $_POST, $this);

        return $input;
    }

    public function renderSection($args): void
    {
        if (!empty($args['description'])) {
            ?>
            <p class="description"><?php echo wp_kses_post($args['description']); ?></p>
            <?php
        }
    }

    public function renderField($args): void
    {
        $field = new SettingsField($this->id, $args);
        $field->render();
    }
}
