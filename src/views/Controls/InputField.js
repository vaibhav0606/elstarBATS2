import { FormItem, Input } from 'components/ui'
import { Field } from 'formik'
import React, { useEffect } from 'react'

const InputField = ({lable,placeholder,name,type,errors,touched,asterisk}) => {
   
//    useEffect(() => {
//     const errorst = {name};
//    console.log(name);
//   alert(name)
//    }, [])
   
  return (
    <FormItem
    asterisk={asterisk}
        label={lable}
        errorMessage={
            <p className="text-xs italic">
                {errors.name}
            </p>
        }
        invalid={
            errors.name && touched.name
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