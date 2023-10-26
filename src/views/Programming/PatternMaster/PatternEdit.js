import {
    FormItem,
    Button,
    Switcher,
    Input,
    FormContainer,
    Alert,
    Card,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { useSelector } from 'react-redux'
import { Postpattern, Putpattern } from 'services/ProgrammingService'
import { useLocation } from 'react-router-dom'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { useState } from 'react'
import PartternDetail from './PartternDetail'
import HeaderExtra from 'views/Controls/HeaderExtra'
import HeaderDuration from './HeaderDuration'
import TypeBox from './TypeBox'
const validationSchema = Yup.object().shape({
    PatternName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('PatternName Required'),
    minFormat: Yup.string()
        .min(3, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Required'),

    ChannelSpecific: Yup.string().required('ChannelSpecific Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const PromoTypeEdit = () => {
    const { state } = useLocation()
    const { editData } = state
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddPromoTypeName = async (values, token) => {
        try {
            const resp = await Postpattern(values, token)
            if (resp.data.msg === 'success') {
                setlog('success')
                setMessage('Data Inserted Successfully')
                return
            } else if (resp.data.msg === 'Server Error') {
                setlog('error')
                setMessage('Server Error')
                return
            }
        } catch (errors) {
            return {}
        }
    }
    const EditPromoType = async (values, token) => {
        try {
            const resp = await Putpattern(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Promo Type Already Exists') {
                setlog('warning')
                setMessage(resp.data.msg)
                return
            }
        } catch (errors) {
            return {}
        }
    }

    return (
        <Card>
            {message && (
                <Alert className="mb-4" type={log} showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    PromoTypeCode: state?.editData.PromoTypeCode || '',
                    PromoTypeName: state?.editData.PromoTypeName || '',
                    PromoTypeShortName:
                        state?.editData.PromoTypeShortName || '',
                    ChannelSpecific:
                        state?.editData.ChannelSpecific === 1 ? true : false,
                    IsActive: state?.editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    console.log(editData)
                    setTimeout(() => {
                        if (!editData.PromoTypeCode) {
                            new Promise((resolve, reject) => {
                                AddPromoTypeName(values, token)
                                    .then((response) => {
                                        resolve(response)
                                    })
                                    .catch((errors) => {
                                        reject(errors)
                                    })
                            })
                        } else {
                            new Promise((resolve, reject) => {
                                setSubmitting(false)
                                EditPromoType(values, token)
                                    .then((response) => {
                                        resolve(response)
                                    })
                                    .catch((errors) => {
                                        reject(errors)
                                    })
                            })
                        }

                        resetForm()
                    }, 400)
                }}
            >
                {({ values, touched, errors }) => (
                    <Form>
                        <FormContainer>
                            <Field
                                type="PromoTypeCode"
                                autoComplete="off"
                                name="PromoTypeCode"
                                placeholder="PromoTypeCode"
                                component={Input}
                                hidden
                            />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="lg:col-span-1">
                                    <Card>
                                        <h5>Details</h5>
                                        <PartternDetail
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                        />
                                    </Card>
                                </div>
                                <div className="lg:col-span-1">
                                    <Card>
                                        <h5>Header Duration</h5>
                                        <HeaderDuration
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                        />
                                    </Card>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="lg:col-span-2">
                                    <Card>
                                        <TypeBox
                                            values={values}
                                            touched={touched}
                                            errors={errors}
                                        />
                                    </Card>
                                </div>
                            </div>

                            <FormItem>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </Card>
    )
}

export default PromoTypeEdit
