import {useBlockProps, RichText} from '@wordpress/block-editor'

export default function save(props) {

    const defaultBlockProps = useBlockProps.save();
    const blockProps = {
        ...defaultBlockProps,
        tagName: "span",
        className: `motion-counter ${defaultBlockProps.className}`,
        value: props.attributes.content,
    };

    return (
        <RichText.Content {...blockProps}/>
    );
}