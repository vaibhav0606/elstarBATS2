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
import { PostForm, PutForm } from 'services/MasterService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    FormName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Form Name Required'),
    ModuleCode: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Module Name Required'),
    SubModuleCode: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('SubModule Name Required'),
    IndexNum: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Index Number Required'),
    WinFormName: Yup.string()
        .min(1, 'Too Short!')
        .max(300, 'Too Long!')
        .required('WinFormName Required'),
    FormImage: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('FormImage Required'),
    IS_MO: Yup.number()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('IS_MO Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
const FormEdit = ({
    onDrawerClose,
    editData,
    setMessage,
    setlog,
    Module,
    SubModule,
}) => {
    const token = useSelector((state) => state.auth.session.token)
    console.log(Module)

    const AddForm = async (values, token) => {
        try {
            const resp = await PostForm(values, token)
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
    const EditForm = async (values, token) => {
        try {
            const resp = await PutForm(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Form Already Exists') {
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
                    FormCode: editData.FormCode || '',
                    FormName: editData.FormName || '',
                    ModuleCode: editData.module?.ModuleCode || '',
                    SubModuleCode: editData.SubModule?.SubModuleCode || '',
                    IndexNum: editData.IndexNum || '',
                    WinFormName: editData.WinFormName || '',
                    FormImage: editData.FormImage || '',
                    IS_MO: editData.IS_MO || '',

                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.FormCode) {
                            new Promise((resolve, reject) => {
                                AddForm(values, token)
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
                                EditForm(values, token)
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
                                size="sm"
                                type="FormCode"
                                autoComplete="off"
                                name="FormCode"
                                placeholder="FormCode name"
                                component={Input}
                                hidden
                            />
                            <div class="flex flex-wrap">
                                <div style={{ width: '50%' }} className="px-1">
                                    <FormItem
                                        asterisk
                                        label="Form Name"
                                        invalid={
                                            errors.FormName && touched.FormName
                                        }
                                        errorMessage={errors.FormName}
                                    >
                                        <Field
                                            size="md"
                                            type="FormName"
                                            autoComplete="off"
                                            name="FormName"
                                            placeholder="Form Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div style={{ width: '50%' }} className="px-1">
                                    <FormItem
                                        asterisk
                                        label="Module Name"
                                        invalid={
                                            errors.ModuleCode &&
                                            touched.ModuleCode
                                        }
                                        errorMessage={errors.ModuleCode}
                                    >
                                        <Field name="ModuleCode">
                                            {({ field, form }) => (
                                                <Select
                                                    size="md"
                                                    field={field}
                                                    form={form}
                                                    options={Module}
                                                    value={Module.filter(
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
                                </div>
                                <div style={{ width: '50%' }} className="px-1">
                                    <FormItem
                                        asterisk
                                        label="SubModule Name"
                                        invalid={
                                            errors.SubModuleCode &&
                                            touched.SubModuleCode
                                        }
                                        errorMessage={errors.SubModuleCode}
                                        style={{ width: '250px' }}
                                    >
                                        <Field
                                            size="sm"
                                            name="SubModuleCode"
                                            style={{ width: '250px' }}
                                        >
                                            {({ field, form }) => (
                                                <Select
                                                    style={{ width: '250px' }}
                                                    field={field}
                                                    form={form}
                                                    className=" w-50"
                                                    options={SubModule}
                                                    value={SubModule.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values.SubModuleCode
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
                                <div style={{ width: '50%' }} className="px-1">
                                    <FormItem
                                        asterisk
                                        label="Index Number"
                                        invalid={
                                            errors.IndexNum && touched.IndexNum
                                        }
                                        errorMessage={errors.IndexNum}
                                    >
                                        <Field
                                            size="md"
                                            type="Index Number"
                                            autoComplete="off"
                                            name="IndexNum"
                                            placeholder="Index Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div style={{ width: '100%' }} className="px-1">
                                    <FormItem
                                        asterisk
                                        label="WinFormName"
                                        invalid={
                                            errors.WinFormName &&
                                            touched.WinFormName
                                        }
                                        errorMessage={errors.WinFormName}
                                    >
                                        <Field
                                            size="md"
                                            type="WinFormName"
                                            autoComplete="off"
                                            name="WinFormName"
                                            placeholder="WinFormName"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                {/* <FormItem
                                    label="FormImage"
                                    invalid={
                                        errors.FormImage && touched.FormImage
                                    }
                                    errorMessage={errors.FormImage}
                                >
                                    <Field size="sm"
                                        type="FormImage"
                                        autoComplete="off"
                                        name="FormImage"
                                        placeholder="FormImage"
                                        component={Input}
                                    />
                                </FormItem> */}

                                {/* <FormItem
                                    label="IS_MO"
                                    invalid={errors.IS_MO && touched.IS_MO}
                                    errorMessage={errors.IS_MO}
                                >
                                    <Field size="sm"
                                        type="Number"
                                        autoComplete="off"
                                        name="IS_MO"
                                        placeholder="IS_MO"
                                        component={Input}
                                    />
                                </FormItem> */}
                            </div>
                            <FormItem
                                label="Status"
                                invalid={errors.IsActive && touched.IsActive}
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

export default FormEdit
