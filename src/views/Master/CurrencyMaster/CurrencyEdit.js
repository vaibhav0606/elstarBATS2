import {
    FormItem,
    Button,
    Switcher,
    Input,
    FormContainer,
    Select,
    Upload,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Postcurrency, Putcurrency } from 'services/MasterService'
import { useSelector } from 'react-redux'
import React, { forwardRef } from 'react'
import { useState } from 'react'
import { FcImageFile } from 'react-icons/fc'

const validationSchema = Yup.object().shape({
    CurrencyName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('CurrencyName Required'),
    CurrencySymbol: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('CurrencySymbol Required'),
    ShortName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ShortName Required'),
    Currency_image: Yup.string().required('Currency image Required'),
    rememberMe: Yup.bool(),
})
const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
// const CurrencyEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
//     currency,
// }) => {
const CurrencyEdit = forwardRef((props, ref) => {
    const { onDrawerClose, editData, setMessage, setlog, currency } = props
    const token = useSelector((state) => state.auth.session.token)
    const [binaryData, setBinaryData] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    //console.log(currency)
    const MIN_UPLOAD = 1
    const MAX_UPLOAD = 1
    const beforeUpload = (file, fileList) => {
        let valid = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const MAX_FILE_SIZE = 500000

        if (fileList.length >= MAX_UPLOAD) {
            return `You can only upload ${MAX_UPLOAD} file(s)`
        }
        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }

                if (f.size >= MAX_FILE_SIZE) {
                    valid = 'Upload image cannot more then 500kb!'
                }
            }
        }

        return valid
    }

    const AddCurrency = async (values, token) => {
        try {
            const resp = await Postcurrency(values, token, binaryData)
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
    const EditCurrency = async (values, token) => {
        try {
            const resp = await Putcurrency(values, token, binaryData)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Currency is Already Exists') {
                setlog('warning')
                setMessage(resp.data.msg)
                return
            }
        } catch (errors) {
            return {}
        }
    }

    const handleImageChange = (file) => {
        if (file) {
            console.log(file)
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                console.log(reader.result)
                setPreviewSource(reader.result)
                setBinaryData(reader.result.slice(23)) // Remove data url part
                setErrorMessage('')
            }
        } else {
            setErrorMessage('Please select an image file of size up to 400KB.')
        }
    }
    return (
        <div>
            <Formik
                innerRef={ref}
                initialValues={{
                    CurrencyCode: editData.CurrencyCode || '',
                    CurrencyName: editData.CurrencyName || '',
                    Currency_image: editData.Currency_image || '',
                    CurrencySymbol: editData.CurrencySymbol || '',
                    ShortName: editData.ShortName || '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.CurrencyCode) {
                            new Promise((resolve, reject) => {
                                AddCurrency(values, token)
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
                                EditCurrency(values, token)
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
                            {editData.Currency_image ? (
                                <img
                                    src={`data:image/jpeg;base64,${editData.Currency_image}`}
                                    style={{
                                        height: '70px',
                                        width: '100px',
                                        marginBottom: 10,
                                    }}
                                />
                            ) : null}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field
                                    size="sm"
                                    type="CurrencyCode"
                                    autoComplete="off"
                                    name="CurrencyCode"
                                    placeholder="CurrencyCode name"
                                    component={Input}
                                    hidden
                                />

                                <FormItem
                                    asterisk
                                    label="Currency Name"
                                    invalid={
                                        errors.CurrencyName &&
                                        touched.CurrencyName
                                    }
                                    errorMessage={errors.CurrencyName}
                                >
                                    <Field
                                        size="sm"
                                        type="text"
                                        maxlength="30"
                                        autoComplete="off"
                                        name="CurrencyName"
                                        placeholder="Currency Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Currency Symbol"
                                    invalid={
                                        errors.CurrencySymbol &&
                                        touched.CurrencySymbol
                                    }
                                    errorMessage={errors.CurrencySymbol}
                                >
                                    <Field
                                        size="sm"
                                        type="text"
                                        autoComplete="off"
                                        name="CurrencySymbol"
                                        placeholder="Currency Symbol"
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
                                        size="sm"
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
                                    label="Currency mage"
                                    invalid={
                                        errors.Currency_image &&
                                        touched.Currency_image
                                    }
                                    errorMessage={errors.Currency_image}
                                >
                                    <Field name="Currency_image">
                                        {({ field, form }) => (
                                            <Upload
                                                style={{ height: '50px' }}
                                                draggable
                                                beforeUpload={beforeUpload}
                                                fileList={values.upload}
                                                onChange={(files) => {
                                                    const reader =
                                                        new FileReader()
                                                    const file = files[0]
                                                    if (
                                                        file &&
                                                        file.size < 400000
                                                    ) {
                                                        reader.readAsDataURL(
                                                            file
                                                        )
                                                        reader.onloadend =
                                                            () => {
                                                                form.setFieldValue(
                                                                    field.name,
                                                                    reader.result.slice(
                                                                        23
                                                                    )
                                                                )
                                                                // If you need to set the preview image as well, use the following line
                                                                setPreviewSource(
                                                                    reader.result
                                                                )
                                                            }
                                                    } else {
                                                        form.setFieldValue(
                                                            field.name,
                                                            null
                                                        )
                                                    }
                                                }}
                                                onFileRemove={(files) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        files
                                                    )
                                                }
                                            >
                                                <div className="text-center">
                                                    <div className="text-xl flex justify-center">
                                                        <FcImageFile />
                                                    </div>
                                                    <p className=" text-xs mt-1 opacity-60 dark:text-white">
                                                        Support: jpeg, png, gif
                                                    </p>
                                                </div>
                                            </Upload>
                                        )}
                                    </Field>
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

export default CurrencyEdit
