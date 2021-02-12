/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
/**
 * Internal dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { useMenuEntity, useNavigationEditorMenu } from '../../hooks';

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
