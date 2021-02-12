/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
/**
 * External dependencies
 */
import { negate, isUndefined } from 'lodash';
/**
 * Internal dependencies
 */
import { store as editNavigationStore } from '../../store';
export const untitledMenu = __( '(untitled menu)' );

export const useMenuEntity = ( menuId ) => {
	const { editEntityRecord, saveEditedEntityRecord } = useDispatch( 'core' );

	const menuEntityData = [ 'root', 'menu', menuId ];
	const editedMenu = useSelect(
		( select ) => select( 'core' ).getEditedEntityRecord,
		[ menuId ]
	);

	const editedMenuName = menuId && editedMenu.name;
	const saveMenuName = () =>
		negate( isUndefined )( editedMenuName ) &&
		saveEditedEntityRecord( ...menuEntityData );

	const editMenuName = ( name = untitledMenu ) =>
		editEntityRecord( ...menuEntityData, { name } );

	return {
		saveMenuName,
		editMenuName,
	};
};

export default function useNavigationEditor() {
	const menus = useSelect(
		( select ) => select( 'core' ).getMenus( { per_page: -1 } ),
		[]
	);

	const [ selectedMenuId, setSelectedMenuId ] = useState( null );

	useEffect( () => {
		if ( ! selectedMenuId && menus?.length ) {
			setSelectedMenuId( menus[ 0 ].id );
		}
	}, [ selectedMenuId, menus ] );

	const navigationPost = useSelect(
		( select ) =>
			select( editNavigationStore ).getNavigationPostForMenu(
				selectedMenuId
			),
		[ selectedMenuId ]
	);

	const selectMenu = ( menuId ) => {
		setSelectedMenuId( menuId );
	};

	const { deleteMenu: _deleteMenu } = useDispatch( 'core' );

	const deleteMenu = async () => {
		const didDeleteMenu = await _deleteMenu( selectedMenuId, {
			force: true,
		} );
		if ( didDeleteMenu ) {
			setSelectedMenuId( null );
		}
	};

	return {
		menus,
		selectedMenuId,
		navigationPost,
		selectMenu,
		deleteMenu,
	};
}
