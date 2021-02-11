/**
 * WordPress dependencies
 */
/**
 * Internal dependencies
 */
import { NameEditor } from '../components/name-editor';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import useNavigationEditor from '../components/layout/use-navigation-editor';

const addMenuNameEditor = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		if ( props.name !== 'core/navigation' ) {
			return <BlockEdit { ...props } />;
		}
		const { menuName } = useNavigationEditor();
		return (
			<>
				<BlockEdit { ...props } menuName={ menuName } />
				<NameEditor { ...props } />;
			</>
		);
	},
	'withMenuName'
);

export default () =>
	addFilter(
		'editor.BlockEdit',
		'core/edit-navigation/with-menu-name',
		addMenuNameEditor
	);
