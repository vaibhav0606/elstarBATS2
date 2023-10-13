import { FormItem, Input } from 'components/ui'
import { Field } from 'formik'
import React from 'react'

const InputField = ({lable,placeholder,name,type,errors,touched,asterisk}) => {
  return (
    <FormItem
    asterisk={asterisk}
        label={lable}
        errorMessage={
            <p className="text-xs italic">
                {errors.entityname}
            </p>
        }
        invalid={
            errors.entityname && touched.entityname
        }
    >
        <Field
            size="sm"
            type={type}
            autoComplete="off"
            name={name}
            placeholder={placeholder}
            component={Input}
        />
    </FormItem>
  )
}

export default InputField