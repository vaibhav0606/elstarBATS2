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
import { Postcurrency, Putcurrency } from 'services/MasterService'
import { useSelector } from 'react-redux'

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
    rememberMe: Yup.bool(),
})
const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
const CurrencyEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    currency,
}) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddCurrency = async (values, token) => {
        try {
            const resp = await Postcurrency(values, token)
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
            const resp = await Putcurrency(values, token)
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

    return (
        <div>
            <Formik
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Field
                                    type="CurrencyCode"
                                    autoComplete="off"
                                    name="CurrencyCode"
                                    placeholder="CurrencyCode name"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    label="CurrencyName"
                                    invalid={
                                        errors.CurrencyName &&
                                        touched.CurrencyName
                                    }
                                    errorMessage={errors.CurrencyName}
                                >
                                    <Field
                                        type="CurrencyName"
                                        autoComplete="off"
                                        name="CurrencyName"
                                        placeholder="Currency name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="CurrencySymbol"
                                    invalid={
                                        errors.CurrencySymbol &&
                                        touched.CurrencySymbol
                                    }
                                    errorMessage={errors.CurrencySymbol}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="CurrencySymbol"
                                        placeholder="CurrencySymbol name"
                                        component={Input}
                                    />
                                </FormItem>
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
                                        placeholder="Short name"
                                        component={Input}
                                    />
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

export default CurrencyEdit
