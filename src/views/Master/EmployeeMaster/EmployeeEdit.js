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
import { PostEmp, PutEmp } from 'services/MasterService'
import { useSelector } from 'react-redux'

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
const options = [
    { value: 'str', label: 'str' },
    { value: 'bar', label: 'Bar' },
]
const options2 = [
    { value: 'string', label: 'string' },
    { value: 'bar', label: 'Bar' },
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
}) => {
    const token = useSelector((state) => state.auth.session.token)

    const AddLocation = async (values, token) => {
        try {
            const resp = await PostEmp(values, token)
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
    const EditLocation = async (values, token) => {
        try {
            const resp = await PutEmp(values, token)
            console.log(resp)
            if (resp.data.status === 200) {
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
        <div>
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
                    // Emp_Image: editData.Emp_Image || '',
                    DepartmentCode: editData.Department?.DepartmentCode || '',
                    DesignationCode:
                        editData.Designation?.DesignationCode || '',
                    ReportingTo: editData.ReportingTo || '',
                    Emp_Description: editData.Emp_Description || '',
                    RegionCode: editData.Region?.RegionCode || '',
                    IsActive: editData.IsActive === 1 ? true : false,
                }}
                // validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        if (!editData.EmployeeCode) {
                            new Promise((resolve, reject) => {
                                AddLocation(values, token)
                                    .then((response) => {
                                        onDialogClose(0, 0)
                                        resolve(response)
                                    })
                                    .catch((errors) => {
                                        reject(errors)
                                    })
                            })
                        } else {
                            new Promise((resolve, reject) => {
                                setSubmitting(false)
                                EditLocation(values, token)
                                    .then((response) => {
                                        onDialogClose(0, 0)
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
                                type="EmployeeCode"
                                autoComplete="off"
                                name="EmployeeCode"
                                placeholder="EmployeeCode"
                                component={Input}
                                hidden
                            />
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormItem
                                    label="First Name"
                                    invalid={
                                        errors.Emp_FirstName &&
                                        touched.Emp_FirstName
                                    }
                                    errorMessage={errors.Emp_FirstName}
                                >
                                    <Field
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
                                        type="Emp_Code"
                                        autoComplete="off"
                                        name="Emp_Code"
                                        placeholder="Emp Code"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormItem
                                    label="Emp Contact1"
                                    invalid={
                                        errors.Emp_Contact1 &&
                                        touched.Emp_Contact1
                                    }
                                    errorMessage={errors.Emp_Contact1}
                                >
                                    <Field
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
                                        type="text"
                                        autoComplete="off"
                                        name="Emp_Contact2"
                                        placeholder="Emp_Contact2 name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Emp_DOB"
                                    invalid={errors.Emp_DOB && touched.Emp_DOB}
                                    errorMessage={errors.Emp_DOB}
                                >
                                    <Field
                                        type="Emp_DOB"
                                        autoComplete="off"
                                        name="Emp_DOB"
                                        placeholder="Emp_DOB name"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormItem
                                    label="Emp_DOJ"
                                    invalid={errors.Emp_DOJ && touched.Emp_DOJ}
                                    errorMessage={errors.Emp_DOJ}
                                >
                                    <Field
                                        type="datetime-local"
                                        autoComplete="off"
                                        name="Emp_DOJ"
                                        placeholder="Emp_DOJ"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Emp_DOL"
                                    invalid={errors.Emp_DOL && touched.Emp_DOL}
                                    errorMessage={errors.Emp_DOL}
                                >
                                    <Field
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
                                        type="Emp_Description"
                                        autoComplete="off"
                                        name="Emp_Description"
                                        placeholder="Emp_Description name"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormItem
                                    label="Emp_Email"
                                    invalid={
                                        errors.Emp_Email && touched.Emp_Email
                                    }
                                    errorMessage={errors.Emp_Email}
                                >
                                    <Field
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
                                    label="Emp_Grade"
                                    invalid={
                                        errors.Emp_Grade && touched.Emp_Grade
                                    }
                                    errorMessage={errors.Emp_Grade}
                                    style={{ width: '250px' }}
                                >
                                    <Field
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
                                        errors.StateCode && touched.StateCode
                                    }
                                    errorMessage={errors.StateCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
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

                                <FormItem
                                    asterisk
                                    label="Region Code"
                                    invalid={
                                        errors.RegionCode && touched.RegionCode
                                    }
                                    errorMessage={errors.RegionCode}
                                    style={{ width: '250px' }}
                                >
                                    <Field
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

export default EmployeeEdit
