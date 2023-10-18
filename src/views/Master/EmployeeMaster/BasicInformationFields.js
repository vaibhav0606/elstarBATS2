import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, DatePicker, Select,FormItemcompact } from 'components/ui'
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
export const bloodgroup = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' }, 

]

const BasicInformationFields = (props) => {
    const { touched, errors, values } = props
    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Basic Information</h5>
            {/* <p className="mb-6">Section to config basic product information</p> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="col-span-1">
                    <FormItemcompact
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
                    </FormItemcompact>
                </div>
                <div className="col-span-1">
                    <FormItemcompact
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
                    </FormItemcompact>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItemcompact
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
                    </FormItemcompact>
                </div>
                <div className="col-span-1">
                    <FormItemcompact
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
                    </FormItemcompact>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                    <FormItemcompact  
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
                    </FormItemcompact>
                 </div>
                <div className="col-span-1">
                     <FormItemcompact
                        label="Date Of Joining"
                        invalid={errors.Emp_DOJ && touched.Emp_DOJ}
                        errorMessage={errors.Emp_DOJ}
                    >
                        <Field name="Emp_DOJ" placeholder="Date">
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
                    </FormItemcompact>
                </div>
                <div className="col-span-1">
                    <FormItemcompact
                        label="Blood Group"
                        invalid={
                            errors.Emp_BloodGroup && touched.Emp_BloodGroup
                        }
                        Emp_DOB errorMessage={errors.Emp_BloodGroup}
                    >
                        <Field name="Emp_BloodGroup">
                            {({ field, form }) => (
                                <Select
                                    componentAs={CreatableSelect}
                                    //isMulti
                                    field={field}
                                    form={form}
                                    options={bloodgroup}
                                    value={values.bloodgroup}
                                    onChange={(option) =>
                                        form.setFieldValue(field.value, option)
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

export default BasicInformationFields
