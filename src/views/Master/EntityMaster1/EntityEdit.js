import { useEffect, useState } from 'react'
import {
    FormItem,
    Button,
    Switcher ,
    Input,
    FormContainer,
    Alert,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PostEntity,PutEntity } from 'services/ApiService2'
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
// console.log(validationSchema.fields)



const EntityEdit = ({onDrawerClose,editData,setMessage,setlog}) => {
    const token = useSelector((state) => state.auth.session.token)
   
    
    const AddEntity = async (values, token) => {
        try {
            const resp = await PostEntity(values, token)
            // console.log(resp.data)
            // console.log(resp.data.status)
            if (resp.data.status === 'success') {
                setlog("success")
                setMessage(resp.data.EntityName +" "+"Data Inserted Successfully")
                return
            }
            else if(resp.data.detail === 'Server Error'){
                setlog("error")
                setMessage("Server Error")
                return
            }
            
        } catch (errors) {
            return {}
        }
    }
    const EditEntity = async (values, token) => {
        try {
            const resp = await PutEntity(values, token)
             console.log(resp.data)
            if (resp.data.status === 'Updated') {
                setlog("success")
                setMessage(resp.data.EntityName +" "+"Data Updated Successfully")
                return
            }
            else if(resp.data.detail === 'Server Error'){
                setlog("error")
                setMessage("Server Error")
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
                    IsActive: editData.IsActive === 1 ? true : false ,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting}) => {
                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2))
                        if(!editData.EntityCode)
                        {
                        AddEntity(values, token)
                        onDrawerClose(0,0)
                        }
                        else{
                            EditEntity(values, token)
                            onDrawerClose(0,0)
                        }
                        setSubmitting(false)
                        resetForm()
                        // onDrawerClose(0,0)
                    }, 400)
                }}

            >
                {({ values, touched, errors, resetForm }) => (
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
                                        placeholder="CorpAddress name"
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
                                        placeholder="PermAddress name"
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
                                        placeholder="ContactPerson name"
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
                                        placeholder="Contact name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="PANNO"
                                    invalid={errors.PANNO && touched.PANNO}
                                    errorMessage={errors.PANNO}
                                >
                                    <Field
                                        type="PANNO"
                                        autoComplete="off"
                                        name="PANNO"
                                        placeholder="PANNO name"
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
                                {/* <FormItem
                                    asterisk
                                    label="Select"
                                    invalid={
                                        errors.IsActive && touched.IsActive
                                    }
                                    errorMessage={errors.IsActive}
                                >
                                    <Field name="IsActive">
                                        {({ field, form }) => (
                                            <Select
                                                field={field}
                                                form={form}
                                                options={options}
                                                value={options.filter(
                                                    (option) =>
                                                        option.value ===
                                                        values.IsActive
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
                                </FormItem> */}
                               <FormItem
                                asterisk
                                label="Status"
                                invalid={errors.IsActive && touched.IsActive}
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
                                    label="CINNumber"
                                    invalid={
                                        errors.CINNumber && touched.CINNumber
                                    }
                                    errorMessage={errors.CINNumber}
                                >
                                    <Field
                                        type="CINNumber"
                                        autoComplete="off"
                                        name="CINNumber"
                                        placeholder="CINNumber name"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <FormItem>
                                {/* <Button
                                    type="reset"
                                    className="ltr:mr-2 rtl:ml-2"
                                    onClick={() => resetdata()}
                                >
                                    Reset
                                </Button> */}
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
