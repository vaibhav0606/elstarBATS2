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
import { Postmodule, Putmodule } from 'services/MasterService'
import { useSelector } from 'react-redux'
import React, { forwardRef } from 'react'

const validationSchema = Yup.object().shape({
    ModuleName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Module Name Required'),
    IndexNum: Yup.number()
        .positive('Must be more than 0')
        .integer('Must be more than 0')
        .required('Index Number Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
const options = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]
// const ModuleEdit = ({
//     onDrawerClose,
//     editData,
//     setMessage,
//     setlog,
//     module,
// }) => {

    const ModuleEdit = forwardRef((props, ref) => {
        const {   onDrawerClose,
            editData,
            setMessage,
            setlog,
            module , } = props

    const token = useSelector((state) => state.auth.session.token)
    //console.log(currency)

    const AddModule = async (values, token) => {
        try {
            const resp = await Postmodule(values, token)
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
    const EditModule = async (values, token) => {
        try {
            const resp = await Putmodule(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Module is Already Exists') {
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
                    ModuleCode: editData.ModuleCode || '',
                    ModuleName: editData.ModuleName || '',
                    IndexNum: editData.IndexNum || '',

                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.ModuleCode) {
                            new Promise((resolve, reject) => {
                                AddModule(values, token)
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
                                EditModule(values, token)
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
                                    type="ModuleCode"
                                    autoComplete="off"
                                    name="ModuleCode"
                                    placeholder="ModuleCode Name"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    asterisk
                                    label="Module Name"
                                    invalid={
                                        errors.ModuleName && touched.ModuleName
                                    }
                                    errorMessage={errors.ModuleName}
                                >
                                    <Field
                                        size="sm"
                                        type="ModuleName"
                                        autoComplete="off"
                                        name="ModuleName"
                                        placeholder="Module Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    asterisk
                                    label="Index Number"
                                    invalid={
                                        errors.IndexNum && touched.IndexNum
                                    }
                                    errorMessage={errors.IndexNum}
                                >
                                    <Field
                                        size="sm"
                                        type="Number"
                                        autoComplete="off"
                                        name="IndexNum"
                                        placeholder="Index Number"
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
                                            size="sm"
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

export default ModuleEdit
