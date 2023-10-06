import { useState, useEffect , useMemo} from 'react'
import { Badge, Drawer,Input,Alert } from 'components/ui'
import { apiGetEntitymaster } from 'services/SalesService'
import { Button, Card } from 'components/ui'
import { HiPlusCircle, HiOutlinePencil } from 'react-icons/hi'
import EntityEdit from './EntityEdit'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import DisplayTable from 'views/Controls/DisplayTable'

const headerExtraContent = (openDrawer,DebouncedInput,globalFilter,setGlobalFilter) => {
    return (
        <span className="flex items-center">
            <span className="mr-1 mt-4  font-semibold">
             <DebouncedInput
                value={globalFilter ?? ''}
                className=" solid"
                placeholder="Search all columns..."
                size="sm"
                onChange={(value) => {setGlobalFilter(value)}}
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
                    Add Entity
                </Button>
                {/* </Link> */}
            </span>
        </span>
    )
}

// const { Tr, Th, Td, THead, TBody, Sorter } = Table

const Entitymaster = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])    
    const [data, setdata] = useState([''])
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')

    const statusColor = {
        1: 'bg-emerald-500',
        0: 'bg-red-500',
    }

    const columns = useMemo(
        () => [
        {
            header: 'Entity Name',
            accessorKey: 'EntityName',

        },
        {
            header: 'Contact Person',
            accessorKey: 'ContactPerson',
        },
        {
            header: 'Contact',
            accessorKey: 'Contact',
        },
        // {
        //     header: 'Status',
        //     accessorKey: 'IsActive',
        //     cell: (props) => {
        //         const row = props.row.original
        //         return (
        //             <div className="flex items-center">
        //                 <Badge  className={statusColor[row.IsActive]}/>
        //                 <span className="ml-2 rtl:mr-2 capitalize">
        //                     {row.IsActive==1 ?'Active' : 'InActive'}
        //                 </span>
        //             </div>
        //         )
        //     },
        // },
        {
            header: 'Status',
            id: 'action',
            cell: (props) => { const row = props.row.original
                        return (
                            <div className="flex items-center">
                                <Badge  className={statusColor[row.IsActive]}/>
                                <span className="ml-2 rtl:mr-2 capitalize">
                                    {row.IsActive==1 ?'Active' : 'InActive'}
                                </span>
                            </div>
                        )},
        },
    ],
    []
    )
    const ActionColumn = ({ row }) => {
    
       
    
        return (
            <div
                className={` cursor-pointer select-none font-semibold`}
          
            >
                Edit
            </div>
        )
    }

    useEffect(() => {
        ;(async (values) => {
            const resp = await apiGetEntitymaster(values)
            console.log(resp.data);
            setdata(resp.data)
        })()
    }, [])

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = async (e,values) => {
        const resp = await apiGetEntitymaster(values)  
        seteditData([''])      
        setdata(resp.data)
        // console.log(resp.data);
        setIsOpen(false)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
  
    
    return (
        <>
         {message && (
                <Alert className="mb-4" type="success" showIcon>
                    {message}
                </Alert>
            )}
            {log && (
                <Alert className="mb-4" type="success" showIcon>
                    {log}
                </Alert>
            )}
            <Card
                header="Entity Master"
                headerExtra={headerExtraContent(openDrawer,DebouncedInput,globalFilter,setGlobalFilter)}
            >
                <DisplayTable data={data} columns={columns} sorting={sorting} globalFilter={globalFilter} setSorting={setSorting} setGlobalFilter={setGlobalFilter} seteditData={seteditData} openDrawer={openDrawer}/>
            </Card>

            <Drawer
                title= {editData.EntityName ? "Edit Entity Master" : "Add Entity Master"}
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={600}
            >
                  
             <EntityEdit onDrawerClose={onDrawerClose} editData={editData} setMessage={setMessage} setlog={setlog}/>
            </Drawer>
        </>
    )
}

export default Entitymaster
