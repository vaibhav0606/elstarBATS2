import { useState, useEffect, useMemo } from 'react'
import { Badge, Drawer, Input, Alert } from 'components/ui'
import { apiGetRegionmaster, apiGetZonemaster } from 'services/MasterService'
import { Button, Card } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import RegionEdit from './RegionEdit'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import DisplayTable from 'views/Controls/DisplayTable'

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
                    Add Region
                </Button>
            </span>
        </span>
    )
}

const Regionmaster = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([''])
    const [Zone, setZone] = useState({ value: '', label: '' })
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')

    const statusColor = {
        1: 'bg-emerald-500',
        0: 'bg-red-500',
    }

    const columns = useMemo(
        () => [
            {
                header: 'Region Name',
                accessorKey: 'RegionName',
            },
            {
                header: 'Short Name',
                accessorKey: 'ShortName',
            },
            {
                header: 'Status',
                id: 'action',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.IsActive]} />
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row.IsActive == 1 ? 'Active' : 'InActive'}
                            </span>
                        </div>
                    )
                },
            },
        ],
        []
    )
    useEffect(() => {
        ;(async (values) => {
            const resp = await apiGetRegionmaster(values)
            const Zone = await apiGetZonemaster(values)
            const formattedOptions = Zone.data.map((option) => ({
                value: option.ZoneCode,
                label: option.ZoneName,
            }))
            setZone(formattedOptions)
            setdata(resp.data)
        })()
    }, [])
    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = async (e, values) => {
        setIsOpen(false)
        const resp = await apiGetRegionmaster(values)
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
                header="Region Master"
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
                    editData.RegionName
                        ? 'Edit Region Master'
                        : 'Add Region Master'
                }
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={600}
            >
                <RegionEdit
                    onDrawerClose={onDrawerClose}
                    editData={editData}
                    setMessage={setMessage}
                    setlog={setlog}
                    Zone={Zone}
                />
            </Drawer>
        </>
    )
}

export default Regionmaster
