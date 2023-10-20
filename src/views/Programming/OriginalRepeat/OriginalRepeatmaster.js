import { useState, useEffect, useMemo } from 'react'
import { Badge, Drawer, Input, Alert,Tag } from 'components/ui'
import { apiGetfpcorgrepmaster } from 'services/ProgrammingService'
import { Button, Card } from 'components/ui'
import {
    HiOutlinePencil,
    HiOutlinePlusCircle,
    HiPlusCircle,
} from 'react-icons/hi'
import OriginalRepeatEdit from './OriginalRepeatEdit'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import DisplayTable from 'views/Controls/DisplayTable'
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
                    Add OriginalRepeat
                </Button>
            </span>
        </span>
    )
}

const Fpcorgrep = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([''])
    const [currency, setCurrency] = useState({ value: '', label: '' })
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')

    const statusColor = {
        1: 'bg-emerald-500',
        0: 'bg-red-500',
    }

    const columns = useMemo(
        () => [
            {
                header: 'OriginalRepeat Name',
                accessorKey: 'OriginalRepeatName',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.IsActive]} />
                            <span   className="ml-2 rtl:mr-2 capitalize">
                                { row.OriginalRepeatName }
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Short Name',
                accessorKey: 'ShortName',
            },
            {
                header: 'Colour Code',
                accessorKey: 'NewColourCode',
                // cell: (props) => {
                //     const row = props.row.original
                //     return (
                //         <div className="flex items-center">
                //             <Badge className={statusColor[row.IsActive]} />
                //             <span className="ml-2 rtl:mr-2 capitalize">
                //                 {row.IsActive === 1 ? 'Active' : 'InActive'}
                //             </span>
                //         </div>
                //     )
                // },
                cell: (props) => {
                     console.log(props);
                     const row = props.row.original
                //     return <Tag 
                //     className="  rounded border-0"
                     
                //     > 
                //     <span style={{backgroundColor: row.NewColourCode}}></span>
                //      {row.OriginalRepeatName}
                // </Tag> 
                return  <div style={{
                    height: '20px',
                    width: '100%',
                    backgroundColor: row.NewColourCode,
                  }}>  </div>
                },
            //},
            // {
            //     header: 'Status',
            //     id: 'action',
              
             },
        ],
        []
    )
    useEffect(() => {
        ;(async (values) => {
            const resp = await apiGetfpcorgrepmaster(values)
            setdata(resp.data)
        })()
    }, [])
    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = async (e, values) => {
        setIsOpen(false)
        const resp = await apiGetfpcorgrepmaster(values)
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
                header={<HeaderExtra Component={'OriginalRepeat Master'} />}
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
                    editData.OriginalRepeatName ? (
                        <p className="text-xl font-medium text-black flex ">
                            <center>
                                <Button
                                    size="xs"
                                    variant="twoTone"
                                    icon={<HiOutlinePencil />}
                                ></Button>
                            </center>
                            OriginalRepeat Master
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
                            OriginalRepeat Master
                        </p>
                    )
                }
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={600}
            >
                <OriginalRepeatEdit
                    onDrawerClose={onDrawerClose}
                    editData={editData}
                    setMessage={setMessage}
                    setlog={setlog}
                    currency={currency}
                />
            </Drawer>
        </>
    )
}

export default Fpcorgrep
