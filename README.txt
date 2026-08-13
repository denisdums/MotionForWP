=== MotionForWP ===
Contributors: denisdums
Tags: motion, gutenberg, motion for wp, animations, blocks
Requires at least: 6.3
Tested up to: 7.0
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add entrance animations to supported blocks directly from the Gutenberg inspector.

== Description ==

MotionForWP adds entrance animations to compatible static Gutenberg blocks. Choose an animation from the block
inspector, optionally override its duration, delay, easing or viewport margin, and preview the result before saving.

The controls follow the native WordPress interface. Each optional property inherits the global plugin setting until
you explicitly enable and change it. The Motion settings page can disable frontend animations without deleting block
configuration, respect the visitor's reduced-motion preference, control replay behavior and visibility threshold,
choose a default animation, configure editor preview modes, adapt motion on mobile, limit simultaneous animations,
and progressively stagger animated sibling blocks.

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

= Does MotionForWP respect reduced-motion preferences? =
Yes. By default, frontend animations and editor previews are disabled when the operating system requests reduced
motion. Administrators can change this behavior from the Motion settings page.

= Why is the Motion section unavailable for some blocks? =
MotionForWP currently targets static blocks with a serializable root element. Dynamic and incompatible blocks are
excluded to avoid saving settings that cannot be rendered reliably.

== Screenshots ==

1. The settings page
2. The block settings

plugins/motion-for-wp/.wordpress-org/screenshot-1.png
plugins/motion-for-wp/.wordpress-org/screenshot-2.png

== Changelog ==

= 1.0.0 =

- Promoted MotionForWP to its first stable release with no breaking changes from 0.12.0.
- Provides block-level entrance animations with global inheritance and explicit per-block opt-out.
- Includes editor previews, mobile behavior, concurrency limits, group staggering and reduced-motion support.
- Ships a branded responsive settings experience, French translations and a validated distributable archive.

= 0.12.0 =

- Added automatic, on-demand and disabled editor preview modes with backward-compatible option migration.
- Added mobile animation behavior with unchanged, simplified fade and disabled modes.
- Added a configurable simultaneous-animation limit and progressive staggering for animated sibling blocks.
- Added a status summary, setting-priority guidance, performance advice and support links to the admin page.
- Improved responsive settings layout, accessibility text and complete French translations.

= 0.11.0 =

- Added a global frontend animation switch that preserves all saved block settings.
- Added configurable reduced-motion handling, replay behavior and visibility threshold.
- Added a default animation with per-block global inheritance and explicit opt-out support.
- Added a global switch for editor previews without affecting frontend animations.
- Redesigned the Motion settings page with responsive native WordPress cards and plugin branding.
- Improved notices, French translations, layout resilience and release packaging.

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
