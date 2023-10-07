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
import { Postlocation, Putlocation } from 'services/MasterService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    Emp_FirstName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Emp_FirstName Required'),
    Emp_Code: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Emp_Code Required'),
    Emp_LastName: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Emp_LastName Required'),
    CurrencyCode: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('CurrencyCode Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
const EmployeeEdit = ({
    onDialogClose,
    editData,
    setMessage,
    setlog,
    currency,
}) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddLocation = async (values, token) => {
        try {
            const resp = await Postlocation(values, token)
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
    const EditLocation = async (values, token) => {
        try {
            const resp = await Putlocation(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Location is Already Exists') {
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
                    LocationCode: editData.LocationCode || '',
                    Emp_FirstName: editData.Emp_FirstName || '',
                    Emp_LastName: editData.Emp_LastName || '',
                    Emp_Code: editData.Emp_Code || '',
                    CurrencyCode: editData.CurrencyCode || '',

                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.LocationCode) {
                            new Promise((resolve, reject) => {
                                AddLocation(values, token)
                                    .then((response) => {
                                        onDialogClose(0, 0)
                                        resolve(response)
                                    })
                                    .catch((errors) => {
                                        reject(errors)
                                    })
                            })
                        } else {
                            new Promise((resolve, reject) => {
                                setSubmitting(false)
                                EditLocation(values, token)
                                    .then((response) => {
                                        onDialogClose(0, 0)
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
                                    type="LocationCode"
                                    autoComplete="off"
                                    name="LocationCode"
                                    placeholder="LocationCode name"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    label="First Name"
                                    invalid={
                                        errors.Emp_FirstName &&
                                        touched.Emp_FirstName
                                    }
                                    errorMessage={errors.Emp_FirstName}
                                >
                                    <Field
                                        type="Emp_FirstName"
                                        autoComplete="off"
                                        name="Emp_FirstName"
                                        placeholder="First Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Emp_LastName"
                                    invalid={
                                        errors.Emp_LastName &&
                                        touched.Emp_LastName
                                    }
                                    errorMessage={errors.Emp_LastName}
                                >
                                    <Field
                                        type="Emp_LastName"
                                        autoComplete="off"
                                        name="Emp_LastName"
                                        placeholder="Emp_LastName name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Emp_Code"
                                    invalid={
                                        errors.Emp_Code && touched.Emp_Code
                                    }
                                    errorMessage={errors.Emp_Code}
                                >
                                    <Field
                                        type="Emp_Code"
                                        autoComplete="off"
                                        name="Emp_Code"
                                        placeholder="Emp_Code name"
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
                                    label="First Name"
                                    invalid={
                                        errors.Emp_Contact1 &&
                                        touched.Emp_Contact1
                                    }
                                    errorMessage={errors.Emp_Contact1}
                                >
                                    <Field
                                        type="Emp_Contact1"
                                        autoComplete="off"
                                        name="Emp_Contact1"
                                        placeholder="First Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Emp_Contact2"
                                    invalid={
                                        errors.Emp_Contact2 &&
                                        touched.Emp_Contact2
                                    }
                                    errorMessage={errors.Emp_Contact2}
                                >
                                    <Field
                                        type="Emp_Contact2"
                                        autoComplete="off"
                                        name="Emp_Contact2"
                                        placeholder="Emp_Contact2 name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Emp_DOB"
                                    invalid={errors.Emp_DOB && touched.Emp_DOB}
                                    errorMessage={errors.Emp_DOB}
                                >
                                    <Field
                                        type="Emp_DOB"
                                        autoComplete="off"
                                        name="Emp_DOB"
                                        placeholder="Emp_DOB name"
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
                                    label="First Name"
                                    invalid={errors.Emp_DOJ && touched.Emp_DOJ}
                                    errorMessage={errors.Emp_DOJ}
                                >
                                    <Field
                                        type="Emp_DOJ"
                                        autoComplete="off"
                                        name="Emp_DOJ"
                                        placeholder="First Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Emp_DOL"
                                    invalid={errors.Emp_DOL && touched.Emp_DOL}
                                    errorMessage={errors.Emp_DOL}
                                >
                                    <Field
                                        type="Emp_DOL"
                                        autoComplete="off"
                                        name="Emp_DOL"
                                        placeholder="Emp_DOL name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Emp_Description"
                                    invalid={
                                        errors.Emp_Description &&
                                        touched.Emp_Description
                                    }
                                    errorMessage={errors.Emp_Description}
                                >
                                    <Field
                                        type="Emp_Description"
                                        autoComplete="off"
                                        name="Emp_Description"
                                        placeholder="Emp_Description name"
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
                                    label="Emp_BloodGroup"
                                    invalid={
                                        errors.Emp_BloodGroup &&
                                        touched.Emp_BloodGroup
                                    }
                                    errorMessage={errors.Emp_BloodGroup}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="Emp_BloodGroup"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={options}
                                                value={options.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.Emp_BloodGroup
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

export default EmployeeEdit
