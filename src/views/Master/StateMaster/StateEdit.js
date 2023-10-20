import {
    FormItem,
    Button,
    Switcher,
    Input,
    FormContainer,
    Select,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Poststate, Putstate } from 'services/MasterService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    StateName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('StateName Required'),
    StateShortName: Yup.string()
        .min(2, 'Too Short!')
        .max(4, 'Too Long!')
        .required('StateShortName Required'),
    CountryCode: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Country Required'),
    StateTinNo: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('StateTinNo Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const StateEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    Country,
}) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddState = async (values, token) => {
        try {
            const resp = await Poststate(values, token)
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
    const EditState = async (values, token) => {
        try {
            const resp = await Putstate(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'State Already Exists') {
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
                    StateCode: editData.StateCode || '',
                    StateName: editData.StateName || '',
                    StateShortName: editData.StateShortName || '',
                    CountryCode: editData.CountryCode || '',
                    StateTinNo: editData.StateTinNo || '',
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    console.log(editData)
                    setTimeout(() => {
                        if (!editData.StateCode) {
                            new Promise((resolve, reject) => {
                                AddState(values, token)
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
                                EditState(values, token)
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
                                    type="StateCode"
                                    autoComplete="off"
                                    name="StateCode"
                                    placeholder="StateCode"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    asterisk
                                    label="StateName"
                                    invalid={
                                        errors.StateName && touched.StateName
                                    }
                                    errorMessage={errors.StateName}
                                >
                                    <Field
                                        type="StateName"
                                        autoComplete="off"
                                        name="StateName"
                                        placeholder="State Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="State Short Name"
                                    invalid={
                                        errors.StateShortName &&
                                        touched.StateShortName
                                    }
                                    errorMessage={errors.StateShortName}
                                >
                                    <Field
                                        size="sm"
                                        type="StateShortName"
                                        maxlength="4"
                                        autoComplete="off"
                                        name="StateShortName"
                                        placeholder="State ShortName"
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
                                    label="Country"
                                    invalid={
                                        errors.CountryCode &&
                                        touched.CountryCode
                                    }
                                    errorMessage={errors.CountryCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="CountryCode"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={Country}
                                                value={Country.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.CountryCode
                                                )}
                                                onChange={(option) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        option?.value
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                            </div>

                            <FormItem
                                asterisk
                                label="State TinNo"
                                invalid={
                                    errors.StateTinNo && touched.StateTinNo
                                }
                                errorMessage={errors.StateTinNo}
                            >
                                <Field
                                    size="sm"
                                    type="StateTinNo"
                                    maxlength="4"
                                    autoComplete="off"
                                    name="StateTinNo"
                                    placeholder="StateTinNo"
                                    component={Input}
                                />
                            </FormItem>

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

export default StateEdit
