import { FormItem, Button, Switcher, Input, FormContainer } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PostEntity, PutEntity } from 'services/MasterService'
import { useSelector } from 'react-redux'
import NumberFormat from 'react-number-format' 
import enity from 'views/UsefullComp/Admin/Enity' 
import InputField from 'views/Controls/InputField'
import { useEffect } from 'react'

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
        .min(10, 'Too Short!')
        .max(12, 'Too Long!')
        .matches(/^[0-9]+$/, "Must be only digits")
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
    const PriceInput = (props) => {
        return <Input {...props}  name="Contact" value={props.field.value} prefix="" />
    }
    const NumberFormatInput = ({ onValueChange, ...rest }) => {
        return (
            <NumberFormat
                customInput={Input}
                type="text"
                onValueChange={onValueChange}
                autoComplete="off"
                {...rest}
            />
        )
    }
    const withValueCap = (inputObj) => {
        const MAX_VAL = 9999999999;
        const { value } = inputObj;
        if (value <= MAX_VAL) return true;
        return false;
      };

     useEffect(() => {
        enity.map((D)=>{
            console.log(D)})
     }, [])
    
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


                                
                                <div   class="flex flex-wrap">
                                {enity.map((item, index) => (
                                   
                                       <div  key={index} style={{width:item.width}} class='px-1'> 
                                    <InputField lable={item.lable} placeholder={item.placeholder} name={item.name}type={item.type}errors={errors}touched={touched}asterisk={item.asterisk}/>
                                    </div>
                                    
                                        ))}
                                 </div>
                                        
                              
                            
                            {/* <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                
                                <FormItem
                                asterisk
                                    label="Contact Person"
                                    invalid={
                                        errors.ContactPerson &&
                                        touched.ContactPerson
                                    }
                                    errorMessage={
                                        <p className="text-xs italic">
                                            {errors.ContactPerson}
                                        </p>
                                    }
                                >
                                    <Field
                                        size="sm"
                                        type="ContactPerson"
                                        autoComplete="off"
                                        name="ContactPerson"
                                        placeholder="Contact Person"
                                        component={Input}
                                    />
                                </FormItem>
                            </div> */}
                            {/* <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <FormItem
                                asterisk
                                    label="Contact"
                                    invalid={errors.Contact && touched.Contact}
                                    errorMessage={
                                        <p className="text-xs italic">
                                            {errors.Contact}
                                        </p>
                                    }
                                >
                                      <Field name="Contact" component={Input} size="sm">
                            {({ field, form }) => {
                                return (
                                    <NumberFormatInput
                                    size="sm"
                                        form={form}
                                        field={field}
                                        name="Contact" 
                                        placeholder="Contact"
                                        customInput={PriceInput}
                                        isAllowed={withValueCap}
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                                </FormItem>
                                <FormItem
                                asterisk
                                    label="PAN NO"
                                    invalid={errors.PANNO && touched.PANNO}
                                    errorMessage={
                                        <p className="text-xs italic">
                                            {errors.PANNO}
                                        </p>
                                    }
                                >
                                    <Field
                                        size="sm"
                                        type="PANNO"
                                        autoComplete="off"
                                        name="PANNO"
                                        placeholder="PAN NO"
                                        component={Input}
                                    />
                                </FormItem>
                            </div> */}
                            {/* <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                                <FormItem
                                asterisk
                                    label="CIN Number"
                                    invalid={
                                        errors.CINNumber && touched.CINNumber
                                    }
                                    errorMessage={<p className="text-xs italic">
                                    {errors.CINNumber}</p>}
                                    // errorMessage={errors.CINNumber}
                                >
                                    <Field
                                        size="sm"
                                        type="CINNumber"
                                        autoComplete="off"
                                        name="CINNumber"
                                        placeholder="CIN Number"
                                        component={Input}
                                    />
                                </FormItem>
                            </div> */}
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
