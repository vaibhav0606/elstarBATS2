import { FormItem, Button, Switcher, Input, FormContainer } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PosttimeZone, PuttimeZone } from 'services/MasterService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    TimeZoneName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('TimeZoneName Required'),
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
const TimeZoneEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    currency,
}) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddTimeZone = async (values, token) => {
        try {
            const resp = await PosttimeZone(values, token)
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
    const EditTimeZone = async (values, token) => {
        try {
            const resp = await PuttimeZone(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'TimeZone is Already Exists') {
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
                    TimeZoneCode: editData.TimeZoneCode || '',
                    TimeZoneName: editData.TimeZoneName || '',
                    ShortName: editData.ShortName || '',
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.TimeZoneCode) {
                            new Promise((resolve, reject) => {
                                AddTimeZone(values, token)
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
                                EditTimeZone(values, token)
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
                                    type="TimeZoneCode"
                                    autoComplete="off"
                                    name="TimeZoneCode"
                                    placeholder="TimeZoneCode name"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    label="TimeZoneName"
                                    invalid={
                                        errors.TimeZoneName &&
                                        touched.TimeZoneName
                                    }
                                    errorMessage={errors.TimeZoneName}
                                >
                                    <Field
                                        type="TimeZoneName"
                                        autoComplete="off"
                                        name="TimeZoneName"
                                        placeholder="TimeZone name"
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

export default TimeZoneEdit
