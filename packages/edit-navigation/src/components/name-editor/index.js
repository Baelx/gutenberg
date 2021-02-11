/**
 * Internal dependencies
 */
/**
 * WordPress dependencies
 */
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import useNavigationEditor from '../layout/use-navigation-editor';
import { useEffect, useState } from '@wordpress/element';

export function NameEditor() {
	const { selectedMenuName, editSelectedMenuName } = useNavigationEditor();
	const [ tmpMenuName, setTmpMenuName ] = useState( selectedMenuName );
	useEffect( () => setTmpMenuName( selectedMenuName ), [ selectedMenuName ] );
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<input
						value={ tmpMenuName }
						onChange={ ( event ) => {
							const value = event.target.value;
							setTmpMenuName( value );
							editSelectedMenuName( value );
						} }
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}
