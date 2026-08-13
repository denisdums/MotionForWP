import { InViewManager } from './components/InViewManager';
import '../scss/front.scss';

const motionEnabled = window.motionForWP?.options?.enabled !== false;
const shouldReduceMotion =
	window.motionForWP?.options?.reduced_motion !== false &&
	window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

if ( window.motionForWP?.options?.reduced_motion === false ) {
	document.documentElement.classList.add(
		'motion-for-wp-allow-reduced-motion'
	);
}

if ( motionEnabled && ! shouldReduceMotion ) {
	document.documentElement.classList.add( 'motion-for-wp-ready' );
	InViewManager().init();
}
