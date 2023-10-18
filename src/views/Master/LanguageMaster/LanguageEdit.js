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
import { Postlanguage, Putlanguage } from 'services/MasterService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    LanguageName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Language Name Required'),
    CountryCode: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Country Name Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
const LanguageEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    currency,
}) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddLanguage = async (values, token) => {
        try {
            const resp = await Postlanguage(values, token)
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
    const EditLanguage = async (values, token) => {
        try {
            const resp = await Putlanguage(values, token)
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
                    LanguageCode: editData.LanguageCode || '',
                    LanguageName: editData.LanguageName || '',
                    CountryCode: editData.Country?.CountryCode,
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    console.log(editData)
                    setTimeout(() => {
                        if (!editData.LanguageCode) {
                            new Promise((resolve, reject) => {
                                AddLanguage(values, token)
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
                                EditLanguage(values, token)
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
                                    size="sm"
                                    type="LanguageCode"
                                    autoComplete="off"
                                    name="LanguageCode"
                                    placeholder="LanguageCode name"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    asterisk
                                    label="Language Name"
                                    invalid={
                                        errors.LanguageName &&
                                        touched.LanguageName
                                    }
                                    errorMessage={errors.LanguageName}
                                >
                                    <Field
                                        size="sm"
                                        type="text"
                                        maxlength="20"
                                        autoComplete="off"
                                        name="LanguageName"
                                        placeholder="Language Name"
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
                                                options={currency}
                                                value={currency.filter(
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

export default LanguageEdit
