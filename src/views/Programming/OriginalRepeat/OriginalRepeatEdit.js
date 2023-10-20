import { FormItem, Button, Switcher, Input, FormContainer } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Postfpcorgrep, Putfpcorgrep } from 'services/ProgrammingService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    OriginalRepeatName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('OriginalRepeatName Required'),
        ShortName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ShortName Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const OriginalRepeatEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const Addfpcorgrep = async (values, token) => {
        try {
            const resp = await Postfpcorgrep(values, token)
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
    const Editfpcorgrep = async (values, token) => {
        try {
            const resp = await Putfpcorgrep(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'fpcorgrep Already Exists') {
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
                    OriginalRepeatCode: editData.OriginalRepeatCode || '',
                    OriginalRepeatName: editData.OriginalRepeatName || '',
                    ShortName: editData.ShortName || '',
                    NewColourCode: editData.NewColourCode || '',
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    console.log(editData)
                    setTimeout(() => {
                        if (!editData.OriginalRepeatCode) {
                            new Promise((resolve, reject) => {
                                Addfpcorgrep(values, token)
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
                                Editfpcorgrep(values, token)
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
                                    type="OriginalRepeatCode"
                                    autoComplete="off"
                                    name="OriginalRepeatCode"
                                    placeholder="OriginalRepeatCode"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    asterisk
                                    label="OriginalRepeat Name"
                                    invalid={
                                        errors.OriginalRepeatName && touched.OriginalRepeatName
                                    }
                                    errorMessage={errors.OriginalRepeatName}
                                >
                                    <Field
                                        type="OriginalRepeatName"
                                        autoComplete="off"
                                        name="OriginalRepeatName"
                                        placeholder="OriginalRepeat Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Short Name"
                                    invalid={
                                        errors.ShortName && touched.ShortName
                                    }
                                    errorMessage={errors.ShortName}
                                >
                                    <Field
                                        type="ShortName"
                                        autoComplete="off"
                                        name="ShortName"
                                        placeholder="Short Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Colour"
                                    invalid={
                                        errors.NewColourCode && touched.NewColourCode
                                    }
                                    errorMessage={errors.NewColourCode}
                                >
                                    <Field
                                        type="color"
                                        autoComplete="off"
                                        name="NewColourCode"
                                        placeholder="Colour"
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

export default OriginalRepeatEdit
