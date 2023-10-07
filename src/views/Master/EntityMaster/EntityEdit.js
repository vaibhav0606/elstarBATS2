import { FormItem, Button, Switcher, Input, FormContainer } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PostEntity, PutEntity } from 'services/MasterService'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
    entityname: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Entity name Required'),
    PermAddress: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Perm Address Required'),
    CorpAddress: Yup.string()
        .min(3, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Corp Address Required'),
    ContactPerson: Yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Contact Person Required'),
    Contact: Yup.string()
        .min(3, 'Too Short!')
        .max(10, 'Too Long!')
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
    // password: Yup.string()
    //     .required('Password Required')
    //     .min(8, 'Too Short!')
    //     .matches(/^[A-Za-z0-9_-]*$/, 'Only Letters & Numbers Allowed'),
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
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Field
                                    type="EntityCode"
                                    autoComplete="off"
                                    name="EntityCode"
                                    placeholder="EntityCode name"
                                    component={Input}
                                    hidden
                                />
                                <FormItem
                                    label="EntityName"
                                    invalid={
                                        errors.entityname && touched.entityname
                                    }
                                    errorMessage={errors.entityname}
                                >
                                    <Field
                                        type="entityname"
                                        autoComplete="off"
                                        name="entityname"
                                        placeholder="Entity name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="CorpAddress"
                                    invalid={
                                        errors.CorpAddress &&
                                        touched.CorpAddress
                                    }
                                    errorMessage={errors.CorpAddress}
                                >
                                    <Field
                                        type="CorpAddress"
                                        autoComplete="off"
                                        name="CorpAddress"
                                        placeholder="Corp Address"
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
                                    label="PermAddress"
                                    invalid={
                                        errors.PermAddress &&
                                        touched.PermAddress
                                    }
                                    errorMessage={errors.PermAddress}
                                >
                                    <Field
                                        type="PermAddress"
                                        autoComplete="off"
                                        name="PermAddress"
                                        placeholder="Perm Address"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
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
                                        placeholder="Contact Person"
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
                                    label="Contact"
                                    invalid={errors.Contact && touched.Contact}
                                    errorMessage={errors.Contact}
                                >
                                    <Field
                                        type="Number"
                                        autoComplete="off"
                                        name="Contact"
                                        placeholder="Contact"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="PAN NO"
                                    invalid={errors.PANNO && touched.PANNO}
                                    errorMessage={errors.PANNO}
                                >
                                    <Field
                                        type="PANNO"
                                        autoComplete="off"
                                        name="PANNO"
                                        placeholder="PAN NO"
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
                                <FormItem
                                    label="CIN Number"
                                    invalid={
                                        errors.CINNumber && touched.CINNumber
                                    }
                                    errorMessage={errors.CINNumber}
                                >
                                    <Field
                                        type="CINNumber"
                                        autoComplete="off"
                                        name="CINNumber"
                                        placeholder="CIN Number"
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

export default EntityEdit
