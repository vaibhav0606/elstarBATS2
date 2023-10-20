import React, { useEffect, useState } from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select, FormItemcompact } from 'components/ui'
import CreatableSelect from 'react-select/creatable'
import { Field } from 'formik'
import {
    apiGetDepartmentmaster,
    apiGetDesignationmaster,
    apiGetEmployeemaster,
} from 'services/MasterService'

const Grade = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
]
const OrganizationFields = (props) => {
    const { values, touched, errors } = props
    const EmpDemo = [{ value: '', label: 'Data Not Found' }]
    const [Department, setDepartment] = useState({ value: '', label: '' })
    const [Designation, setDesignation] = useState({ value: '', label: '' })
    const [Reporting, setReporting] = useState({ value: '', label: '' })
    useEffect(() => {
        ;(async (values) => {
            const Department = await apiGetDepartmentmaster(values)
            const formattedOptions = Department.data.map((option) => ({
                value: option.DepartmentCode,
                label: option.DepartmentName,
            }))
            setDepartment(formattedOptions)
        })()
        ;(async (values) => {
            const Designation = await apiGetDesignationmaster(values)
            const formattedOptions = Designation.data.map((option) => ({
                value: option.DesignationCode,
                label: option.DesignationName,
            }))
            setDesignation(formattedOptions)
        })()
        ;(async (values) => {
            const Reporting = await apiGetEmployeemaster(values)
            console.log(Reporting)
            const formattedOptions = Reporting.data.map((option) => ({
                value: option.EmployeeCode,
                label: option.Emp_FirstName,
            }))
            setReporting(formattedOptions)
        })()
    }, [])

    return (
        <AdaptableCard className="mb-4" divider isLastChild>
            <h5>Organizations</h5>
            <p className="mb-6">Section to config the product attribute</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItemcompact
                        asterisk
                        label="Department"
                        invalid={
                            errors.DepartmentCode && touched.DepartmentCode
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
                                    options={
                                        Department.length > 2
                                            ? Department
                                            : EmpDemo
                                    }
                                    value={
                                        Department.length > 2
                                            ? Department.filter(
                                                  (option) =>
                                                      option.value ===
                                                      values.DepartmentCode
                                              )
                                            : EmpDemo.filter(
                                                  (option) =>
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
                    </FormItemcompact>
                </div>
                <div className="col-span-1">
                    <FormItemcompact
                        asterisk
                        label="Designation"
                        invalid={
                            errors.DesignationCode && touched.DesignationCode
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
                                    options={
                                        Designation.length > 2
                                            ? Designation
                                            : EmpDemo
                                    }
                                    value={
                                        Designation.length > 2
                                            ? Designation.filter(
                                                  (option) =>
                                                      option.value ===
                                                      values.DesignationCode
                                              )
                                            : EmpDemo.filter(
                                                  (option) =>
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
                    </FormItemcompact>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItemcompact
                        asterisk
                        label="Grade"
                        invalid={errors.Emp_Grade && touched.Emp_Grade}
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
                                    options={Grade.length > 2 ? Grade : EmpDemo}
                                    value={
                                        Grade.length > 2
                                            ? Grade.filter(
                                                  (option) =>
                                                      option.value ===
                                                      values.Emp_Grade
                                              )
                                            : EmpDemo.filter(
                                                  (option) =>
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
                    </FormItemcompact>
                </div>
                <div className="col-span-1">
                    <FormItemcompact
                        asterisk
                        label="Reporting"
                        invalid={errors.ReportingTo && touched.ReportingTo}
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
                                    options={
                                        Reporting.length > 0
                                            ? Reporting
                                            : EmpDemo
                                    }
                                    value={
                                        Reporting.length > 0
                                            ? Reporting.filter(
                                                  (option) =>
                                                      option.value ===
                                                      values.ReportingTo
                                              )
                                            : EmpDemo.filter(
                                                  (option) =>
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
                    </FormItemcompact>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default OrganizationFields
