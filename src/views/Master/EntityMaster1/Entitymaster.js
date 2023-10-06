import { useState, useEffect , useMemo} from 'react'
import { Table, Drawer,Input,Alert } from 'components/ui'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
} from '@tanstack/react-table'

import { apiGetSalesProducts } from 'services/SalesService'
import { Button, Card } from 'components/ui'
import { HiPlusCircle, HiOutlinePencil } from 'react-icons/hi'
import EntityEdit from './EntityEdit'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'


const headerExtraContent = (openDrawer) => {
    return (
        <span className="flex items-center">
            <span className="mr-1 font-semibold">
                {' '}
                {/* <Link
                    className="block lg:inline-block md:mb-0 mb-4"
                    to="/entityEdit"
                > */}
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

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const Entitymaster = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])    
    const [data, setdata] = useState([''])
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')

    const columns = useMemo(
        () => [
        {
            header: 'Entity Name',
            accessorKey: 'EntityName',
        },
        // {
        //     header: 'Perm Address',
        //     accessorKey: 'PermAddress',
        // },
        // {
        //     header: 'Corp Address',
        //     accessorKey: 'CorpAddress',
        // },
        {
            header: 'Contact Person',
            accessorKey: 'ContactPerson',
        },
        {
            header: 'Contact',
            accessorKey: 'Contact',
        },
        {
            header: 'Status',
            accessorKey: 'IsActive',
        },
        // {
        //     header: 'PAN NO',
        //     accessorKey: 'PANNO',
        // },
        // {
        //     header: 'CIN Number',
        //     accessorKey: 'CINNumber',
        // },
    ],
    []
    )

    useEffect(() => {
        ;(async (values) => {
            const resp = await apiGetSalesProducts(values)
            setdata(resp.data)
        })()
    }, [])
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    })

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = async (e,values) => {
        const resp = await apiGetSalesProducts(values)  
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
            <Card
                header="Entity Master"
                headerExtra={headerExtraContent(openDrawer)}
            >
                 {/* <DebouncedInput
                value={globalFilter ?? ''}
                className="p-2 font-lg shadow border border-block"
                placeholder="Search all columns..."
                onChange={(value) => setGlobalFilter(String(value))}
            /> */}
                <Table>
                    <THead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    {...{
                                                        className:
                                                            header.column.getCanSort()
                                                                ? 'cursor-pointer select-none'
                                                                : '',
                                                        onClick:
                                                            header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    {
                                                        <Sorter
                                                            sort={header.column.getIsSorted()}
                                                        />
                                                    }
                                                </div>
                                            )}
                                        </Th>
                                    )
                                })}
                                <Th>Action</Th>
                            </Tr>
                        ))}
                    </THead>
                    <TBody>
                        {table
                            .getRowModel()
                            .rows.map((row) => {
                                return (
                                    <Tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <Td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                             </Td>
                                             
                                            )
                                        })}
                                        <Td onClick={()=>{console.log(row.original)
                                       seteditData(row.original)
                                        openDrawer()}}>
                                             <Button className="mr-2" size="sm" variant="twoTone" 
                                             icon={<HiOutlinePencil  />}>
                                            </Button></Td>                                       
                                    </Tr>
                                )
                            })}
                    </TBody>
                </Table>
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
