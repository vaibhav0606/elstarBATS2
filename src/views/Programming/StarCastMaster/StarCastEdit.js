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
import { Poststarcast, Putstarcast } from 'services/ProgrammingService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    StarCastName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('StarCastName Required'),

    StarCastTypeCode: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('StarCastType Required'),

    MaleFemale: Yup.string().required('Gender Required'),
    CountryCode: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Country Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
const options2 = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
]
const StarCastEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    Country,
    StarCastType,
}) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddStarCast = async (values, token) => {
        try {
            const resp = await Poststarcast(values, token)
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
    const EditStarCast = async (values, token) => {
        try {
            const resp = await Putstarcast(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'StarCast Already Exists') {
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
                    StarCastCode: editData.StarCastCode || '',
                    StarCastName: editData.StarCastName || '',
                    StarCastTypeCode:
                        editData.StartCastType?.StarCastTypeCode || '',
                    MaleFemale: editData.MaleFemale?.MaleFemale || '',
                    DateOfBirth: editData.DateOfBirth?.DateOfBirth || '',
                    DateOfDeath: editData.DateOfDeath?.DateOfDeath || '',
                    CountryCode: editData.Country?.CountryCode || '',
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    console.log(editData)
                    setTimeout(() => {
                        if (!editData.StarCastCode) {
                            new Promise((resolve, reject) => {
                                AddStarCast(values, token)
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
                                EditStarCast(values, token)
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Field
                                    type="StarCastCode"
                                    autoComplete="off"
                                    name="StarCastCode"
                                    placeholder="StarCastCode"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    asterisk
                                    label="StarCast Name"
                                    invalid={
                                        errors.StarCastName &&
                                        touched.StarCastName
                                    }
                                    errorMessage={errors.StarCastName}
                                >
                                    <Field
                                        type="StarCastName"
                                        autoComplete="off"
                                        name="StarCastName"
                                        placeholder="StarCast Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="StartCast Type"
                                    invalid={
                                        errors.StarCastTypeCode &&
                                        touched.StarCastTypeCode
                                    }
                                    errorMessage={errors.StarCastTypeCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="StarCastTypeCode"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={StarCastType}
                                                value={StarCastType.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.StarCastTypeCode
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
                                <FormItem
                                    asterisk
                                    label="Gender"
                                    invalid={
                                        errors.MaleFemale && touched.MaleFemale
                                    }
                                    errorMessage={errors.MaleFemale}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="MaleFemale"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={options2}
                                                value={options2.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.MaleFemale
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
                                <FormItem
                                    label="Date Of Birth"
                                    invalid={
                                        errors.DateOfBirth &&
                                        touched.DateOfBirth
                                    }
                                    errorMessage={errors.DateOfBirth}
                                >
                                    <Field
                                        type="datetime-local"
                                        autoComplete="off"
                                        name="DateOfBirth"
                                        placeholder="DateOfBirth"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Date Of Death"
                                    invalid={
                                        errors.DateOfDeath &&
                                        touched.DateOfDeath
                                    }
                                    errorMessage={errors.DateOfDeath}
                                >
                                    <Field
                                        type="datetime-local"
                                        autoComplete="off"
                                        name="DateOfDeath"
                                        placeholder="DateOfDeath name"
                                        component={Input}
                                    />
                                </FormItem>

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

export default StarCastEdit
