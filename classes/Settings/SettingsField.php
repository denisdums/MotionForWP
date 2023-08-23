<?php

namespace MotionForWP\Settings;

class SettingsField
{
	private string $pageID;
	private string $name;
	private string $title;
	private string $description;
	private string $type;
	private string $section;
	private array $attributes;
	private string $default;

	public function __construct(string $pageID, array $args)
	{
		$this->pageID = $pageID;
		$this->name = $args['name'] ?? '';
		$this->title = $args['title'] ?? '';
		$this->description = $args['description'] ?? '';
		$this->type = $args['type'] ?? '';
		$this->section = $args['section'] ?? '';
		$this->attributes = $args['attributes'] ?? [];
		$this->default = $args['default'] ?? '';
	}

	public function getName(): string
	{
		return $this->name;
	}

	public function getTitle(): string
	{
		return $this->title;
	}

	public function getDescription(): string
	{
		return $this->description;
	}

	public function getType(): string
	{
		return $this->type;
	}

	public function getSection(): string
	{
		return $this->section;
	}

	public function getAttributes(): array
	{
		return $this->attributes;
	}

	public function getDefault(): string
	{
		return $this->default;
	}

	public function getOptionKey($key): string
	{
		return $this->pageID . '[' . $key . ']';
	}

	public function getOption($id, $default = ''): mixed
	{
		$options = get_option($this->pageID);

		return isset($options[$id]) ? $options[$id] : $default;
	}

	public function renderAttributes(): void
	{
		foreach ($this->attributes as $key => $value) {
			echo esc_attr($key) . '="' . esc_attr($value) . '" ';
		}
	}

	public function renderDescription(): void
	{
		if (!$this->getDescription()) return;
		?>
		<p class="description"><?php echo esc_html($this->getDescription()); ?></p>
		<?php

	}

	public function render(): void
	{
		$method = 'render' . ucfirst($this->getType());
		if (method_exists($this, $method)) {
			$this->$method();
		}
	}

	public function renderText(): void
	{
		?>
		<label>
			<input type="text"
				   class="widefat"
				   name="<?php echo esc_attr($this->getOptionKey($this->getName())); ?>"
				   value="<?php echo esc_attr($this->getOption($this->getName(), $this->getDefault())); ?>"
				<?php $this->renderAttributes(); ?>
			/>
		</label>
		<?php
		$this->renderDescription();
	}

	public function renderNumber(): void
	{
		?>
		<label>
			<input type="number"
				   class="widefat"
				   name="<?php echo esc_attr($this->getOptionKey($this->getName())); ?>"
				   value="<?php echo esc_attr($this->getOption($this->getName(), $this->getDefault())); ?>"
				<?php $this->renderAttributes(); ?>
			/>
		</label>
		<?php
		$this->renderDescription();
	}

	public function renderSelect(): void
	{
		?>
		<label>
			<select class="widefat"
					name="<?php echo esc_attr($this->getOptionKey($this->getName())); ?>"
				<?php $this->renderAttributes(); ?>
			>
				<?php foreach ($this->getAttributes()['options'] as $key => $value) : ?>
					<option value="<?php echo esc_attr($key); ?>"
						<?php selected($this->getOption($this->getName(), $this->getDefault()), $key); ?>
					>
						<?php echo esc_html($value); ?>
					</option>
				<?php endforeach; ?>
			</select>
		</label>
		<?php
		$this->renderDescription();
	}
}
