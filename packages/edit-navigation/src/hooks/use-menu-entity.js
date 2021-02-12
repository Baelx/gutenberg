/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
/**
 * External dependencies
 */
import { isUndefined, negate } from 'lodash';
/**
 * Internal dependencies
 */
import { untitledMenu } from './index';

export default function useMenuEntity( menuId ) {
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
}
