import { FormItem, Button, Switcher, Input, FormContainer } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Postpromotype, Putpromotype } from 'services/ProgrammingService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    PromoTypeName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('PromoType Name Required'),
    PromoTypeShortName: Yup.string()
        .min(3, 'Too Short!')
        .max(4, 'Too Long!')
        .required('PromoType Short Name Required'),

    ChannelSpecific: Yup.string().required('ChannelSpecific Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const PromoTypeEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddPromoTypeName = async (values, token) => {
        try {
            const resp = await Postpromotype(values, token)
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
            const resp = await Putpromotype(values, token)
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
        <div>
            <Formik
                initialValues={{
                    PromoTypeCode: editData.PromoTypeCode || '',
                    PromoTypeName: editData.PromoTypeName || '',
                    PromoTypeShortName: editData.PromoTypeShortName || '',
                    ChannelSpecific:
                        editData.ChannelSpecific === 1 ? true : false,
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    console.log(editData)
                    setTimeout(() => {
                        if (!editData.PromoTypeCode) {
                            new Promise((resolve, reject) => {
                                AddPromoTypeName(values, token)
                                    .then((response) => {
                                        onDrawerClose(0, 0)
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
                                        onDrawerClose(0, 0)
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
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Field
                                    type="PromoTypeCode"
                                    autoComplete="off"
                                    name="PromoTypeCode"
                                    placeholder="PromoTypeCode"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    asterisk
                                    label="PromoType Name"
                                    invalid={
                                        errors.PromoTypeName &&
                                        touched.PromoTypeName
                                    }
                                    errorMessage={errors.PromoTypeName}
                                >
                                    <Field
                                        type="PromoTypeName"
                                        autoComplete="off"
                                        name="PromoTypeName"
                                        placeholder="PromoType Name"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    asterisk
                                    label="PromoType Short Name"
                                    invalid={
                                        errors.PromoTypeShortName &&
                                        touched.PromoTypeShortName
                                    }
                                    errorMessage={errors.PromoTypeShortName}
                                >
                                    <Field
                                        type="PromoTypeShortName"
                                        autoComplete="off"
                                        name="PromoTypeShortName"
                                        placeholder="PromoType Short Name"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <FormItem
                                    label="ChannelSpecific"
                                    invalid={
                                        errors.ChannelSpecific &&
                                        touched.ChannelSpecific
                                    }
                                    errorMessage={errors.ChannelSpecific}
                                >
                                    <div>
                                        <Field
                                            name="ChannelSpecific"
                                            component={Switcher}
                                        />
                                    </div>
                                </FormItem>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <FormItem
                                    label="Status"
                                    invalid={
                                        errors.IsActive && touched.IsActive
                                    }
                                    errorMessage={errors.IsActive}
                                >
                                    <div>
                                        <Field
                                            name="IsActive"
                                            component={Switcher}
                                        />
                                    </div>
                                </FormItem>
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
        </div>
    )
}

export default PromoTypeEdit
