<?php

namespace MotionForGutenberg\Settings;

abstract class SettingsAbstract
{

	protected string $id = '';
	protected string $pageTitle = '';
	protected string $menuTitle = '';
	protected string $parentMenu = '';
	protected string $capability = 'manage_options';
	protected string $iconUrl = '';
	protected int $position = 99;
	protected array $fields = [];

	public function __construct()
	{
		add_action('admin_menu', [$this, 'registerPage']);
		add_action('admin_init', [$this, 'registerFields']);
	}

	public function registerPage(): void
	{
		$displayMenu = apply_filters('motion_for_gutenberg/display_menu', true);
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
		?>
		<div class="wrap">
			<div id="icon-options-general" class="icon32"><br></div>
			<h2><?php echo $this->pageTitle; ?></h2>
			<?php do_action($this->id . '_before_form'); ?>
			<form action="options.php" method="post">
				<?php
				do_action($this->id . '_before_options');
				settings_fields($this->id);
				do_settings_sections($this->id);
				do_action($this->id . '_before_submit_button');
				submit_button(__('Save Settings', MOTION_FOR_GUTENBERG_TEXT_DOMAIN));
				do_action($this->id . '_after_submit_button');
				?>
			</form>
			<?php do_action($this->id . '_after_form'); ?>
		</div>
		<?php
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
					$field['title'],
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
