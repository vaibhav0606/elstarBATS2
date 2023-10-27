import React, { forwardRef } from 'react'
import { Checkbox, FormItemcompact, Input } from 'components/ui'
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

const HeaderDuration = forwardRef((props, ref) => {
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
                        label="Commercial Dur"
                        invalid={errors.Commercial && touched.Commercial}
                        errorMessage={errors.Commercial}
                    >
                        <Field
                            size="sm"
                            type="time"
                            autoComplete="off"
                            name="Commercial"
                            placeholder="Commercial Dur"
                            step="2"
                            component={Input}
                        />
                        <p
                            style={{
                                color: 'red',
                                fontSize: '12px',
                            }}
                        >
                            (hh:mm:ss: pm/am)
                        </p>
                    </FormItemcompact>
                </div>
                <div className="lg:col-span-1">
                    <FormItemcompact
                        asterisk
                        label="Total Dur Insec"
                        invalid={errors.TotalDurInsec && touched.TotalDurInsec}
                        errorMessage={errors.TotalDurInsec}
                    >
                        <Field
                            size="sm"
                            type="text"
                            autoComplete="off"
                            name="TotalDurInsec"
                            placeholder="TotalDur Insec"
                            step="2"
                            component={Input}
                        />
                    </FormItemcompact>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2  md:grid-cols-2 gap-4">
                <div className="lg:col-span-1">
                    <FormItemcompact
                        asterisk
                        label="Segment Dur"
                        invalid={errors.Segment && touched.Segment}
                        errorMessage={errors.Segment}
                    >
                        <Field
                            size="sm"
                            type="time"
                            autoComplete="off"
                            name="Segment"
                            placeholder="Segment Dur"
                            step="2"
                            component={Input}
                        />
                    </FormItemcompact>
                </div>
                <div className="lg:col-span-1">
                    <FormItemcompact
                        asterisk
                        label="Actual Dur"
                        invalid={errors.Actual && touched.Actual}
                        errorMessage={errors.Actual}
                    >
                        <Field
                            size="sm"
                            type="time"
                            autoComplete="off"
                            name="Actual"
                            placeholder="Actual Dur"
                            step="2"
                            component={Input}
                        />
                    </FormItemcompact>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2  md:grid-cols-2 gap-4">
                <div className="lg:col-span-1">
                    <FormItemcompact
                        asterisk
                        label="Total Dur "
                        invalid={errors.TotalDur && touched.TotalDur}
                        errorMessage={errors.TotalDur}
                    >
                        <Field
                            size="sm"
                            type="text"
                            autoComplete="off"
                            name="TotalDur"
                            placeholder="TotalDur"
                            step="2"
                            component={Input}
                        />
                    </FormItemcompact>
                </div>
                <div className="lg:col-span-1">
                    <FormItemcompact
                        asterisk
                        label="No Of Seg "
                        invalid={errors.NoOfSeg && touched.NoOfSeg}
                        errorMessage={errors.NoOfSeg}
                    >
                        <Field
                            size="sm"
                            type="text"
                            autoComplete="off"
                            name="NoOfSeg"
                            placeholder="No Of Seg"
                            step="2"
                            component={Input}
                        />
                    </FormItemcompact>
                </div>
            </div>
        </>
    )
})
export default HeaderDuration
