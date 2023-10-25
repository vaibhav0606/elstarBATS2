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
import { PostSupplier, PutSupplier } from 'services/ProgrammingService'
import { useSelector } from 'react-redux'
import React, { forwardRef } from 'react'

const validationSchema = Yup.object().shape({
    SupplierName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('SupplierName Required'),
    ShortName: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('ShortName Required'),
    SupplierERPCode: Yup.string()
        .min(3, 'Too Short!')
        .max(4, 'Too Long!')
        .required('SupplierERPCode Required'),
    Address1: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Address1 Required'),
    // Address2: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(200, 'Too Long!')
    //     .required('Address2 Required'),
    Pin: Yup.string()
        .min(6, 'Too Short!')
        .max(6, 'Too Long!')
        .required('Pin Required'),
    CountryCode: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Country Required'),
    State: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('State Required'),
    PlaceCode: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Place Required'),
    Phone: Yup.string()
        .min(1, 'Too Short!')
        .max(10, 'Too Long!')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .required('Phone Required'),
    // Mobile: Yup.string()
    //     .min(1, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .matches(/^[0-9]+$/, 'Must be only digits')
    //     .required('Mobile Required'),
    // Fax: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('Fax Required'),
    Email: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Email Required'),
    ContactPerson: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ContactPerson Required'),
    IsActive: Yup.string().required('IsActives Required'),

    rememberMe: Yup.bool(),
})

// const SupplierEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
//     State,
//     Zone,
//     Country,
//     place,
//}) => {
const SupplierEdit = forwardRef((props, ref) => {
    const {
        onDrawerClose,
        editData,
        setMessage,
        setlog,
        State,
        Zone,
        Country,
        place,
    } = props
    const token = useSelector((state) => state.auth.session.token)

    const AddSupplier = async (values, token) => {
        try {
            const resp = await PostSupplier(values, token)
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
    const EditSupplier = async (values, token) => {
        try {
            const resp = await PutSupplier(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Supplier Already Exists') {
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
                innerRef={ref}
                initialValues={{
                    SupplierCode: editData.SupplierCode || '',
                    SupplierName: editData.SupplierName || '',
                    ShortName: editData.ShortName || '',
                    SupplierERPCode: editData.SupplierERPCode || '',
                    Address1: editData.Address1 || '',
                    Address2: editData.Address2 || '',
                    Pin: editData.Pin || '',
                    CountryCode: editData.Country?.CountryCode || '',
                    State: editData.State?.StateCode || '',
                    PlaceCode: editData.place?.PlaceCode || '',
                    Phone: editData.Phone || '',
                    Mobile: editData.Mobile || '',
                    Fax: editData.Fax || '',
                    Email: editData.Email || '',
                    ContactPerson: editData.ContactPerson || '',
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.SupplierCode) {
                            new Promise((resolve, reject) => {
                                AddSupplier(values, token)
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
                                EditSupplier(values, token)
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
                            <Field
                                type="SupplierCode"
                                autoComplete="off"
                                name="SupplierCode"
                                placeholder="SupplierCode name"
                                component={Input}
                                hidden
                            />
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3   gap-4">
                                    <div className="col-span-2">
                                        <FormItem
                                            asterisk
                                            label="SupplierName"
                                            invalid={
                                                errors.SupplierName &&
                                                touched.SupplierName
                                            }
                                            errorMessage={errors.SupplierName}
                                        >
                                            <Field
                                                type="SupplierName"
                                                autoComplete="off"
                                                name="SupplierName"
                                                placeholder="Supplier Name"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>

                                    <FormItem
                                        asterisk
                                        label="ShortName"
                                        invalid={
                                            errors.ShortName &&
                                            touched.ShortName
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
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormItem
                                        asterisk
                                        label="ERPCode"
                                        invalid={
                                            errors.SupplierERPCode &&
                                            touched.SupplierERPCode
                                        }
                                        errorMessage={errors.SupplierERPCode}
                                    >
                                        <Field
                                            type="SupplierERPCode"
                                            autoComplete="off"
                                            name="SupplierERPCode"
                                            placeholder="Supplier ERP Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        asterisk
                                        label="Pin"
                                        invalid={errors.Pin && touched.Pin}
                                        errorMessage={errors.Pin}
                                    >
                                        <Field
                                            type="Number"
                                            autoComplete="off"
                                            name="Pin"
                                            placeholder="Pin Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    asterisk
                                    label="Address1"
                                    invalid={
                                        errors.Address1 && touched.Address1
                                    }
                                    errorMessage={errors.Address1}
                                >
                                    <Field
                                        textArea
                                        type="Address1"
                                        autoComplete="off"
                                        name="Address1"
                                        placeholder="Address1"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Address2"
                                    invalid={
                                        errors.Address2 && touched.Address2
                                    }
                                    errorMessage={errors.Address2}
                                >
                                    <Field
                                        textArea
                                        type="Address2"
                                        autoComplete="off"
                                        name="Address2"
                                        placeholder="Address2"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                <FormItem
                                    asterisk
                                    label="State"
                                    invalid={errors.State && touched.State}
                                    errorMessage={errors.State}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="State"
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
                                                        values.State
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
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                <FormItem
                                    asterisk
                                    label="PlaceName"
                                    invalid={
                                        errors.PlaceCode && touched.PlaceCode
                                    }
                                    errorMessage={errors.PlaceCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="PlaceCode"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={place}
                                                value={place.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.PlaceCode
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormItem
                                    asterisk
                                    label="Phone"
                                    invalid={errors.Phone && touched.Phone}
                                    errorMessage={errors.Phone}
                                >
                                    <Field
                                        type="Phone"
                                        autoComplete="off"
                                        name="Phone"
                                        placeholder="Phone"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Mobile"
                                    invalid={errors.Mobile && touched.Mobile}
                                    errorMessage={errors.Mobile}
                                >
                                    <Field
                                        type="Mobile"
                                        autoComplete="off"
                                        name="Mobile"
                                        placeholder="Mobile"
                                        maxlength="10"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Fax"
                                    invalid={errors.Fax && touched.Fax}
                                    errorMessage={errors.Fax}
                                >
                                    <Field
                                        type="Fax"
                                        autoComplete="off"
                                        name="Fax"
                                        placeholder="Fax"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormItem
                                    asterisk
                                    label="Email"
                                    invalid={errors.Email && touched.Email}
                                    errorMessage={errors.Email}
                                >
                                    <Field
                                        type="Email"
                                        autoComplete="off"
                                        name="Email"
                                        placeholder="Email"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="ContactPerson"
                                    invalid={
                                        errors.ContactPerson &&
                                        touched.ContactPerson
                                    }
                                    errorMessage={errors.ContactPerson}
                                >
                                    <Field
                                        type="ContactPerson"
                                        autoComplete="off"
                                        name="ContactPerson"
                                        placeholder="ContactPerson"
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
                                    label="IsActive"
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
                            {/* <FormItem>
                                <Button variant="solid" type="submit">
                                    Submit
                                </Button>
                            </FormItem> */}
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

export default SupplierEdit
