import React from 'react'
import Side from './Side'
// import Cover from './Cover'
// import Simple from './Simple'
import View from 'views'
import { useSelector } from 'react-redux'
import { LAYOUT_TYPE_BLANK } from 'constants/theme.constant'
import { HiOutlineChatAlt2 } from 'react-icons/hi'

const AuthLayout = (props) => {
    const layoutType = useSelector((state) => state.theme.layout.type)

    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
            <nav
                class="flex justify-between px-10 pt-5"
                style={{
                    height: '80px',
                    position: 'fixed',
                    background: 'transparent',
                    width: '100%',
                    borderBottom: '1px solid #DFE6E9',
                }}
            >
                <img
                    className="mb-4 max-w-[150px]"
                    src="/img/logo/logo-light-full.png"
                    alt="no-notification"
                />
                <div class="flex justify-between pt-2" style={{}}>
                    <p className="px-5">Need Help ?</p>
                    <p class="flex px-5 text-sm">
                        <p className="text-xl">
                            <HiOutlineChatAlt2 />
                        </p>
                        &nbsp; Support
                    </p>
                </div>
            </nav>
            {layoutType === LAYOUT_TYPE_BLANK ? (
                <View {...props} />
            ) : (
                <Side>
                    <View {...props} />
                </Side>
            )}
        </div>
    )
}

export default AuthLayout
