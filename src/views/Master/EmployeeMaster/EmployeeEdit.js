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

const validationSchema = Yup.object().shape({
    Emp_FirstName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Emp_FirstName Required'),
    Emp_Code: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Emp_Code Required'),
    Emp_LastName: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Emp_LastName Required'),
    Emp_Email: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Emp_Email Required'),
    Emp_Addr1: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Emp_Addr1 Required'),
    Emp_Addr2: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Emp_Addr2 Required'),
    CityCode: Yup.string().required('CityCode Required'),
    StateCode: Yup.string().required('StateCode Required'),
    CountryCode: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('CountryCode Required'),
    Emp_Contact1: Yup.string()
        .min(10, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Emp_Contact1 Required'),
    Emp_Contact2: Yup.string()
        .min(10, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Emp_Contact2 Required'),
    Emp_Grade: Yup.string().required('Emp_Grade Required'),
    Emp_DOB: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Emp_DOB Required'),
    Emp_DOJ: Yup.string()
        .min(1, 'Too Short!')
        .max(200, 'Too Long!')
        .required('Emp_DOJ Required'),
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
        .max(200, 'Too Long!')
        .required('Emp_Description Required'),
    RegionCode: Yup.string().required('RegionCode Required'),
    IsActive: Yup.string().required('IsActives Required'),
    rememberMe: Yup.bool(),
})
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
            console.log(resp.data.code);
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
                Emp_Addr2: editData.Emp_Addr2 || '',
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
                                    onDialogClose(response
                                        )
                                    setCurrentTab(tab)
                                    if (game > 2) {
                                        setGame(1)
                                        setcount(1)
                                    } else {
                                        setcount(count+1)
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
                                    setcount(count+1)
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
                                        setcount(count+1)
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
                                        setcount(count+1)
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
                            size="sm"
                            type="EmployeeCode"
                            autoComplete="off"
                            name="EmployeeCode"
                            placeholder="EmployeeCode"
                            component={Input}
                            hidden
                        />
                        <div className="overflow-y-auto h-96 mb-6">
                            <ScrollBar>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
                                    <FormItem
                                        label="First Name"
                                        invalid={
                                            errors.Emp_FirstName &&
                                            touched.Emp_FirstName
                                        }
                                        errorMessage={errors.Emp_FirstName}
                                    >
                                        <Field
                                            size="sm"
                                            type="Emp_FirstName"
                                            autoComplete="off"
                                            name="Emp_FirstName"
                                            placeholder="First Name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Last Name"
                                        invalid={
                                            errors.Emp_LastName &&
                                            touched.Emp_LastName
                                        }
                                        errorMessage={errors.Emp_LastName}
                                    >
                                        <Field
                                            size="sm"
                                            type="Emp_LastName"
                                            autoComplete="off"
                                            name="Emp_LastName"
                                            placeholder="Last Name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Emp Code"
                                        invalid={
                                            errors.Emp_Code && touched.Emp_Code
                                        }
                                        errorMessage={errors.Emp_Code}
                                    >
                                        <Field
                                            size="sm"
                                            type="Emp_Code"
                                            autoComplete="off"
                                            name="Emp_Code"
                                            placeholder="Emp Code"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Emp Contact1"
                                        invalid={
                                            errors.Emp_Contact1 &&
                                            touched.Emp_Contact1
                                        }
                                        errorMessage={errors.Emp_Contact1}
                                    >
                                        <Field
                                            size="sm"
                                            type="text"
                                            autoComplete="off"
                                            name="Emp_Contact1"
                                            placeholder="Emp Contact1"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Emp_Contact2"
                                        invalid={
                                            errors.Emp_Contact2 &&
                                            touched.Emp_Contact2
                                        }
                                        errorMessage={errors.Emp_Contact2}
                                    >
                                        <Field
                                            size="sm"
                                            type="text"
                                            autoComplete="off"
                                            name="Emp_Contact2"
                                            placeholder="Emp_Contact2 name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Emp_DOB"
                                        invalid={
                                            errors.Emp_DOB && touched.Emp_DOB
                                        }
                                        errorMessage={errors.Emp_DOB}
                                    >
                                        <Field
                                            size="sm"
                                            type="datetime-local"
                                            autoComplete="off"
                                            name="Emp_DOB"
                                            placeholder="Emp_DOB name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Emp_DOJ"
                                        invalid={
                                            errors.Emp_DOJ && touched.Emp_DOJ
                                        }
                                        errorMessage={errors.Emp_DOJ}
                                    >
                                        <Field
                                            size="sm"
                                            type="datetime-local"
                                            autoComplete="off"
                                            name="Emp_DOJ"
                                            placeholder="Emp_DOJ"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Emp_DOL"
                                        invalid={
                                            errors.Emp_DOL && touched.Emp_DOL
                                        }
                                        errorMessage={errors.Emp_DOL}
                                    >
                                        <Field
                                            size="sm"
                                            type="datetime-local"
                                            autoComplete="off"
                                            name="Emp_DOL"
                                            placeholder="Emp_DOL"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Emp_Description"
                                        invalid={
                                            errors.Emp_Description &&
                                            touched.Emp_Description
                                        }
                                        errorMessage={errors.Emp_Description}
                                    >
                                        <Field
                                            size="sm"
                                            type="Emp_Description"
                                            autoComplete="off"
                                            name="Emp_Description"
                                            placeholder="Emp_Description name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Emp_Email"
                                        invalid={
                                            errors.Emp_Email &&
                                            touched.Emp_Email
                                        }
                                        errorMessage={errors.Emp_Email}
                                    >
                                        <Field
                                            size="sm"
                                            type="Email"
                                            autoComplete="off"
                                            name="Emp_Email"
                                            placeholder="Emp_Email"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        asterisk
                                        label="Emp_BloodGroup"
                                        invalid={
                                            errors.Emp_BloodGroup &&
                                            touched.Emp_BloodGroup
                                        }
                                        errorMessage={errors.Emp_BloodGroup}
                                        style={{ width: '250px' }}
                                    >
                                        <Field
                                            size="sm"
                                            name="Emp_BloodGroup"
                                            style={{ width: '250px' }}
                                        >
                                            {({ field, form }) => (
                                                <Select
                                                    style={{ width: '250px' }}
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
                                    <FormItem
                                        asterisk
                                        label="Rporting"
                                        invalid={
                                            errors.ReportingTo &&
                                            touched.ReportingTo
                                        }
                                        errorMessage={errors.ReportingTo}
                                        style={{ width: '250px' }}
                                    >
                                        <Field
                                            size="sm"
                                            name="ReportingTo"
                                            style={{ width: '250px' }}
                                        >
                                            {({ field, form }) => (
                                                <Select
                                                    style={{ width: '250px' }}
                                                    field={field}
                                                    form={form}
                                                    className="mb-4 w-50"
                                                    options={Emp}
                                                    value={Emp.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values.ReportingTo
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
                                        asterisk
                                        label="Emp_Grade"
                                        invalid={
                                            errors.Emp_Grade &&
                                            touched.Emp_Grade
                                        }
                                        errorMessage={errors.Emp_Grade}
                                        style={{ width: '250px' }}
                                    >
                                        <Field
                                            size="sm"
                                            name="Emp_Grade"
                                            style={{ width: '250px' }}
                                        >
                                            {({ field, form }) => (
                                                <Select
                                                    style={{ width: '250px' }}
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

                                    <FormItem
                                        asterisk
                                        label="Designation"
                                        invalid={
                                            errors.DesignationCode &&
                                            touched.DesignationCode
                                        }
                                        errorMessage={errors.DesignationCode}
                                        style={{ width: '250px' }}
                                    >
                                        <Field
                                            size="sm"
                                            name="DesignationCode"
                                            style={{ width: '250px' }}
                                        >
                                            {({ field, form }) => (
                                                <Select
                                                    style={{ width: '250px' }}
                                                    field={field}
                                                    form={form}
                                                    className="mb-4 w-50"
                                                    options={Designation}
                                                    value={Designation.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values.DesignationCode
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
                                        asterisk
                                        label="City Code"
                                        invalid={
                                            errors.CityCode && touched.CityCode
                                        }
                                        errorMessage={errors.CityCode}
                                        style={{ width: '250px' }}
                                    >
                                        <Field
                                            size="sm"
                                            name="CityCode"
                                            style={{ width: '250px' }}
                                        >
                                            {({ field, form }) => (
                                                <Select
                                                    style={{ width: '250px' }}
                                                    field={field}
                                                    form={form}
                                                    className="mb-4 w-50"
                                                    options={Place}
                                                    value={Place.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values.CityCode
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
                                        asterisk
                                        label="Department Code"
                                        invalid={
                                            errors.DepartmentCode &&
                                            touched.DepartmentCode
                                        }
                                        errorMessage={errors.DepartmentCode}
                                        style={{ width: '250px' }}
                                    >
                                        <Field
                                            size="sm"
                                            name="DepartmentCode"
                                            style={{ width: '250px' }}
                                        >
                                            {({ field, form }) => (
                                                <Select
                                                    style={{ width: '250px' }}
                                                    field={field}
                                                    form={form}
                                                    className="mb-4 w-50"
                                                    options={Department}
                                                    value={Department.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values.DepartmentCode
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
                                        asterisk
                                        label="State Code"
                                        invalid={
                                            errors.StateCode &&
                                            touched.StateCode
                                        }
                                        errorMessage={errors.StateCode}
                                        style={{ width: '250px' }}
                                    >
                                        <Field
                                            size="sm"
                                            name="StateCode"
                                            style={{ width: '250px' }}
                                        >
                                            {({ field, form }) => (
                                                <Select
                                                    style={{ width: '250px' }}
                                                    field={field}
                                                    form={form}
                                                    className="mb-4 w-50"
                                                    options={State}
                                                    value={State.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values.StateCode
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
                                        asterisk
                                        label="Country Code"
                                        invalid={
                                            errors.CountryCode &&
                                            touched.CountryCode
                                        }
                                        errorMessage={errors.CountryCode}
                                        style={{ width: '250px' }}
                                    >
                                        <Field
                                            size="sm"
                                            name="CountryCode"
                                            style={{ width: '250px' }}
                                        >
                                            {({ field, form }) => (
                                                <Select
                                                    style={{ width: '250px' }}
                                                    field={field}
                                                    form={form}
                                                    className="mb-4 w-50"
                                                    options={Country}
                                                    value={Country.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values.CountryCode
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
                                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                                        label="Region Code"
                                        invalid={
                                            errors.RegionCode &&
                                            touched.RegionCode
                                        }
                                        errorMessage={errors.RegionCode}
                                        style={{ width: '250px' }}
                                    >
                                        <Field
                                            size="sm"
                                            name="RegionCode"
                                            style={{ width: '250px' }}
                                        >
                                            {({ field, form }) => (
                                                <Select
                                                    style={{ width: '250px' }}
                                                    field={field}
                                                    form={form}
                                                    className="mb-4 w-50"
                                                    options={Region}
                                                    value={Region.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values.RegionCode
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
                                        label="Address Line 1"
                                        invalid={
                                            errors.Emp_Addr1 &&
                                            touched.Emp_Addr1
                                        }
                                        errorMessage={errors.Emp_Addr1}
                                    >
                                        <Field
                                            size="sm"
                                            type="Emp_Addr1"
                                            autoComplete="off"
                                            name="Emp_Addr1"
                                            placeholder="Address Line 1"
                                            component={Input}
                                            textArea
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Address Line 2"
                                        invalid={
                                            errors.Emp_Addr2 &&
                                            touched.Emp_Addr2
                                        }
                                        errorMessage={errors.Emp_Addr2}
                                    >
                                        <Field
                                            size="sm"
                                            type="Emp_Addr2"
                                            autoComplete="off"
                                            name="Emp_Addr2"
                                            placeholder="Address Line 2"
                                            component={Input}
                                            textArea
                                        />
                                    </FormItem>
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
