import React from 'react'
import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
} from 'react-icons/hi'
import {
    FcFilingCabinet,
    FcSettings,
    FcConferenceCall,
    FcCollaboration,
    FcPlanner,
} from 'react-icons/fc'

import { BsArrowBarRight } from 'react-icons/bs'
const navigationIcon = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    HiAcademicCap: <BsArrowBarRight />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    FcFilingCabinet: <FcFilingCabinet />,
    FcSettings: <FcSettings />,
    FcConferenceCall: <FcConferenceCall />,
    FcCollaboration: <FcCollaboration />,
    FcPlanner: <FcPlanner />,
}

export default navigationIcon
