/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { store as editNavigationStore } from '../../store';
import useNavigationEditor from '../layout/use-navigation-editor';

export default function SaveButton( { navigationPost } ) {
	const { saveSelectedMenuName } = useNavigationEditor();
	const { saveNavigationPost } = useDispatch( editNavigationStore );

	return (
		<Button
			className="edit-navigation-toolbar__save-button"
			isPrimary
			onClick={ () => {
				saveSelectedMenuName();
				saveNavigationPost( navigationPost );
			} }
		>
			{ __( 'Save' ) }
		</Button>
	);
}
