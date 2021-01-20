/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	RichText,
	BlockControls,
	AlignmentToolbar,
	useBlockProps,
} from '@wordpress/block-editor';

export default function VerseEdit( {
	attributes,
	setAttributes,
	mergeBlocks,
	isSelected,
} ) {
	const { textAlign, content } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	return (
		<>
			{ isSelected && (
				<BlockControls>
					<AlignmentToolbar
						value={ textAlign }
						onChange={ ( nextAlign ) => {
							setAttributes( { textAlign: nextAlign } );
						} }
					/>
				</BlockControls>
			) }
			<RichText
				tagName="pre"
				identifier="content"
				preserveWhiteSpace
				value={ content }
				onChange={ ( nextContent ) => {
					setAttributes( {
						content: nextContent,
					} );
				} }
				aria-label={ __( 'Verse text' ) }
				placeholder={ __( 'Write verse…' ) }
				onMerge={ mergeBlocks }
				textAlign={ textAlign }
				{ ...blockProps }
			/>
		</>
	);
}
