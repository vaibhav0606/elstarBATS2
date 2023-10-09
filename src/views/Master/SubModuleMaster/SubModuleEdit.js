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
import { PostSubmodule, PutSubmodule } from 'services/MasterService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    SubModuleName: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('SubModuleName Required'),
    // ModuleName: Yup.string()
    //     .min(1, 'Too Short!')
    //     .max(50, 'Too Long!')
    //     .required('ModuleName Required'),
    IndexNum: Yup.number()
        .positive('Must be more than 0')
        .integer('Must be more than 0')
        .required('IndexNum Required'),

    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})

const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
const SubModuleEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    module,
}) => {
    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddSubModule = async (values, token) => {
        try {
            const resp = await PostSubmodule(values, token)
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
    const EditSubModule = async (values, token) => {
        try {
            const resp = await PutSubmodule(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Submodule is Already Exists') {
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
                    SubModuleCode: editData.SubModuleCode || '',
                    SubModuleName: editData.SubModuleName || '',
                    ModuleCode: editData.module?.ModuleCode,
                    IndexNum: editData.IndexNum || '',

                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    console.log('submitttt')
                    setTimeout(() => {
                        if (!editData.SubModuleCode) {
                            new Promise((resolve, reject) => {
                                AddSubModule(values, token)
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
                                EditSubModule(values, token)
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
                                    type="SubModuleCode"
                                    autoComplete="off"
                                    name="SubModuleCode"
                                    placeholder="SubModule name"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    label="SubModuleName"
                                    invalid={
                                        errors.SubModuleName &&
                                        touched.SubModuleName
                                    }
                                    errorMessage={errors.SubModuleName}
                                >
                                    <Field
                                        type="SubModuleName"
                                        autoComplete="off"
                                        name="SubModuleName"
                                        placeholder="SubModule Name"
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
                                    label="Module"
                                    invalid={
                                        errors.ModuleCode && touched.ModuleCode
                                    }
                                    errorMessage={errors.ModuleCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
                                        name="ModuleCode"
                                        style={{ width: '250px' }}
                                    >
                                        {({ field, form }) => (
                                            <Select
                                                style={{ width: '250px' }}
                                                field={field}
                                                form={form}
                                                className="mb-4 w-50"
                                                options={module}
                                                value={module.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.ModuleCode
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
                                    label="IndexNum"
                                    invalid={
                                        errors.IndexNum && touched.IndexNum
                                    }
                                    errorMessage={errors.IndexNum}
                                >
                                    <Field
                                        type="Number"
                                        autoComplete="off"
                                        name="IndexNum"
                                        placeholder="IndexNum name"
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

export default SubModuleEdit