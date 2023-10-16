import {
    FormItem,
    Button,
    Switcher,
    Input,
    FormContainer,
    Select,
    ScrollBar,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PostEmp, PutEmp } from 'services/MasterService'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import NumberFormat from 'react-number-format'

const PriceInput = (props) => {
    return (
        <Input {...props} name="Contact" value={props.field.value} prefix="" />
    )
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
    const MAX_VAL = 9999999999
    const { value } = inputObj
    if (value <= MAX_VAL) return true
    return false
}

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
    CityCode: Yup.string().required('City Required'),
    StateCode: Yup.string().required('State Required'),
    CountryCode: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Country Required'),
    Emp_Contact1: Yup.string()
        .min(10, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Contact1 Required'),
    Emp_Contact2: Yup.string()
        .min(10, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Contact2 Required'),
    Emp_Grade: Yup.string().required('Grade Required'),
    Emp_DOB: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Date Of Birth Required'),
    Emp_DOJ: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Date of Join Required'),
    Emp_DOL: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Emp_DOL Required'),
    Emp_BloodGroup: Yup.string().required('Emp_BloodGroup Required'),
    DepartmentCode: Yup.string().required('DepartmentCode Required'),
    DesignationCode: Yup.string().required('DesignationCode Required'),
    ReportingTo: Yup.string().required('ReportingTo Required'),
    Emp_Description: Yup.string()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Emp_Description Required'),
    RegionCode: Yup.string().required('RegionCode Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})

const EmpDemo = [{ value: '', label: 'Data Not Found' }]
const options2 = [
    { value: 'A+', label: 'A Positive' },
    { value: 'A-', label: 'A Negative' },
    { value: 'B+', label: 'B Positive' },
    { value: 'B-', label: 'B Negative' },
    { value: 'O-', label: 'O Negative' },
    { value: 'O+', label: 'O Positive' },
    { value: 'AB-', label: 'AB Positive' },
    { value: 'AB+', label: 'AB Negative' },
]
const options = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
]
const EmployeeEdit = ({
    onDialogClose,
    editData,
    setMessage,
    setlog,
    Designation,
    Place,
    State,
    Department,
    Country,
    Region,
    Emp,
    onDialogOk,
    setCurrentTab,
    tab,
    count,
    setcount,
}) => {
    const token = useSelector((state) => state.auth.session.token)
    const [game, setGame] = useState(1)
    const AddLocation = async (values, token) => {
        try {
            const resp = await PostEmp(values, token)
            onDialogClose(resp.data.EmployeeCode)
            if (resp.data.code == 200) {
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
    const EditLocation = async (values, token) => {
        try {
            const resp = await PutEmp(values, token)
            console.log(resp.data.code)
            onDialogClose(resp.data.EmployeeCode)
            if (resp.data.code == 200) {
                setlog('success')
                setMessage('Data Updated Successfully')
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

    return (
        <Formik
            initialValues={{
                EmployeeCode: editData.EmployeeCode || '',
                Emp_FirstName: editData.Emp_FirstName || '',
                Emp_LastName: editData.Emp_LastName || '',
                Emp_Code: editData.Emp_Code || '',
                Emp_Email: editData.Emp_Email || '',
                Emp_Addr1: editData.Emp_Addr1 || '',
                Emp_Addr2:
                    editData.Emp_Addr2 ||
                    '1111111111111111111111111111111111111111',
                CityCode: editData.Place?.PlaceCode || '',
                StateCode: editData.State?.StateCode || '',
                CountryCode: editData.Country?.CountryCode || '',
                Emp_Contact1: editData.Emp_Contact1 || '',
                Emp_Contact2: editData.Emp_Contact2 || '',
                Emp_Grade: editData.Emp_Grade || '',
                Emp_DOB: editData.Emp_DOB || '',
                Emp_DOJ: editData.Emp_DOJ || '',
                Emp_DOL: editData.Emp_DOL || '',
                Emp_BloodGroup: editData.Emp_BloodGroup || '',
                DepartmentCode: editData.Department?.DepartmentCode || '',
                DesignationCode: editData.Designation?.DesignationCode || '',
                ReportingTo: editData.ReportingTo || '',
                Emp_Description: editData.Emp_Description || '',
                RegionCode: editData.Region?.RegionCode || '',
                IsActive: editData.IsActive === 1 ? true : false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
                setTimeout(() => {
                    if (!editData.EmployeeCode) {
                        new Promise((resolve, reject) => {
                            AddLocation(values, token)
                                .then((response) => {
                                    onDialogClose(response)
                                    setCurrentTab(tab)
                                    if (game > 2) {
                                        setGame(1)
                                        setcount(1)
                                    } else {
                                        setcount(count + 1)
                                        setGame(game + 1)
                                    }
                                    resolve(response)
                                })
                                .catch((errors) => {
                                    setCurrentTab(tab)
                                    if (game > 2) {
                                        setGame(1)
                                        setcount(1)
                                    } else {
                                        setcount(count + 1)
                                        setGame(game + 1)
                                    }
                                    reject(errors)
                                })
                        })
                    } else {
                        new Promise((resolve, reject) => {
                            setSubmitting(false)
                            EditLocation(values, token)
                                .then((response) => {
                                    setCurrentTab(tab)
                                    if (game > 2) {
                                        setGame(1)
                                        setcount(1)
                                    } else {
                                        setcount(count + 1)
                                        setGame(game + 1)
                                    }
                                    resolve(response)
                                })
                                .catch((errors) => {
                                    setCurrentTab(tab)
                                    if (game > 2) {
                                        setGame(1)
                                        setcount(1)
                                    } else {
                                        setcount(count + 1)
                                        setGame(game + 1)
                                    }
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
                            size="xs"
                            type="EmployeeCode"
                            autoComplete="off"
                            name="EmployeeCode"
                            placeholder="EmployeeCode"
                            component={Input}
                            hidden
                        />
                        <div className="overflow-y-auto h-96 mb-6">
                            <ScrollBar>
                                <div class="flex flex-wrap">
                                    <div
                                        class="px-1"
                                        style={{
                                            width: '15%',
                                            height: '1.50rem',
                                        }}
                                    >
                                        <FormItem
                                            label="First Name"
                                            invalid={
                                                errors.Emp_FirstName &&
                                                touched.Emp_FirstName
                                            }
                                            errorMessage={errors.Emp_FirstName}
                                        >
                                            <Field
                                                size="xs"
                                                maxLength="30"
                                                type="Emp_FirstName"
                                                autoComplete="off"
                                                name="Emp_FirstName"
                                                placeholder="First Name"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <div class="px-1" style={{ width: '15%' }}>
                                        <FormItem
                                            label="Last Name"
                                            invalid={
                                                errors.Emp_LastName &&
                                                touched.Emp_LastName
                                            }
                                            errorMessage={errors.Emp_LastName}
                                        >
                                            <Field
                                                size="xs"
                                                maxLength="30"
                                                type="Emp_LastName"
                                                autoComplete="off"
                                                name="Emp_LastName"
                                                placeholder="Last Name"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            label="Code"
                                            invalid={
                                                errors.Emp_Code &&
                                                touched.Emp_Code
                                            }
                                            errorMessage={errors.Emp_Code}
                                        >
                                            <Field
                                                size="xs"
                                                maxLength="10"
                                                type="Emp_Code"
                                                autoComplete="off"
                                                name="Emp_Code"
                                                placeholder="Emp Code"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            asterisk
                                            label="Contact1"
                                            invalid={
                                                errors.Emp_Contact1 &&
                                                touched.Emp_Contact1
                                            }
                                            errorMessage={
                                                <p className="text-xs italic">
                                                    {errors.Emp_Contact1}
                                                </p>
                                            }
                                        >
                                            <Field
                                                name="Emp_Contact1"
                                                component={Input}
                                                size="xs"
                                            >
                                                {({ field, form }) => {
                                                    return (
                                                        <NumberFormatInput
                                                            focused
                                                            size="xs"
                                                            form={form}
                                                            field={field}
                                                            name="Emp_Contact1"
                                                            placeholder="
                                                                Contact1"
                                                            customInput={
                                                                PriceInput
                                                            }
                                                            isAllowed={
                                                                withValueCap
                                                            }
                                                            onValueChange={(
                                                                e
                                                            ) => {
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
                                    </div>
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            asterisk
                                            label="Contact2"
                                            invalid={
                                                errors.Emp_Contact2 &&
                                                touched.Emp_Contact2
                                            }
                                            errorMessage={
                                                <p className="text-xs italic">
                                                    {errors.Emp_Contact2}
                                                </p>
                                            }
                                        >
                                            <Field
                                                name="Emp_Contact2"
                                                component={Input}
                                                size="xs"
                                            >
                                                {({ field, form }) => {
                                                    return (
                                                        <NumberFormatInput
                                                            focused
                                                            size="xs"
                                                            form={form}
                                                            field={field}
                                                            name="Emp_Contact2"
                                                            placeholder="
                                                                Contact2"
                                                            customInput={
                                                                PriceInput
                                                            }
                                                            isAllowed={
                                                                withValueCap
                                                            }
                                                            onValueChange={(
                                                                e
                                                            ) => {
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
                                    </div>
                                    <div class="px-1" style={{ width: '15%' }}>
                                        <FormItem
                                            label="Date Of Birth"
                                            invalid={
                                                errors.Emp_DOB &&
                                                touched.Emp_DOB
                                            }
                                            errorMessage={errors.Emp_DOB}
                                        >
                                            <Field
                                                size="xs"
                                                type="date"
                                                autoComplete="off"
                                                name="Emp_DOB"
                                                placeholder=""
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            label="Date Of Join"
                                            invalid={
                                                errors.Emp_DOJ &&
                                                touched.Emp_DOJ
                                            }
                                            errorMessage={errors.Emp_DOJ}
                                        >
                                            <Field
                                                size="xs"
                                                type="date"
                                                autoComplete="off"
                                                name="Emp_DOJ"
                                                placeholder="Emp_DOJ"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            label="Date Of Leaving"
                                            invalid={
                                                errors.Emp_DOL &&
                                                touched.Emp_DOL
                                            }
                                            errorMessage={errors.Emp_DOL}
                                        >
                                            <Field
                                                size="xs"
                                                type="date"
                                                autoComplete="off"
                                                name="Emp_DOL"
                                                placeholder="Emp_DOL"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>

                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            label="Email"
                                            invalid={
                                                errors.Emp_Email &&
                                                touched.Emp_Email
                                            }
                                            errorMessage={errors.Emp_Email}
                                        >
                                            <Field
                                                size="xs"
                                                maxLength="30"
                                                type="Email"
                                                autoComplete="off"
                                                name="Emp_Email"
                                                placeholder="Email"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            asterisk
                                            label="Blood Group"
                                            invalid={
                                                errors.Emp_BloodGroup &&
                                                touched.Emp_BloodGroup
                                            }
                                            errorMessage={errors.Emp_BloodGroup}
                                            style={{ width: '250px' }}
                                        >
                                            <Field
                                                size="xs"
                                                name="Emp_BloodGroup"
                                                style={{
                                                    width: '250px',
                                                    height: 10,
                                                }}
                                            >
                                                {({ field, form }) => (
                                                    <Select
                                                        size="xs"
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                        field={field}
                                                        form={form}
                                                        className="mb-4 w-50"
                                                        options={options2}
                                                        value={options2.filter(
                                                            (option) =>
                                                                option.value ===
                                                                values.Emp_BloodGroup
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
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            asterisk
                                            label="Reporting"
                                            invalid={
                                                errors.ReportingTo &&
                                                touched.ReportingTo
                                            }
                                            errorMessage={errors.ReportingTo}
                                            style={{ width: '250px' }}
                                        >
                                            <Field
                                                size="xs"
                                                name="ReportingTo"
                                                style={{ width: '250px' }}
                                            >
                                                {({ field, form }) => (
                                                    <Select
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                        size="xs"
                                                        field={field}
                                                        form={form}
                                                        className="mb-4 w-50"
                                                        options={
                                                            Emp.length > 2
                                                                ? Emp
                                                                : EmpDemo
                                                        }
                                                        value={
                                                            Emp.length > 2
                                                                ? Emp.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.ReportingTo
                                                                  )
                                                                : EmpDemo.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.ReportingTo
                                                                  )
                                                        }
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
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            asterisk
                                            label="Grade"
                                            invalid={
                                                errors.Emp_Grade &&
                                                touched.Emp_Grade
                                            }
                                            errorMessage={errors.Emp_Grade}
                                            style={{ width: '250px' }}
                                        >
                                            <Field
                                                size="xs"
                                                name="Emp_Grade"
                                                style={{ width: '250px' }}
                                            >
                                                {({ field, form }) => (
                                                    <Select
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                        size="xs"
                                                        field={field}
                                                        form={form}
                                                        className="mb-4 w-50"
                                                        options={options}
                                                        value={options.filter(
                                                            (option) =>
                                                                option.value ===
                                                                values.Emp_Grade
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
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            asterisk
                                            label="Designation"
                                            invalid={
                                                errors.DesignationCode &&
                                                touched.DesignationCode
                                            }
                                            errorMessage={
                                                errors.DesignationCode
                                            }
                                            style={{ width: '250px' }}
                                        >
                                            <Field
                                                size="xs"
                                                name="DesignationCode"
                                                style={{
                                                    width: '250px',
                                                    height: 20,
                                                }}
                                            >
                                                {({ field, form }) => (
                                                    <Select
                                                        style={{
                                                            width: '250px',
                                                            height: 20,
                                                        }}
                                                        size="xs"
                                                        field={field}
                                                        form={form}
                                                        options={
                                                            Designation.length >
                                                            2
                                                                ? Designation
                                                                : EmpDemo
                                                        }
                                                        value={
                                                            Designation.length >
                                                            2
                                                                ? Designation.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.DesignationCode
                                                                  )
                                                                : EmpDemo.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.ReportingTo
                                                                  )
                                                        }
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
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            asterisk
                                            label="City"
                                            invalid={
                                                errors.CityCode &&
                                                touched.CityCode
                                            }
                                            errorMessage={errors.CityCode}
                                            style={{ width: '250px' }}
                                        >
                                            <Field
                                                size="xs"
                                                name="CityCode"
                                                style={{ width: '250px' }}
                                            >
                                                {({ field, form }) => (
                                                    <Select
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                        size="xs"
                                                        field={field}
                                                        form={form}
                                                        className="mb-4 w-50"
                                                        options={
                                                            Place.length > 2
                                                                ? Place
                                                                : EmpDemo
                                                        }
                                                        value={
                                                            Place.length > 2
                                                                ? Place.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.CityCode
                                                                  )
                                                                : EmpDemo.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.ReportingTo
                                                                  )
                                                        }
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
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            asterisk
                                            label="Department"
                                            invalid={
                                                errors.DepartmentCode &&
                                                touched.DepartmentCode
                                            }
                                            errorMessage={errors.DepartmentCode}
                                            style={{ width: '250px' }}
                                        >
                                            <Field
                                                size="xs"
                                                name="DepartmentCode"
                                                style={{ width: '250px' }}
                                            >
                                                {({ field, form }) => (
                                                    <Select
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                        size="xs"
                                                        field={field}
                                                        form={form}
                                                        className="mb-4 w-50"
                                                        options={
                                                            Department.length >
                                                            2
                                                                ? Department
                                                                : EmpDemo
                                                        }
                                                        value={
                                                            Department.length >
                                                            2
                                                                ? Department.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.DepartmentCode
                                                                  )
                                                                : EmpDemo.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.ReportingTo
                                                                  )
                                                        }
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
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            asterisk
                                            label="State"
                                            invalid={
                                                errors.StateCode &&
                                                touched.StateCode
                                            }
                                            errorMessage={errors.StateCode}
                                            style={{ width: '250px' }}
                                        >
                                            <Field
                                                size="xs"
                                                name="StateCode"
                                                style={{ width: '250px' }}
                                            >
                                                {({ field, form }) => (
                                                    <Select
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                        size="xs"
                                                        field={field}
                                                        form={form}
                                                        className="mb-4 w-50"
                                                        options={
                                                            State.length > 2
                                                                ? State
                                                                : EmpDemo
                                                        }
                                                        value={
                                                            State.length > 2
                                                                ? State.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.StateCode
                                                                  )
                                                                : EmpDemo.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.ReportingTo
                                                                  )
                                                        }
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
                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            asterisk
                                            label="Country "
                                            invalid={
                                                errors.CountryCode &&
                                                touched.CountryCode
                                            }
                                            errorMessage={errors.CountryCode}
                                            style={{ width: '250px' }}
                                        >
                                            <Field
                                                size="xs"
                                                name="CountryCode"
                                                style={{ width: '250px' }}
                                            >
                                                {({ field, form }) => (
                                                    <Select
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                        size="xs"
                                                        field={field}
                                                        form={form}
                                                        className="mb-4 w-50"
                                                        options={
                                                            Country.length > 2
                                                                ? Country
                                                                : EmpDemo
                                                        }
                                                        value={
                                                            Country.length > 2
                                                                ? Country.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.CountryCode
                                                                  )
                                                                : EmpDemo.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.ReportingTo
                                                                  )
                                                        }
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

                                    <div class="px-1" style={{ width: '20%' }}>
                                        <FormItem
                                            asterisk
                                            label="Region"
                                            invalid={
                                                errors.RegionCode &&
                                                touched.RegionCode
                                            }
                                            errorMessage={errors.RegionCode}
                                            style={{ width: '250px' }}
                                        >
                                            <Field
                                                size="xs"
                                                name="RegionCode"
                                                style={{ width: '250px' }}
                                            >
                                                {({ field, form }) => (
                                                    <Select
                                                        style={{
                                                            width: '250px',
                                                        }}
                                                        size="xs"
                                                        field={field}
                                                        form={form}
                                                        className="mb-4 w-50"
                                                        options={
                                                            Region.length > 2
                                                                ? Region
                                                                : EmpDemo
                                                        }
                                                        value={
                                                            Region.length > 2
                                                                ? Region.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.RegionCode
                                                                  )
                                                                : EmpDemo.filter(
                                                                      (
                                                                          option
                                                                      ) =>
                                                                          option.value ===
                                                                          values.ReportingTo
                                                                  )
                                                        }
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
                                    <div class="px-1">
                                        <FormItem
                                            label="Status"
                                            invalid={
                                                errors.IsActive &&
                                                touched.IsActive
                                            }
                                            errorMessage={errors.IsActive}
                                        >
                                            <div>
                                                <Field
                                                    size="xs"
                                                    name="IsActive"
                                                    component={Switcher}
                                                />
                                            </div>
                                        </FormItem>
                                    </div>
                                    <div class="px-1" style={{ width: '80%' }}>
                                        <FormItem
                                            label="Description"
                                            invalid={
                                                errors.Emp_Description &&
                                                touched.Emp_Description
                                            }
                                            errorMessage={
                                                errors.Emp_Description
                                            }
                                        >
                                            <Field
                                                size="xs"
                                                maxLength="100"
                                                type="Emp_Description"
                                                autoComplete="off"
                                                name="Emp_Description"
                                                placeholder=" Description"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <div class="px-1" style={{ width: '80%' }}>
                                        <FormItem
                                            label="Address"
                                            invalid={
                                                errors.Emp_Addr1 &&
                                                touched.Emp_Addr1
                                            }
                                            errorMessage={errors.Emp_Addr1}
                                        >
                                            <Field
                                                size="xs"
                                                type="Emp_Addr1"
                                                maxLength="100"
                                                autoComplete="off"
                                                name="Emp_Addr1"
                                                placeholder="Address"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    {/* <div class="px-1" style={{ width: '100%' }}> */}
                                    {/* <FormItem
                                            label="Address Line 2"
                                            invalid={
                                                errors.Emp_Addr2 &&
                                                touched.Emp_Addr2
                                            }
                                            errorMessage={errors.Emp_Addr2}
                                        > */}
                                    <Field
                                        size="xs"
                                        maxLength="100"
                                        type="Emp_Addr2"
                                        autoComplete="off"
                                        name="Emp_Addr2"
                                        placeholder="Address Line 2"
                                        component={Input}
                                        hidden
                                    />
                                    {/* </FormItem> */}
                                    {/* </div> */}
                                </div>
                            </ScrollBar>
                        </div>
                        <FormItem class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {/* <Button variant="solid" type="button">
                                Submit
                            </Button> */}
                            {game > 3 ? null : (
                                <Button
                                    className="mr-2 mb-2 "
                                    variant="solid"
                                    type="submit"
                                >
                                    Save And Next
                                </Button>
                            )}
                            &nbsp; &nbsp;
                            <Button
                                className="mr-2 mb-2"
                                variant="twoTone"
                                color="red-600"
                                type="reset"
                                onClick={() => onDialogOk(0, 0)}
                            >
                                Close
                            </Button>
                            {/* <Button
                                        className="mr-2 mb-2"
                                        variant="twoTone"
                                        color="red-600"
                                        onClick={() => onDialogOk(0, 0)}
                                    >
                                        Cancel
                                    </Button> */}
                        </FormItem>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default EmployeeEdit
