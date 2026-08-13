import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { createElement, Fragment } from '@wordpress/element';
import { check, moreVertical } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

void createElement;

export function MotionOptionsMenu( {
	settings,
	isSettingVisible,
	toggleSetting,
	reducedMotion,
	hasOverrides,
	onReplay,
	onReset,
} ) {
	return (
		<DropdownMenu
			icon={ moreVertical }
			label={ __( 'Motion options', 'motion-for-wp' ) }
			toggleProps={ { isSmall: true } }
		>
			{ () => (
				<Fragment>
					<MenuGroup>
						{ settings.map( ( setting ) => {
							const isVisible = isSettingVisible( setting );

							return (
								<MenuItem
									key={ setting.key }
									icon={ isVisible && check }
									isSelected={ isVisible }
									onClick={ () => toggleSetting( setting ) }
									role="menuitemcheckbox"
								>
									{ setting.label }
								</MenuItem>
							);
						} ) }
					</MenuGroup>
					<MenuGroup>
						<MenuItem
							aria-disabled={ reducedMotion }
							onClick={ () => {
								if ( ! reducedMotion ) {
									onReplay();
								}
							} }
						>
							{ __( 'Replay animation', 'motion-for-wp' ) }
						</MenuItem>
						<MenuItem
							aria-disabled={ ! hasOverrides }
							onClick={ () => {
								if ( hasOverrides ) {
									onReset();
								}
							} }
						>
							{ __( 'Reset all', 'motion-for-wp' ) }
						</MenuItem>
					</MenuGroup>
				</Fragment>
			) }
		</DropdownMenu>
	);
}
