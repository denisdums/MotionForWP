<?php

namespace MotionForGutenberg;

use MotionForGutenberg\Helpers\Easings;
use MotionForGutenberg\Settings\SettingsPage;

class Options extends BootLoadClass
{
	public function register(): void
	{
		SettingsPage::make(__('Motion for Gutenberg', MOTION_FOR_GUTENBERG_TEXT_DOMAIN), __('Motion', MOTION_FOR_GUTENBERG_TEXT_DOMAIN), 'motion_for_gutenberg')
			->setIconUrl($this->getIcon())
			->setPosition(100)
			->addSection('Settings', 'setting', __('Set the default parameters of your animations', MOTION_FOR_GUTENBERG_TEXT_DOMAIN))
			->addField(__('Duration', MOTION_FOR_GUTENBERG_TEXT_DOMAIN), 'duration', 'number', __('A duration, in seconds, that the animation will take to complete.', MOTION_FOR_GUTENBERG_TEXT_DOMAIN),
				'setting', [
					'min' => '0',
					'max' => '1',
					'step' => '0.1',
				])
			->addField(__('Delay', MOTION_FOR_GUTENBERG_TEXT_DOMAIN), 'delay', 'number', __('A duration, in seconds, that the animation will be delayed before starting.', MOTION_FOR_GUTENBERG_TEXT_DOMAIN),
				'setting', [
					'min' => '0',
					'max' => '1',
					'step' => '0.1',
				])
			->addField(__('Easing', MOTION_FOR_GUTENBERG_TEXT_DOMAIN), 'easing', 'select', __('An easing to use for the whole animation, or list of easings to use between individual keyframes.', MOTION_FOR_GUTENBERG_TEXT_DOMAIN),
				'setting', [
					'options' => $this->getEasings(),
				])
			->addField(__('Margin', MOTION_FOR_GUTENBERG_TEXT_DOMAIN), 'margin', 'number', __('A CSS margin to apply to the root viewport so an element can be considered in view sooner or later.', MOTION_FOR_GUTENBERG_TEXT_DOMAIN),
				'setting', [
					'min' => '0',
					'max' => '1000',
					'step' => '1',
				])
			->render();
	}

	private function getIcon(): string
	{
		$iconContent = file_get_contents(MOTION_FOR_GUTENBERG_DIR . '/resources/icons/motion.svg');
		$iconContent = base64_encode($iconContent);
		return 'data:image/svg+xml;base64,' . $iconContent;
	}

	private function getEasings(): array
	{
		return array_map(fn ($easing) => $easing['name'],Easings::getAll());
	}
}
