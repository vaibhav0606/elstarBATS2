import { FormItem, Button, Switcher, Input, FormContainer } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PostEntity, PutEntity } from 'services/MasterService'
import { useSelector } from 'react-redux'
import enity from 'views/UsefullComp/Admin/Enity'
import InputField from 'views/Controls/InputField'

const validationSchema = Yup.object().shape({
    entityname: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Entity name Required'),
    PermAddress: Yup.string()
        .min(6, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Permanent Address Required'),
    CorpAddress: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Corp Address Required'),
    ContactPerson: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Contact Person Required'),
    Contact: Yup.string()
        .min(8, 'Too Short!')
        .max(12, 'Too Long!')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .required('Contact Required'),
    IsActive: Yup.string().required('IsActives Required'),
    PANNO: Yup.string()
        .min(3, 'Too Short!')
        .max(10, 'Too Long!')
        .required('PANNO Required'),
    CINNumber: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('CINNumber Required'),
    rememberMe: Yup.bool(),
})

const EntityEdit = ({ onDrawerClose, editData, setMessage, setlog }) => {
    const token = useSelector((state) => state.auth.session.token)

    const AddEntity = async (values, token) => {
        try {
            const resp = await PostEntity(values, token)
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
    const EditEntity = async (values, token) => {
        try {
            const resp = await PutEntity(values, token)
            console.log(resp)
            if (resp.data.msg === 'Updated') {
                setlog('success')
                setMessage('Data Updated Successfully')
                return
            } else if (resp.data.msg === 'Entity is Already Exists') {
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
                    EntityCode: editData.EntityCode,
                    entityname: editData.EntityName,
                    CorpAddress: editData.CorpAddress,
                    PermAddress: editData.PermAddress,
                    ContactPerson: editData.ContactPerson,
                    Contact: editData.Contact,
                    PANNO: editData.PANNO,
                    CINNumber: editData.CINNumber,
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.EntityCode) {
                            new Promise((resolve, reject) => {
                                AddEntity(values, token)
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
                                EditEntity(values, token)
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
                                type="EntityCode"
                                autoComplete="off"
                                name="EntityCode"
                                placeholder="EntityCode name"
                                component={Input}
                                hidden
                            />

                            <div class="flex flex-wrap">
                                {enity.map((item, index) => (
                                    <div
                                        key={index}
                                        style={{ width: item.width }}
                                        class="px-1"
                                    >
                                        <InputField
                                            lable={item.lable}
                                            placeholder={item.placeholder}
                                            max={item.max}
                                            name={item.name}
                                            type={item.type}
                                            errors={errors}
                                            touched={touched}
                                            asterisk={item.asterisk}
                                            category={item.category}
                                        />
                                    </div>
                                ))}
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

export default EntityEdit
