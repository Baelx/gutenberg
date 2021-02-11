/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useContext, useEffect, createContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { store as editNavigationStore } from '../../store';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import { isUndefined, negate, noop } from 'lodash';

export const MenuIdContext = createContext( [ null, noop ] );
export const untitledMenu = __( '(untitled menu)' );

const useMenuEntity = ( menuId ) => {
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
	const { deleteMenu: _deleteMenu } = useDispatch( 'core' );
	const [ selectedMenuId, setSelectedMenuId ] = useContext( MenuIdContext );

	const deleteMenu = async () => {
		const didDeleteMenu = await _deleteMenu( selectedMenuId, {
			force: true,
		} );
		if ( didDeleteMenu ) {
			setSelectedMenuId( null );
		}
	};

	const menus = useSelect(
		( select ) => select( 'core' ).getMenus( { per_page: -1 } ),
		[]
	);

	const navigationPost = useSelect(
		( select ) =>
			select( editNavigationStore ).getNavigationPostForMenu(
				selectedMenuId
			),
		[ selectedMenuId ]
	);

	const selectedMenu = useSelect(
		( select ) => select( 'core' ).getMenu( selectedMenuId ),
		[ selectedMenuId ]
	);

	useEffect( () => {
		const noSelectedMenu = ! selectedMenuId && menus?.length;
		if ( noSelectedMenu ) {
			setSelectedMenuId( menus[ 0 ].id );
		}
	}, [ selectedMenuId, menus ] );

	const selectedMenuName = selectedMenu?.name ?? untitledMenu;

	const {
		saveMenuName: saveSelectedMenuName,
		editMenuName: editSelectedMenuName,
	} = useMenuEntity( selectedMenuId );

	return {
		menus,
		saveSelectedMenuName,
		editSelectedMenuName,
		selectedMenuName,
		selectedMenu,
		selectedMenuId,
		navigationPost,
		deleteMenu,
	};
}
