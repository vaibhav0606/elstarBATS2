import React from 'react'
import { Menu, Dropdown } from 'components/ui'
import { Link } from 'react-router-dom'
import VerticalMenuIcon from './VerticalMenuIcon'
import { Trans } from 'react-i18next'
import { AuthorityCheck } from 'components/shared'
import navigationIcon from 'configs/navigation-icon.config'
import { useSelector } from 'react-redux'

const { MenuItem, MenuCollapse } = Menu

const DefaultItem = ({ nav, onLinkClick, userAuthority }) => {
    const primaryFontLevel = useSelector(
        (state) => state.theme.primaryFontLevel
    )
    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            <MenuCollapse
                label={
                    <>
                        <VerticalMenuIcon icon={nav.icon} />
                        <span>
                            <Trans
                                i18nKey={nav.translateKey}
                                //defaults={nav.title}
                                defaults={
                                    <p
                                        className="font-normal"
                                        style={{
                                            fontSize: 12 + primaryFontLevel,
                                        }}
                                    >
                                        &nbsp;{nav.title}
                                    </p>
                                }
                            />
                        </span>
                    </>
                }
                key={nav.key}
                eventKey={nav.key}
                expanded={false}
                className="mb-2"
            >
                {nav.subMenu.map((subNav) => (
                    <AuthorityCheck
                        userAuthority={userAuthority}
                        authority={subNav.authority}
                        key={subNav.key}
                    >
                        <MenuItem eventKey={subNav.key}>
                            {subNav.path ? (
                                <Link
                                    className="h-full w-full flex items-center"
                                    onClick={() =>
                                        onLinkClick?.({
                                            key: subNav.key,
                                            title: subNav.title,
                                            path: subNav.path,
                                        })
                                    }
                                    to={subNav.path}
                                >
                                    <span>
                                        <Trans
                                            i18nKey={subNav.translateKey}
                                            defaults={
                                                <p
                                                    className="font-normal flex "
                                                    style={{
                                                        fontSize:
                                                            10 +
                                                            primaryFontLevel,
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            marginTop: '2px',
                                                        }}
                                                    >
                                                        {subNav.icon &&
                                                            navigationIcon[
                                                                subNav.icon
                                                            ]}
                                                    </span>
                                                    &nbsp;
                                                    {subNav.title}
                                                </p>
                                            }
                                        />
                                    </span>
                                </Link>
                            ) : (
                                <span>
                                    <Trans
                                        i18nKey={subNav.translateKey}
                                        defaults={
                                            <p className="text-xs font-normal">
                                                {subNav.title}
                                            </p>
                                        }
                                    />
                                </span>
                            )}
                        </MenuItem>
                    </AuthorityCheck>
                ))}
            </MenuCollapse>
        </AuthorityCheck>
    )
}

const CollapsedItem = ({ nav, onLinkClick, userAuthority, direction }) => {
    const menuItem = (
        <MenuItem key={nav.key} eventKey={nav.key} className="mb-2">
            <VerticalMenuIcon icon={nav.icon} />
        </MenuItem>
    )

    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            <Dropdown
                trigger="hover"
                renderTitle={menuItem}
                placement={
                    direction === 'rtl' ? 'middle-end-top' : 'middle-start-top'
                }
            >
                {nav.subMenu.map((subNav) => (
                    <AuthorityCheck
                        userAuthority={userAuthority}
                        authority={subNav.authority}
                        key={subNav.key}
                    >
                        <Dropdown.Item eventKey={subNav.key}>
                            {subNav.path ? (
                                <Link
                                    className="h-full w-full flex items-center"
                                    onClick={() =>
                                        onLinkClick?.({
                                            key: subNav.key,
                                            title: subNav.title,
                                            path: subNav.path,
                                        })
                                    }
                                    to={subNav.path}
                                >
                                    <span>
                                        <Trans
                                            i18nKey={subNav.translateKey}
                                            defaults={
                                                <p className="text-xs font-normal">
                                                    {subNav.title}
                                                </p>
                                            }
                                        />
                                    </span>
                                </Link>
                            ) : (
                                <span>
                                    <Trans i18nKey={subNav.translateKey} />
                                </span>
                            )}
                        </Dropdown.Item>
                    </AuthorityCheck>
                ))}
            </Dropdown>
        </AuthorityCheck>
    )
}

const VerticalCollapsedMenuItem = ({ sideCollapsed, ...rest }) => {
    return sideCollapsed ? (
        <CollapsedItem {...rest} />
    ) : (
        <DefaultItem {...rest} />
    )
}

export default VerticalCollapsedMenuItem
