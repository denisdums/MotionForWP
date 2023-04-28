import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import {motionHooks} from "../../js/hooks/hooks";

export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'Motion For Gutenberg – hello from the editor!',
				'motion-for-gutenberg'
			) }
		</p>
	);
}

motionHooks().register()
