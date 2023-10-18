import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, DatePicker, Select } from 'components/ui'
import { Field } from 'formik'
import { HiCake } from 'react-icons/hi'
import CreatableSelect from 'react-select/creatable'

export const categories = [
    { label: 'Bags', value: 'bags' },
    { label: 'Cloths', value: 'cloths' },
    { label: 'Devices', value: 'devices' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Watches', value: 'watches' },
]
export const tags = [
    { label: 'trend', value: 'trend' },
    { label: 'unisex', value: 'unisex' },
]

const BasicInformationFields = (props) => {
    const { touched, errors, values } = props
    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Basic Information</h5>
            <p className="mb-6">Section to config basic product information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="col-span-1">
                    <FormItem
                        label="First Name"
                        invalid={errors.Emp_FirstName && touched.Emp_FirstName}
                        errorMessage={errors.Emp_FirstName}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="Emp_FirstName"
                            placeholder="First Name"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Last Name"
                        invalid={errors.Emp_LastName && touched.Emp_LastName}
                        errorMessage={errors.Emp_LastName}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="Emp_LastName"
                            placeholder="Last Name"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Email"
                        invalid={errors.Emp_Email && touched.Emp_Email}
                        errorMessage={errors.Emp_Email}
                    >
                        <Field
                            type="email"
                            autoComplete="off"
                            name="Emp_Email"
                            placeholder="Email"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Contact"
                        invalid={errors.Emp_Contact1 && touched.Emp_Contact1}
                        errorMessage={errors.Emp_Contact1}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="Emp_Contact1"
                            placeholder="Contact"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Date Of Birth"
                        invalid={errors.Emp_DOB && touched.Emp_DOB}
                        errorMessage={errors.Emp_DOB}
                    >
                        <Field name="Emp_DOB" placeholder="Date">
                            {({ field, form }) => (
                                <DatePicker
                                    field={field}
                                    form={form}
                                    value={field.value}
                                    prefix={<HiCake className="text-xl" />}
                                    onChange={(date) => {
                                        form.setFieldValue(field.name, date)
                                    }}
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Blood Group"
                        invalid={
                            errors.Emp_BloodGroup && touched.Emp_BloodGroup
                        }
                        errorMessage={errors.Emp_BloodGroup}
                    >
                        <Field name="Emp_BloodGroup">
                            {({ field, form }) => (
                                <Select
                                    componentAs={CreatableSelect}
                                    isMulti
                                    field={field}
                                    form={form}
                                    options={tags}
                                    value={values.tags}
                                    onChange={(option) =>
                                        form.setFieldValue(field.name, option)
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default BasicInformationFields
