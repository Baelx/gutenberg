/**
 * WordPress dependencies
 */
import { Children } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { createSlotFill } from '../../../slot-fill';
import { BottomSheetConsumer } from '../bottom-sheet-context';

const { Fill, Slot } = createSlotFill( 'BottomSheetSubSheet' );

const BottomSheetSubSheet = ( {
	children,
	navigationButton,
	showSheet,
	isFullScreen,
} ) => {
	return (
		<>
			{ showSheet && (
				<Fill>
					<BottomSheetConsumer>
						{ ( { setIsFullScreen } ) => {
							setIsFullScreen( isFullScreen );
							return children;
						} }
					</BottomSheetConsumer>
				</Fill>
			) }
			{ Children.count( children ) > 0 && navigationButton }
		</>
	);
};

BottomSheetSubSheet.Slot = Slot;
BottomSheetSubSheet.screenName = 'BottomSheetSubSheet';

export default BottomSheetSubSheet;