import React, { useState, forwardRef, useMemo, useEffect, Select } from 'react'
import { FormItemcompact, Radio, Input, Button, Badge } from 'components/ui'
import { Field } from 'formik'
import { apiGetPatternmaster } from 'services/ProgrammingService'
import DisplayTable from 'views/Controls/DisplayTable'

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
]

const TypeBox = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const { values, touched, errors } = props
    const [value, setValue] = useState('Commercial')
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([''])
    const statusColor = {
        1: 'bg-emerald-500',
        0: 'bg-red-500',
    }
    const onChange = (val) => {
        setValue(val)
    }

    const columns = useMemo(
        () => [
            {
                header: 'Event Name',
                accessorKey: 'EventName',
            },

            {
                header: 'Event Duration',
                accessorKey: 'EventDuration',
            },
            {
                header: 'Event Type',
                accessorKey: 'EventType',
            },
            {
                header: 'Pattern Type',
                accessorKey: 'PatternType',
            },
            {
                header: 'Seg Com No',
                accessorKey: 'SegComNumber',
            },
            {
                header: 'Com Break No',
                accessorKey: 'ComBreakNumber',
            },
        ],
        []
    )

    useEffect(() => {
        ;(async (values) => {
            const resp = await apiGetPatternmaster(values)
            setdata(resp.data)
        })()
    }, [])

    const openDrawer = () => {
        setIsOpen(true)
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
                <br></br>
                <div className="lg:col-span-1 flex justify-end">
                    <FormItemcompact>
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="twoTone"
                            // icon={<HiOutlineCog />}
                        >
                            <span>
                                <span>AddSegment</span>
                            </span>
                        </Button>
                    </FormItemcompact>
                </div>
            </div>
            <div className="lg:col-span-1">
                {/* <Select
                    placeholder="Please Select"
                    options={colourOptions}
                ></Select> */}
            </div>
            <div className="col-span-2">
                <DisplayTable
                    data={data}
                    columns={columns}
                    sorting={sorting}
                    globalFilter={globalFilter}
                    setSorting={setSorting}
                    setGlobalFilter={setGlobalFilter}
                    seteditData={seteditData}
                    openDrawer={openDrawer}
                />
            </div>
            <div className="lg:col-span-2 flex justify-end">
                <FormItemcompact>
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="twoTone"
                        // icon={<HiOutlineCog />}
                    >
                        <span>
                            <span>Remove</span>
                        </span>
                    </Button>
                    <Button
                        variant="twoTone"
                        // icon={<HiOutlineCog />}
                    >
                        <span>
                            <span> Clear Pattern</span>
                        </span>
                    </Button>
                </FormItemcompact>
            </div>
        </div>
    )
})
export default TypeBox
