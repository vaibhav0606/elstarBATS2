import { useState, useEffect, useMemo } from 'react'
import { Badge, Drawer, Input, Alert } from 'components/ui'
import {
    apiGetStarCastmaster,
    apiGetStarCastTypemaster,
} from 'services/ProgrammingService'
import { Button, Card } from 'components/ui'
import {
    HiOutlinePencil,
    HiOutlinePlusCircle,
    HiPlusCircle,
} from 'react-icons/hi'
import StarCastEdit from './StarCastEdit'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import DisplayTable from 'views/Controls/DisplayTable'
import { apiGetCountryMaster } from 'services/MasterService'
import HeaderExtra from 'views/Controls/HeaderExtra'

const headerExtraContent = (
    openDrawer,
    DebouncedInput,
    globalFilter,
    setGlobalFilter
) => {
    return (
        <span className="flex items-center">
            <span className="mr-1 mt-4  font-semibold">
                <DebouncedInput
                    value={globalFilter ?? ''}
                    className=" solid"
                    placeholder="Search all columns..."
                    size="sm"
                    onChange={(value) => {
                        setGlobalFilter(value)
                    }}
                />
            </span>
            <span className="mr-1 font-semibold">
                <Button
                    block
                    variant="solid"
                    size="sm"
                    icon={<HiPlusCircle />}
                    onClick={() => openDrawer()}
                >
                    Add StarCast
                </Button>
            </span>
        </span>
    )
}

const StarCastmaster = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([''])
    const [Country, setCountry] = useState({ value: '', label: '' })
    const [StarCastType, setStarCastType] = useState({ value: '', label: '' })
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')

    const statusColor = {
        1: 'bg-emerald-500',
        0: 'bg-red-500',
    }

    const columns = useMemo(
        () => [
            {
                header: 'StarCast Name',
                accessorKey: 'StarCastName',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.IsActive]} />
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row.StarCastName}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'StarCastType',
                id: 'StarCastType',
                cell: (props) => {
                    const { StarCastType } = props.row.original
                    return (
                        <div className="flex items-center">
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {StarCastType?.StarCastType}
                            </span>
                        </div>
                    )
                },
            },

            {
                header: 'Gender',
                accessorKey: 'MaleFemale',
            },

            //{
            //     header: 'Status',
            //     id: 'action',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 <Badge className={statusColor[row.IsActive]} />
            //                 <span className="ml-2 rtl:mr-2 capitalize">
            //                     {row.IsActive == 1 ? 'Active' : 'InActive'}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
        ],
        []
    )
    useEffect(() => {
        ;(async (values) => {
            const resp = await apiGetStarCastmaster(values)
            console.log(resp.data)
            setdata(resp.data)
        })()
        ;(async (values) => {
            const Country = await apiGetCountryMaster(values)
            const formattedOptions = Country.data.map((option) => ({
                value: option.CountryCode,
                label: option.CountryName,
            }))
            setCountry(formattedOptions)
        })()
        ;(async (values) => {
            const StarCastType = await apiGetStarCastTypemaster(values)
            const formattedOptions = StarCastType.data.map((option) => ({
                value: option.StarCastTypeCode,
                label: option.StarCastTypeName,
            }))
            setStarCastType(formattedOptions)
        })()
    }, [])
    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = async (e, values) => {
        setIsOpen(false)
        const resp = await apiGetStarCastmaster(values)
        setdata(resp.data)
        seteditData([''])
    }
    function DebouncedInput({
        value: initialValue,
        onChange,
        debounce = 500,
        ...props
    }) {
        const [value, setValue] = useState(initialValue)

        useEffect(() => {
            setValue(initialValue)
        }, [initialValue])

        useEffect(() => {
            const timeout = setTimeout(() => {
                onChange(value)
            }, debounce)

            return () => clearTimeout(timeout)
        }, [value])
        return (
            <div className="flex justify-end">
                <div className="flex items-center mb-4">
                    <span className="mr-2">Search:</span>
                    <Input
                        {...props}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </div>
        )
    }

    // console.log(log)
    return (
        <>
            {message && (
                <Alert className="mb-4" type={log} showIcon>
                    {message}
                </Alert>
            )}
            {/* {log && (
                <Alert className="mb-4" type="success" showIcon>
                    {log}
                </Alert>
            )} */}
            <Card
                header={<HeaderExtra Component={'StarCast Master'} />}
                headerExtra={headerExtraContent(
                    openDrawer,
                    DebouncedInput,
                    globalFilter,
                    setGlobalFilter
                )}
            >
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
            </Card>

            <Drawer
                title={
                    editData.StarCastName ? (
                        <p className="text-xl font-medium text-black flex ">
                            <center>
                                <Button
                                    size="xs"
                                    variant="twoTone"
                                    icon={<HiOutlinePencil />}
                                ></Button>
                            </center>
                            StarCast Master
                        </p>
                    ) : (
                        <p className="text-xl font-medium text-black flex ">
                            <center>
                                <Button
                                    size="xs"
                                    variant="twoTone"
                                    icon={<HiOutlinePlusCircle />}
                                ></Button>
                            </center>
                            StarCast Master
                        </p>
                    )
                }
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={600}
            >
                <StarCastEdit
                    onDrawerClose={onDrawerClose}
                    editData={editData}
                    setMessage={setMessage}
                    setlog={setlog}
                    Country={Country}
                    StarCastType={StarCastType}
                />
            </Drawer>
        </>
    )
}

export default StarCastmaster
