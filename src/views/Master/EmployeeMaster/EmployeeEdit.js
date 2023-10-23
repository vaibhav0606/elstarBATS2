import React, { forwardRef, useState, useEffect } from 'react'
import { FormContainer, Button, hooks, Alert } from 'components/ui'
import { StickyFooter, ConfirmDialog } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'
import PricingFields from './PricingFields'
import OrganizationFields from './OrganizationFields'
import ProductImages from './ProductImages'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { useLocation } from 'react-router'
import { PostEmp, PutEmp } from 'services/MasterService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    Emp_FirstName: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('FirstName Required'),
    Emp_Code: Yup.string()
        .min(1, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Code Required'),
    Emp_LastName: Yup.string()
        .min(1, 'Too Short!')
        .max(30, 'Too Long!')
        .required('LastName Required'),
    Emp_Email: Yup.string()
        .min(1, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Email Required'),
    Emp_Addr1: Yup.string()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Address Required'),
    PlaceCode: Yup.string().required('City Required'),
    StateCode: Yup.string().required('State Required'),
    CountryCode: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Country Required'),
    Emp_Contact1: Yup.string()
        .min(10, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Contact Required'),
    Emp_Grade: Yup.string().required('Grade Required'),
    Emp_DOB: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Date Of Birth Required'),
    Emp_DOJ: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Date of Join Required'),

    Emp_BloodGroup: Yup.string().required('BloodGroup Required'),
    DepartmentCode: Yup.string().required('DepartmentCode Required'),
    DesignationCode: Yup.string().required('DesignationCode Required'),
    Emp_Description: Yup.string()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Emp_Description Required'),
    RegionCode: Yup.string().required('RegionCode Required'),
    //IsActive: Yup.string().required('IsActives Required'),
    //rememberMe: Yup.bool(),
})

const AddLocation = async (values, token, setMessage, setlog, navigate) => {
    try {
        const resp = await PostEmp(values, token)
        if (resp.data.code == 200) {
            setlog('success')
            setMessage('Data Inserted Successfully')
            setTimeout(() => {
                navigate('/employee')
            }, 2000)
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
const EditLocation = async (values, token, setMessage, setlog, navigate) => {
    try {
        const resp = await PutEmp(values, token)
        if (resp.data.code == 200) {
            setlog('success')
            setMessage('Data Updated Successfully')
            setTimeout(() => {
                navigate('/employee')
            }, 2000)

            return
        } else if (resp.data.msg === 'Location is Already Exists') {
            setlog('warning')
            setMessage(resp.data.msg)
            return
        }
    } catch (errors) {
        return {}
    }
}

const ProductForm = forwardRef((props, ref) => {
    const navigate = useNavigate()
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')
    const { token } = useSelector((state) => state.auth.session)
    const { state } = useLocation()
    const initialData = {
        img: state?.editData.Emp_Image || '',
        imgList: [],
        tags: [],
        EmployeeCode: state?.editData.EmployeeCode || '',
        Emp_FirstName: state?.editData.Emp_FirstName || '',
        Emp_LastName: state?.editData.Emp_LastName || '',
        Emp_Code: state?.editData.Emp_Code || '',
        Emp_Email: state?.editData.Emp_Email || '',
        Emp_Addr1: state?.editData.Emp_Addr1 || '',
        Emp_Addr2: state?.editData.Emp_Addr2 || 'NA',
        PlaceCode: state?.editData.Place?.PlaceCode || '',
        StateCode: state?.editData.State?.StateCode || '',
        CountryCode: state?.editData.Country?.CountryCode || '',
        Emp_Contact1: state?.editData.Emp_Contact1 || '',
        Emp_Contact2: state?.editData.Emp_Contact2 || '',
        Emp_Grade: state?.editData.Emp_Grade || '',
        Emp_DOB: state?.editData.Emp_DOB || '',
        Emp_DOJ: state?.editData.Emp_DOJ || '',
        Emp_DOL: state?.editData.Emp_DOL || '',
        Emp_BloodGroup: state?.editData.Emp_BloodGroup || '',
        DepartmentCode: state?.editData.Department?.DepartmentCode || '',
        DesignationCode: state?.editData.Designation?.DesignationCode || '',
        ReportingTo: state?.editData.ReportingTo || '',
        Emp_Description: state?.editData.Emp_Description || '',
        RegionCode: state?.editData.Region?.RegionCode || '',
        IsActive: state?.editData.IsActive === 1 ? true : false,
    }
    const { type, onFormSubmit, onDiscard, onDelete } = props

    const newId = useUniqueId('product-')

    return (
        <>
            {message && (
                <Alert className="mb-4" type={log} showIcon>
                    {message}
                </Alert>
            )}

            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    tags: initialData?.tags
                        ? initialData.tags.map((value) => ({
                              label: value,
                              value,
                          }))
                        : [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    formData.tags = formData.tags.map((tag) => tag.value)

                    onFormSubmit?.(formData, setSubmitting)
                    setTimeout(() => {
                        if (state === null) {
                            new Promise((resolve, reject) => {
                                AddLocation(
                                    values,
                                    token,
                                    setMessage,
                                    setlog,
                                    navigate
                                )
                                    .then((response) => {
                                        resolve(response)
                                    })
                                    .catch((errors) => {
                                        reject(errors)
                                    })
                            })
                        } else {
                            new Promise((resolve, reject) => {
                                setSubmitting(false)
                                EditLocation(
                                    values,
                                    token,
                                    setMessage,
                                    setlog,
                                    navigate
                                )
                                    .then((response) => {
                                        resolve(response)
                                    })
                                    .catch((errors) => {
                                        reject(errors)
                                    })
                            })
                        }
                    }, 400)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                    <PricingFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        ecode={
                                            state === null
                                                ? null
                                                : state.editData
                                        }
                                    />
                                    <OrganizationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                                <div className="lg:col-span-1">
                                    <ProductImages
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                {/* <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete}
                                        />
                                    )}
                                </div> */}
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        onClick={() => navigate('/employee')}
                                        type="button"
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

ProductForm.defaultProps = {
    type: 'edit',
}

export default ProductForm
