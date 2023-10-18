import React from 'react'
import SignInForm from './SignInForm'
import { APP_NAME } from 'constants/app.constant'

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
                    BATS Login
                </h1>

                {/* <p>Please enter your credentials to sign in!</p> */}

                <p style={{ color: '#2d3436' }}>Welcome To BATS System!!!</p>
            </div>

            <SignInForm disableSubmit={false} />
            <br></br>
            <div className="flex items-center justify-between flex-auto w-full">
                <span className="text-xs">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`${APP_NAME}`}</span> All
                    rights reserved.
                </span>
            </div>
        </>
    )
}

export default SignIn
