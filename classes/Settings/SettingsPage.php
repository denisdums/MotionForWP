<?php

namespace MotionForWP\Settings;

class SettingsPage extends SettingsAbstract
{
    public static function make(string $title, string $menuTitle, string $id): static
    {
        $instance = new static();
        $instance->pageTitle = $title;
        $instance->menuTitle = $menuTitle;
        $instance->id = $id;
        return $instance;
    }

    public function setIconUrl(string $iconUrl): self
    {
        $this->iconUrl = $iconUrl;
        return $this;
    }

    public function setPosition(int $position): self
    {
        $this->position = $position;
        return $this;
    }

    public function setParentMenu(string $parentMenu): self
    {
        $this->parentMenu = $parentMenu;
        return $this;
    }

    public function setCapability(string $capability): self
    {
        $this->capability = $capability;
        return $this;
    }

    public function addSection(
        ?string $title,
        string $name,
        string $description = '',
    ): self
    {
        $section = [
            'title' => $title,
            'name' => $name,
            'type' => 'section'
        ];
        $this->fields = array_merge($this->fields, [$section]);
        return $this;
    }

    public function addField(
        string $title,
        string $name,
        string $type = 'text',
        string $description = '',
        string $section = 'default',
        array  $attributes = [],
        string $classes = '',
    ): self
    {
        $field = [
            'name' => $name,
            'title' => $title,
            'description' => $description,
            'type' => $type,
            'section' => $section,
            'attributes' => $attributes,
            'class' => $classes
        ];
        $this->fields = array_merge($this->fields, [$field]);
        return $this;
    }

    public function render(): void
    {
        parent::__construct();
    }
}
