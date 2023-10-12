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
import { Postdepartment, Putdepartment } from 'services/MasterService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    DepartmentName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('DepartmentName Required'),
    ShortName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('ShortName Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
const DepartmentEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    currency,
}) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddDepartment = async (values, token) => {
        try {
            const resp = await Postdepartment(values, token)
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
    const EditDepartment = async (values, token) => {
        try {
            const resp = await Putdepartment(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Department is Already Exists') {
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
                    DepartmentCode: editData.DepartmentCode || '',
                    DepartmentName: editData.DepartmentName || '',
                    ShortName: editData.ShortName || '',
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.DepartmentCode) {
                            new Promise((resolve, reject) => {
                                AddDepartment(values, token)
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
                                EditDepartment(values, token)
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
                                    type="DepartmentCode"
                                    autoComplete="off"
                                    name="DepartmentCode"
                                    placeholder="DepartmentCode name"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    label="DepartmentName"
                                    invalid={
                                        errors.DepartmentName &&
                                        touched.DepartmentName
                                    }
                                    errorMessage={errors.DepartmentName}
                                >
                                    <Field
                                        size="sm"
                                        type="DepartmentName"
                                        autoComplete="off"
                                        name="DepartmentName"
                                        placeholder="Department name"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <FormItem
                                    label="ShortName"
                                    invalid={
                                        errors.ShortName && touched.ShortName
                                    }
                                    errorMessage={errors.ShortName}
                                >
                                    <Field
                                        size="sm"
                                        type="ShortName"
                                        autoComplete="off"
                                        name="ShortName"
                                        placeholder="ShortName name"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
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

export default DepartmentEdit
