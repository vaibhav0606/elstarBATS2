import React from 'react'
import SignInForm from './SignInForm'

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
                <p>Please enter your credentials to sign in!</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
