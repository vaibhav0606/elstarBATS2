import React, { useEffect, useState } from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItemcompact, Select } from 'components/ui'
import NumberFormat from 'react-number-format'
import { Field } from 'formik'
import {
    apiGetCountryMaster,
    apiGetPlaceMasterbyId,
    apiGetRegionMaster,
    apiGetStateMasterbyId,
} from 'services/MasterService'

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
    const { touched, errors, values, ecode } = props
    const EmpDemo = [{ value: '', label: 'Data Not Found' }]
    const [Country, setCountry] = useState({ value: '', label: '' })
    const [City, setCity] = useState({ value: '', label: '' })
    const [Region, setRegion] = useState({ value: '', label: '' })
    const [State, setState] = useState({ value: '', label: '' })

    useEffect(() => {
        ;(async (values) => {
            const Country = await apiGetCountryMaster(values)
            const formattedOptions = Country.data.map((option) => ({
                value: option.CountryCode,
                label: option.CountryName,
            }))
            setCountry(formattedOptions)
        })()
        ;(async (values) => {
            const Region = await apiGetRegionMaster(values)
            const formattedOptions = Region.data.map((option) => ({
                value: option.RegionCode,
                label: option.RegionName,
            }))
            setRegion(formattedOptions)
        })()
        if (ecode?.EmployeeCode) {
            ;(async (values) => {
                const State = await apiGetStateMasterbyId(
                    ecode.Country?.CountryCode
                )
                console.log(State)
                const formattedOptions = State.data.map((option) => ({
                    value: option.StateCode,
                    label: option.StateName,
                }))
                setState(formattedOptions)
            })()
            ;(async (values) => {
                const City = await apiGetPlaceMasterbyId(ecode.State?.StateCode)
                const formattedOptions = City.data.map((option) => ({
                    value: option.PlaceCode,
                    label: option.PlaceName,
                }))
                setCity(formattedOptions)
            })()
        }
    }, [])
    const getCountry = async (id) => {
        const State = await apiGetStateMasterbyId(id)
        console.log(State)
        const formattedOptions = State.data.map((option) => ({
            value: option.StateCode,
            label: option.StateName,
        }))
        setState(formattedOptions)
    }
    const getplace = async (id) => {
        const City = await apiGetPlaceMasterbyId(id)
        const formattedOptions = City.data.map((option) => ({
            value: option.PlaceCode,
            label: option.PlaceName,
        }))
        setCity(formattedOptions)
    }

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
                    </FormItemcompact>
                </div>
                <div className="col-span-1">
                    <FormItemcompact
                        asterisk
                        label="Country"
                        invalid={errors.CountryCode && touched.CountryCode}
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
                                    options={
                                        Country.length > 2 ? Country : EmpDemo
                                    }
                                    value={
                                        Country.length > 2
                                            ? Country.filter(
                                                  (option) =>
                                                      option.value ===
                                                      values.CountryCode
                                              )
                                            : EmpDemo.filter(
                                                  (option) =>
                                                      option.value ===
                                                      values.ReportingTo
                                              )
                                    }
                                    onChange={(option) => {
                                        getCountry(option?.value)
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
                                    }}
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
                        label="State"
                        invalid={errors.StateCode && touched.StateCode}
                        errorMessage={errors.StateCode}
                        style={{ width: '250px' }}
                    >
                        <Field
                            size="sm"
                            name="StateCode"
                            style={{ width: '250px' }}
                        >
                            {({ field, form }) => (
                                <Select
                                    style={{ width: '250px' }}
                                    field={field}
                                    form={form}
                                    options={State.length > 2 ? State : EmpDemo}
                                    value={
                                        State.length > 2
                                            ? State.filter(
                                                  (option) =>
                                                      option.value ===
                                                      values.StateCode
                                              )
                                            : EmpDemo.filter(
                                                  (option) =>
                                                      option.value ===
                                                      values.ReportingTo
                                              )
                                    }
                                    onChange={(option) => {
                                        getplace(option?.value)
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
                                    }}
                                />
                            )}
                        </Field>
                    </FormItemcompact>
                </div>
                <div className="col-span-1">
                    <FormItemcompact
                        asterisk
                        label="City"
                        invalid={errors.PlaceCode && touched.PlaceCode}
                        errorMessage={errors.PlaceCode}
                        style={{ width: '250px' }}
                    >
                        <Field
                            size="sm"
                            name="PlaceCode"
                            style={{ width: '250px' }}
                        >
                            {({ field, form }) => (
                                <Select
                                    style={{ width: '250px' }}
                                    field={field}
                                    form={form}
                                    options={City.length > 2 ? City : EmpDemo}
                                    value={
                                        City.length > 2
                                            ? City.filter(
                                                  (option) =>
                                                      option.value ===
                                                      values.PlaceCode
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
                        label="Pin code"
                        invalid={errors.Pincode && touched.Pincode}
                        errorMessage={errors.Pincode}
                    >
                        <Field
                            type="text"
                            size="sm"
                            autoComplete="off"
                            name="Pincode"
                            placeholder="Pin code"
                            component={Input}
                        />
                    </FormItemcompact>
                </div>
                <div className="col-span-1">
                    <FormItemcompact
                        asterisk
                        label="Region"
                        invalid={errors.RegionCode && touched.RegionCode}
                        errorMessage={errors.RegionCode}
                        style={{ width: '250px' }}
                    >
                        <Field
                            size="sm"
                            name="RegionCode"
                            style={{ width: '250px' }}
                        >
                            {({ field, form }) => (
                                <Select
                                    style={{ width: '250px' }}
                                    field={field}
                                    form={form}
                                    options={
                                        Region.length > 2 ? Region : EmpDemo
                                    }
                                    value={
                                        Region.length > 2
                                            ? Region.filter(
                                                  (option) =>
                                                      option.value ===
                                                      values.RegionCode
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

export default PricingFields
