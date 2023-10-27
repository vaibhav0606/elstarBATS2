import React, { forwardRef } from 'react'
import { Checkbox, FormItemcompact, Input, Radio } from 'components/ui'
import { Field } from 'formik'
import Select from 'components/ui/Select'
import { useState } from 'react'

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
]

const PartternDetail = forwardRef((props, ref) => {
    const { values, touched, errors } = props
    const [checkboxs, setcheckboxs] = useState(false)

    const onCheck = (value, e) => {
        setcheckboxs(value)
    }
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2  md:grid-cols-2 gap-4">
                <div className="lg:col-span-1">
                    <FormItemcompact
                        asterisk
                        label="Name"
                        invalid={errors.Name && touched.Name}
                        errorMessage={errors.Name}
                    >
                        <Field
                            size="sm"
                            type="text"
                            autoComplete="off"
                            name="Name"
                            placeholder="Name"
                            component={Input}
                        />
                    </FormItemcompact>
                </div>
                <div className="lg:col-span-1">
                    <FormItemcompact
                        asterisk
                        label="Format(Mins)"
                        invalid={errors.Format && touched.Format}
                        errorMessage={errors.Format}
                    >
                        <Select
                            size="sm"
                            className="mb-4"
                            name="Format"
                            placeholder="Please Select"
                            options={colourOptions}
                        ></Select>
                    </FormItemcompact>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2  md:grid-cols-2 gap-4 mb-2">
                <div className="lg:col-span-1">
                    <Checkbox onChange={onCheck}>Kill Date</Checkbox>
                    {checkboxs ? (
                        <>
                            <FormItemcompact
                                invalid={errors.Format && touched.Format}
                                errorMessage={errors.Format}
                            >
                                <Field
                                    size="sm"
                                    type="date"
                                    autoComplete="off"
                                    name="Name"
                                    placeholder="Name"
                                    component={Input}
                                />
                            </FormItemcompact>
                        </>
                    ) : null}
                </div>

                <div className="lg:col-span-1">
                    <Checkbox onChange={onCheck}>Program Type</Checkbox>
                </div>
            </div>
        </>
    )
})
export default PartternDetail
