import { FormItem, Button, Switcher, Input, FormContainer, DatePicker, FormItemcompact } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PostAwardmaster, PutAwardmaster } from 'services/ProgrammingService'
import { useSelector } from 'react-redux'
import { HiCake } from 'react-icons/hi'

const validationSchema = Yup.object().shape({
    AwardName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('AwardName Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const AwardEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddAward = async (values, token) => {
        try {
            const resp = await PostAwardmaster(values, token)
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
    const EditAward = async (values, token) => {
        try {
            const resp = await PutAwardmaster(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Award Already Exists') {
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
                    AwardCode: editData.AwardCode || '',
                    AwardName: editData.AwardName || '',
                    AwardDate: editData.AwardDate || '',
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    console.log(editData)
                    setTimeout(() => {
                        if (!editData.AwardCode) {
                            new Promise((resolve, reject) => {
                                AddAward(values, token)
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
                                EditAward(values, token)
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
                                    type="AwardCode"
                                    autoComplete="off"
                                    name="AwardCode"
                                    placeholder="AwardCode"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    asterisk
                                    label="Award Name"
                                    invalid={
                                        errors.AwardName && touched.AwardName
                                    }
                                    errorMessage={errors.AwardName}
                                >
                                    <Field
                                        type="AwardName"
                                        autoComplete="off"
                                        name="AwardName"
                                        placeholder="Award Name"
                                        component={Input}
                                    />
                                </FormItem>
                                {/* <FormItem
                                    label="Date Of Award"
                                    invalid={
                                        errors.DateOfBirth &&
                                        touched.DateOfBirth
                                    }
                                    errorMessage={errors.DateOfBirth}
                                >
                                    <Field
                                        type="datetime-local"
                                        autoComplete="off"
                                        name="DateOfAward"
                                        placeholder="DateOfAward"
                                        component={Input}
                                    />
                                    </FormItem> */}

                                    <FormItemcompact  
                        label="Date Of Award"
                        invalid={errors.AwardDate && touched.AwardDate}
                        errorMessage={errors.AwardDate}
                    >
                        {/* <Field name="AwardDate" placeholder="Date">
                            {({ field, form }) => (
                                <DatePicker
                                    field={field}
                                    form={form}
                                    value={field.value}
                                    prefix={<HiCake className="text-xl" />}
                                    onChange={(date) => {
                                        form.setFieldValue(field.name, date)
                                    }}
                                />
                            )}
                        </Field> */}
                        <Field
                                        type="date"
                                        autoComplete="off"
                                        name="AwardDate"
                                        placeholder="DateOfAward"
                                        component={Input}
                                    />
                    </FormItemcompact>
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

export default AwardEdit
