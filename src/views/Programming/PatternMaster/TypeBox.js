import React, { useState, forwardRef } from 'react'
import { FormItemcompact, Radio, Input } from 'components/ui'
import { Field } from 'formik'

const TypeBox = forwardRef((props, ref) => {
    const { values, touched, errors } = props
    const [value, setValue] = useState('Commercial')
    const onChange = (val) => {
        setValue(val)
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 md:grid-cols-2 gap-4">
            <div className="col-span-1">
                <Radio.Group value={value} onChange={onChange}>
                    <Radio value={'Commercial'}>CommercialType</Radio>
                    <Radio value={'Promo'}>PromoType</Radio>
                    <Radio value={'Filler'}>FillerType</Radio>
                </Radio.Group>
            </div>
            <div className="col-span-1">
                <FormItemcompact
                    label="PatternType "
                    asterisk
                    invalid={errors.PatternType && touched.PatternType}
                    errorMessage={errors.PatternType}
                    // className="flex"
                >
                    <Field
                        size="sm"
                        type="text"
                        autoComplete="off"
                        name="PatternType"
                        placeholder="PatternType"
                        component={Input}
                    />
                </FormItemcompact>
            </div>
        </div>
    )
})
export default TypeBox
