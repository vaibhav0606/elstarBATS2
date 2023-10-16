import React, { useEffect } from 'react'
import Logo from 'components/template/Logo'
import { Button, Menu, ScrollBar } from 'components/ui'
import {
    NAV_MODE_DARK,
    NAV_MODE_THEMED,
    NAV_MODE_TRANSPARENT,
    SIDE_NAV_CONTENT_GUTTER,
} from 'constants/theme.constant'
import { NAV_ITEM_TYPE_ITEM } from 'constants/navigation.constant'
import { AuthorityCheck } from 'components/shared'
import navigationConfig from 'configs/navigation.config'
import navigationIcon from 'configs/navigation-icon.config'
import useMenuActive from 'utils/hooks/useMenuActive'
import isEmpty from 'lodash/isEmpty'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { apiGetModulemaster } from 'services/MasterService'

const StackedSideNavMini = (props) => {
    const {
        navMode,
        onChange,
        routeKey,
        activeKeys,
        onSetActiveKey,
        userAuthority,
        mode,
        direction,
        ...rest
    } = props
    const themeColor = useSelector((state) => state.theme.themeColor)
    const { includedRouteTree } = useMenuActive(navigationConfig, routeKey)

    const logoMode = () => {
        if (navMode === NAV_MODE_THEMED) {
            return NAV_MODE_DARK
        }

        if (navMode === NAV_MODE_TRANSPARENT) {
            return mode
        }

        return navMode
    }

    const handleMenuItemSelect = ({ key, title, menu, translateKey }) => {
        onChange({ title, menu, translateKey })
        onSetActiveKey([key])
    }

    const handleLinkMenuItemSelect = ({ key }) => {
        onChange({})
        onSetActiveKey([key])
    }

    useEffect(() => {
        if (
            includedRouteTree.type !== NAV_ITEM_TYPE_ITEM &&
            !isEmpty(includedRouteTree)
        ) {
            onChange({
                key: includedRouteTree.key,
                title: includedRouteTree.title,
                menu: includedRouteTree.subMenu,
                translateKey: includedRouteTree.translateKey,
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [includedRouteTree.key])

    return (
        <div {...rest}>
            <center>
                <Logo
                    mode={logoMode()}
                    type="streamline"
                    gutter={SIDE_NAV_CONTENT_GUTTER}
                />
            </center>
            <div
                style={{
                    height: 1,
                    width: '100%',
                    background: themeColor,
                    marginBottom: 10,
                }}
            ></div>
            <ScrollBar autoHide direction={direction}>
                <Menu
                    className="px-2 "
                    variant={navMode}
                    defaultActiveKeys={activeKeys || [includedRouteTree.key]}
                >
                    {navigationConfig.map((nav) => (
                        <AuthorityCheck
                            key={nav.key}
                            authority={nav.authority}
                            userAuthority={userAuthority}
                        >
                            {nav.subMenu && nav.subMenu.length > 0 ? (
                                <Menu.MenuItem
                                    eventKey={nav.key}
                                    className="mb-4 flex justify-center "
                                    style={{
                                        padding: 22,
                                    }}
                                    onSelect={() =>
                                        handleMenuItemSelect({
                                            key: nav.key,
                                            title: nav.title,
                                            menu: nav.subMenu,
                                            translateKey: nav.translateKey,
                                        })
                                    }
                                >
                                    <center>
                                        <div className="text-2xl">
                                            {navigationIcon[nav.icon]}
                                        </div>
                                        <span style={{ fontSize: '9px' }}>
                                            {nav.title}
                                        </span>
                                    </center>
                                </Menu.MenuItem>
                            ) : (
                                <Link
                                    to={nav.path}
                                    className="flex items-center h-full w-full"
                                    onClick={() =>
                                        handleLinkMenuItemSelect({
                                            key: nav.key,
                                        })
                                    }
                                >
                                    <Menu.MenuItem
                                        eventKey={nav.key}
                                        className="mb-4 flex justify-center "
                                        style={{ padding: 22 }}
                                    >
                                        <center>
                                            <div className="text-2xl">
                                                {navigationIcon[nav.icon]}
                                            </div>
                                            <span style={{ fontSize: '9px' }}>
                                                {nav.title}
                                            </span>
                                        </center>
                                    </Menu.MenuItem>
                                </Link>
                            )}
                        </AuthorityCheck>
                    ))}
                </Menu>
            </ScrollBar>
        </div>
    )
}

export default StackedSideNavMini
