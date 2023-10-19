import React, { cloneElement } from 'react'
import { APP_NAME } from 'constants/app.constant'
import { StickyFooter, ConfirmDialog } from 'components/shared'

const Side = ({ children, content, ...rest }) => {
    return (
        <div className="grid lg:grid-cols-0 h-full w-full">
            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-12">
                    <div className="mb-8">{content}</div>
                    {children ? cloneElement(children, { ...rest }) : null}
                </div>
                
            </div>

            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
            <center className="xl:min-w-[450px] px-12">
                    <span className="text-xm ">
                        Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                        <span className="font-semibold">{`${APP_NAME}`}</span> All
                        rights reserved.
                    </span>
                </center>
                
            </div>
           
               
       
        </div>
        
    )
}

export default Side
