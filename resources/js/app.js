import { InViewManager } from './components/InViewManager';
import '../scss/front.scss';

if ( ! window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
	document.documentElement.classList.add( 'motion-for-wp-ready' );
	InViewManager().init();
}
