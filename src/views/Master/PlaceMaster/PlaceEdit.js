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
import { Postplace, Putplace } from 'services/MasterService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    PlaceName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Place Name Required'),
    ShortName: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('ShortName Required'),
    ZoneCode: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Zone Required'),
    StateCode: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('State Required'),
    //StateCode: Yup.string().required('StateCode Required'),
    CountryCode: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Country Required'),
    IsActive: Yup.string().required('IsActives Required'),

    rememberMe: Yup.bool(),
})

const PlaceEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    State,
    Zone,
    Country,
}) => {
    const token = useSelector((state) => state.auth.session.token)

    const AddPlace = async (values, token) => {
        try {
            const resp = await Postplace(values, token)
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
    const EditPlace = async (values, token) => {
        try {
            const resp = await Putplace(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Place is Already Exists') {
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
                    PlaceCode: editData.PlaceCode,
                    PlaceName: editData.PlaceName,
                    ShortName: editData.ShortName,
                    ZoneCode: editData.Zone?.ZoneCode || '',
                    StateCode: editData.State?.StateCode || '',
                    CountryCode: editData.Country?.CountryCode || '',
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.PlaceCode) {
                            new Promise((resolve, reject) => {
                                AddPlace(values, token)
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
                                EditPlace(values, token)
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field
                                    type="PlaceCode"
                                    autoComplete="off"
                                    name="PlaceCode"
                                    placeholder="PlaceCode name"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    asterisk
                                    label="Place Name"
                                    invalid={
                                        errors.PlaceName && touched.PlaceName
                                    }
                                    errorMessage={errors.PlaceName}
                                >
                                    <Field
                                        type="text"
                                        maxlength="30"
                                        autoComplete="off"
                                        name="PlaceName"
                                        placeholder="Place Name"
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
                                        type="text"
                                        maxlength="4"
                                        autoComplete="off"
                                        name="ShortName"
                                        placeholder="Short Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Zone"
                                    invalid={
                                        errors.ZoneCode && touched.ZoneCode
                                    }
                                    errorMessage={errors.ZoneCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="ZoneCode"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={Zone}
                                                value={Zone.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.ZoneCode
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
                                    label="State"
                                    invalid={
                                        errors.StateCode && touched.StateCode
                                    }
                                    errorMessage={errors.StateCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="StateCode"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={State}
                                                value={State.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.StateCode
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
                                    label="CountryName"
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

export default PlaceEdit
