/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { useContext, useEffect, useState } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { MenuIdContext } from '../layout';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { useMenuEntity } from '../layout/use-navigation-editor';
const untitledMenu = __( '(untitled menu)' );

export const useNavigationEditorMenu = () => {
	const { saveMenu } = useDispatch( 'core' );
	const menuId = useContext( MenuIdContext );
	const menu = useSelect( ( select ) => select( 'core' ).getMenu( menuId ), [
		menuId,
	] );
	const menuName = menu?.name ?? untitledMenu;
	return {
		saveMenu,
		menuId,
		menu,
		menuName,
	};
};

export function NameEditor() {
	const { menuName, menuId } = useNavigationEditorMenu();
	const { editMenuName } = useMenuEntity( menuId );
	const [ tmpMenuName, setTmpMenuName ] = useState( menuName );
	useEffect( () => setTmpMenuName( menuName ), [ menuName ] );
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<input
						value={ tmpMenuName }
						onChange={ ( event ) => {
							const value = event.target.value;
							setTmpMenuName( value );
							editMenuName( value );
						} }
						aria-label={ __( 'Edit menu name' ) }
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}
