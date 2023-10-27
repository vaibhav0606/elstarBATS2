import React, { useEffect, useState } from 'react'
import {
    AdaptableCard,
    Container,
    DoubleSidedImage,
    Loading,
} from 'components/shared'
import CustomerProfile from './CustomerProfile'
// import PaymentHistory from './components/PaymentHistory'
// import CurrentSubscription from './components/CurrentSubscription'
// import PaymentMethods from './components/PaymentMethods'
import Exapanding from 'views/Programming/PatternMaster/Exapanding'
import isEmpty from 'lodash/isEmpty'
import { apiGetEmpbyid } from 'services/MasterService'
import { useLocation } from 'react-router'

import EmpLoginRights from './PaymentHistory'

const EmployeeView = () => {
    const { state } = useLocation()

    const [data, setData] = useState([''])

    useEffect(() => {
        ;(async (values) => {
            const EmpDetails = await apiGetEmpbyid(state.editData.EmployeeCode)
            setData(EmpDetails.data)
        })()
    }, [])

    return (
        <Container className="h-full">
            <Loading>
                {' '}
                {!isEmpty(data) && (
                    <div className="grid grid-cols-7 md:grid-cols-7 gap-4">
                        <div className="col-span-2">
                            <CustomerProfile data={data} />
                        </div>
                        <div className="col-span-5">
                            <AdaptableCard>
                                {/* <CurrentSubscription />*/}
                                <Exapanding />
                                <EmpLoginRights />
                                {/* <PaymentMethods data={data.paymentMethod} /> */}
                            </AdaptableCard>
                        </div>
                    </div>
                )}
            </Loading>
            {/* {isEmpty(data) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No user found!"
                    />
                    <h3 className="mt-8">No user found!</h3>
                </div>
            )} */}
        </Container>
    )
}

export default EmployeeView
