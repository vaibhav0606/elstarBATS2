import React from 'react'
import SignInForm from './SignInForm'
import { APP_NAME } from 'constants/app.constant'
import { StickyFooter, ConfirmDialog } from 'components/shared'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h1
                    className="mb-1 font-semibold "
                    style={{
                        fontSize: '38px',
                        lineHeight: '48px',
                        fontWeight: 400,
                        color: '#2d3436',
                        fontFamily: 'sans-serif',
                        fontVariant: 'tabular-nums',
                    }}
                >
                    {/* BATS Login */}
                     <img
                    className="mb-4 max-w-[290px]"
                    style={{height:"100px"}}
                    src="/img/logo/logo-light-full.png"
                    alt="no-notification"
                />
                </h1>

                {/* <p>Please enter your credentials to sign in!</p> */}

                {/* <p style={{ color: '#2d3436' }}>Welcome To BATS System!!!</p> */}
            </div>

            <SignInForm disableSubmit={false} />
            {/* <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
            <div className="flex items-center justify-between flex-auto w-full ">
                <span className="text-xs ">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`${APP_NAME}`}</span> All
                    rights reserved.
                </span>
            </div>
            </StickyFooter> */}
        </>
    )
}

export default SignIn
