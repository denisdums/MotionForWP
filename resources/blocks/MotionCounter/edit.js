import {__} from '@wordpress/i18n'
import {RichText, useBlockProps} from '@wordpress/block-editor';
import './editor.scss';

export default function Edit(props) {
    const blockProps = useBlockProps();
    blockProps.className = `${blockProps.className} motion-counter`;

    const onChangeContent = value => {
        props.setAttributes({content: value})
    }

    return (
        <RichText
            tagName="span"
            placeholder={__('123', 'motion-for-wp')}
            value={props.attributes.content}
            onChange={onChangeContent}
            {...blockProps}
        />
    );
}

