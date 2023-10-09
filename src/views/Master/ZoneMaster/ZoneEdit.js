import { FormItem, Button, Switcher, Input, FormContainer } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Postzone, Putzone } from 'services/MasterService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    ZoneName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ZoneName Required'),
    ShortName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ShortName Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
const ZoneEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    currency,
}) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddZone = async (values, token) => {
        try {
            const resp = await Postzone(values, token)
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
    const EditZone = async (values, token) => {
        try {
            const resp = await Putzone(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Zone is Already Exists') {
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
                    ZoneCode: editData.ZoneCode || '',
                    ZoneName: editData.ZoneName || '',
                    ShortName: editData.ShortName || '',
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.ZoneCode) {
                            new Promise((resolve, reject) => {
                                AddZone(values, token)
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
                                EditZone(values, token)
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
                                    type="ZoneCode"
                                    autoComplete="off"
                                    name="ZoneCode"
                                    placeholder="ZoneCode name"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    label="ZoneName"
                                    invalid={
                                        errors.ZoneName && touched.ZoneName
                                    }
                                    errorMessage={errors.ZoneName}
                                >
                                    <Field
                                        type="ZoneName"
                                        autoComplete="off"
                                        name="ZoneName"
                                        placeholder="Zone name"
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
                                    label="ShortName"
                                    invalid={
                                        errors.ShortName && touched.ShortName
                                    }
                                    errorMessage={errors.ShortName}
                                >
                                    <Field
                                        type="ShortName"
                                        autoComplete="off"
                                        name="ShortName"
                                        placeholder="ShortName name"
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
                                    asterisk
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

export default ZoneEdit
