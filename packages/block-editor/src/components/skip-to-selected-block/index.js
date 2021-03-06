/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { getBlockDOMNode } from '../../utils/dom';
import { store as blockEditorStore } from '../../store';

const SkipToSelectedBlock = ( { selectedBlockClientId } ) => {
	const onClick = () => {
		const selectedBlockElement = getBlockDOMNode(
			selectedBlockClientId,
			document
		);
		selectedBlockElement.focus();
	};

	return selectedBlockClientId ? (
		<Button
			isSecondary
			className="block-editor-skip-to-selected-block"
			onClick={ onClick }
		>
			{ __( 'Skip to the selected block' ) }
		</Button>
	) : null;
};

export default withSelect( ( select ) => {
	return {
		selectedBlockClientId: select(
			blockEditorStore
		).getBlockSelectionStart(),
	};
} )( SkipToSelectedBlock );
