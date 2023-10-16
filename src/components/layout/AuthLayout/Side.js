import React, { cloneElement } from 'react'

const Side = ({ children, content, ...rest }) => {
    return (
        <div className="grid lg:grid-cols-0 h-full">
            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-12">
                    <div className="mb-8">{content}</div>
                    {children ? cloneElement(children, { ...rest }) : null}
                </div>
            </div>
        </div>
    )
}

export default Side
