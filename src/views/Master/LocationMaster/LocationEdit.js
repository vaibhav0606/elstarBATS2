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
    LocationName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Location Name Required'),
    ShortName: Yup.string()
        .min(1, 'Too Short!')
        .max(4, 'Too Long!')
        .required('ShortName Required'),
    // TimeZoneCode: Yup.string()
    //     .min(1, 'Too Short!')
    //     .max(200, 'Too Long!')
    //     .required('TimeZone Required'),
    CurrencyCode: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Currency Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
const LocationEdit = ({
    onDrawerClose,
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
            } else if (resp.data.msg === 'Location Already Exists') {
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
                    LocationName: editData.LocationName || '',
                    //TimeZoneCode: editData.TimeZoneCode || '',
                    ShortName: editData.ShortName || '',
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
                                EditLocation(values, token)
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
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <Field
                                    size="sm"
                                    type="LocationCode"
                                    autoComplete="off"
                                    name="LocationCode"
                                    placeholder="Location Name"
                                    component={Input}
                                    hidden
                                />

                                <FormItem
                                    asterisk
                                    label="Location"
                                    invalid={
                                        errors.LocationName &&
                                        touched.LocationName
                                    }
                                    errorMessage={errors.LocationName}
                                >
                                    <Field
                                        size="sm"
                                        type="LocationName"
                                        autoComplete="off"
                                        name="LocationName"
                                        placeholder="Location"
                                        component={Input}
                                    />
                                </FormItem>
                                 {/* <FormItem
                                    asterisk
                                    label="TimeZone"
                                    invalid={
                                        errors.TimeZoneCode &&
                                        touched.TimeZoneCode
                                    }
                                    errorMessage={errors.TimeZoneCode}
                                >
                                    <Field
                                        size="sm"
                                        type="TimeZoneCode"
                                        autoComplete="off"
                                        name="TimeZoneCode"
                                        placeholder="TimeZone"
                                        component={Input}
                                    />
                                </FormItem>   */}

                                <FormItem
                                    asterisk
                                    label="Short Name"
                                    invalid={
                                        errors.ShortName && touched.ShortName
                                    }
                                    errorMessage={errors.ShortName}
                                >
                                    <Field
                                        size="sm"
                                        type="ShortName"
                                        maxlength="4"
                                        autoComplete="off"
                                        name="ShortName"
                                        placeholder="Short Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Currency"
                                    invalid={
                                        errors.CurrencyCode &&
                                        touched.CurrencyCode
                                    }
                                    errorMessage={errors.CurrencyCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        size="sm"
                                        name="CurrencyCode"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={currency}
                                                value={currency.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.CurrencyCode
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
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <FormItem
                                    label="Status"
                                    invalid={
                                        errors.IsActive && touched.IsActive
                                    }
                                    errorMessage={errors.IsActive}
                                >
                                    <div>
                                        <Field
                                            size="sm"
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

export default LocationEdit
