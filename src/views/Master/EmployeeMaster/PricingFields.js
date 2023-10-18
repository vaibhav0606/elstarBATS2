import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItemcompact,Select } from 'components/ui'
import NumberFormat from 'react-number-format'
import { Field } from 'formik'

const PriceInput = (props) => {
    return <Input {...props} value={props.field.value} prefix="$" />
}

const NumberInput = (props) => {
    return <Input {...props} value={props.field.value} />
}

const TaxRateInput = (props) => {
    return <Input {...props} value={props.field.value} />
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
 
const PricingFields = (props) => {
    const { touched, errors } = props
 
    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Contact Detail</h5>
            {/* <p className="mb-6">Section to config product sales information</p> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">

                    <FormItemcompact
                        label="Address"
                        invalid={errors.Emp_Addr1 && touched.Emp_Addr1}
                        errorMessage={errors.Emp_Addr1}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="Emp_Addr1"
                            placeholder="Address"
                            component={Input}
                        />
                        {/* <FormItemcompact
                            asterisk
                            label="Country"
                            invalid={
                                errors.CountryCode &&
                                touched.CountryCode
                            }
                            errorMessage={errors.CountryCode}
                            style={{ width: '250px' }}
                        >
                            <Field
                                size="sm"
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
                                                1
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
                        </FormItemcompact> */}

                    </FormItemcompact>
                </div>
                <div className="col-span-1">
                    <FormItemcompact
                        label="Price"
                        invalid={errors.price && touched.price}
                        errorMessage={errors.price}
                    >
                        <Field name="price">
                            {({ field, form }) => {
                                return (
                                    <NumberFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Price"
                                        customInput={PriceInput}
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItemcompact>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItemcompact
                        label="Bulk Discount Price"
                        invalid={
                            errors.bulkDiscountPrice &&
                            touched.bulkDiscountPrice
                        }
                        errorMessage={errors.bulkDiscountPrice}
                    >
                        <Field name="bulkDiscountPrice">
                            {({ field, form }) => {
                                return (
                                    <NumberFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Bulk Discount Price"
                                        customInput={PriceInput}
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItemcompact>
                </div>
                <div className="col-span-1">
                    <FormItemcompact
                        label="Tax Rate(%)"
                        invalid={errors.taxRate && touched.taxRate}
                        errorMessage={errors.taxRate}
                    >
                        <Field name="taxRate">
                            {({ field, form }) => {
                                return (
                                    <NumberFormatInput
                                        form={form}
                                        field={field}
                                        placeholder="Tax Rate"
                                        customInput={TaxRateInput}
                                        isAllowed={({ floatValue }) =>
                                            floatValue <= 100
                                        }
                                        onValueChange={(e) => {
                                            form.setFieldValue(
                                                field.name,
                                                e.value
                                            )
                                        }}
                                    />
                                )
                            }}
                        </Field>
                    </FormItemcompact>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default PricingFields
