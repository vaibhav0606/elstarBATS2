import { FormItem, Input, Switcher } from 'components/ui'
import { Field } from 'formik'
import React from 'react'
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
const InputField = ({
    lable,
    placeholder,
    name,
    type,
    errors,
    touched,
    asterisk,
    max,
    category,
}) => {
    return (
        <>
            {category == 'text' ? (
                <FormItem
                    asterisk={asterisk}
                    label={lable}
                    errorMessage={
                        <p className="text-xs italic">{errors[name]}</p>
                    }
                    invalid={errors[name] && touched[name]}
                >
                    <Field
                        size="sm"
                        type={type}
                        autoComplete="off"
                        name={name}
                        placeholder={placeholder}
                        component={Input}
                        maxLength={max}
                    />
                </FormItem>
            ) : category == 'Status' ? (
                <FormItem
                    asterisk={asterisk}
                    label={lable}
                    invalid={errors[name] && touched[name]}
                    errorMessage={errors[name]}
                >
                    <Field size="sm" name={name} component={Switcher} />
                </FormItem>
            ) : category == 'number' ? (
                <FormItem
                    asterisk
                    label={name}
                    invalid={errors[name] && touched[name]}
                    errorMessage={
                        <p className="text-xs italic">{errors[name]}</p>
                    }
                >
                    <Field name={name} component={Input} size="sm">
                        {({ field, form }) => {
                            return (
                                <NumberFormatInput
                                    focused
                                    size="sm"
                                    form={form}
                                    field={field}
                                    name={name}
                                    placeholder={placeholder}
                                    customInput={PriceInput}
                                    isAllowed={withValueCap}
                                    onValueChange={(e) => {
                                        form.setFieldValue(field.name, e.value)
                                    }}
                                />
                            )
                        }}
                    </Field>
                </FormItem>
            ) : null}
        </>
    )
}

export default InputField
