=== Motion for WP ===
Contributors: denisdums
Tags: motion, gutenberg, motion for wp, animations, blocks
Requires at least: 6.3
Tested up to: 7.0
Stable tag: 0.10.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add entrance animations to supported blocks directly from the Gutenberg inspector.

== Description ==

Motion for WP adds entrance animations to compatible static Gutenberg blocks. Choose an animation from the block
inspector, optionally override its duration, delay, easing or viewport margin, and preview the result before saving.

The controls follow the native WordPress interface. Each optional property inherits the global plugin setting until
you explicitly enable and change it. Animation previews respect the visitor's reduced-motion preference.

== Usage ==

1. Select a compatible block in the Gutenberg editor.
2. Open the block settings and choose an animation in the "Motion" section.
3. Use the options menu to enable duration, delay, easing or viewport margin overrides.
4. Use the icon beside "Preview" to replay the illustrative preview.
5. Use "Replay animation" in the options menu to replay only the selected block.
6. Save the post or page.

"Reset all" clears the optional overrides and restores the global values without removing the selected animation.
Choosing "No animation" removes the animation and its overrides from the block.

== Installation ==

1. Search for the plugin in WordPress under "Plugins -> Add New".
2. Click the “Install Now” button, followed by "Activate".

That's it! 

== Frequently Asked Questions ==

= If I need more support, where should I ask questions? =
Use one of the channels below to contact support.
[GitHub](https://github.com/denisdums/MotionForWP) - MotionForWP GitHub documentation and codebase.

= Does Motion for WP respect reduced-motion preferences? =
Yes. Frontend animations and editor previews are disabled when the operating system requests reduced motion.

= Why is the Motion section unavailable for some blocks? =
Motion for WP currently targets static blocks with a serializable root element. Dynamic and incompatible blocks are
excluded to avoid saving settings that cannot be rendered reliably.

== Screenshots ==

1. The settings page
2. The block settings

plugins/motion-for-wp/.wordpress-org/screenshot-1.png
plugins/motion-for-wp/.wordpress-org/screenshot-2.png

== Changelog ==

= 0.10.0 =

- Rebuilt the block inspector with native WordPress components.
- Added a compact animation preview that reflects duration, delay and easing overrides.
- Added separate replay actions for the illustrative preview and the selected block.
- Added optional-property controls with active-state checkmarks and global-value inheritance.
- Improved reduced-motion handling, accessibility labels and editor iframe support.
- Removed deprecated component warnings in current WordPress versions.
- Refactored editor, PHP services, build tooling and translations without changing saved block attributes.

= 0.9.0 =

- Initial public feature set.
