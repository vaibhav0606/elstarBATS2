import { useState, useEffect } from 'react'
import { Table, Drawer } from 'components/ui'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { apiGetSalesProducts } from 'services/SalesService'
import { Button, Card } from 'components/ui'
import { HiPlusCircle, HiCheckCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import EntityEdit from './EntityEdit'

const columns = [
    {
        header: 'Entity Name',
        accessorKey: 'EntityName',
    },
    {
        header: 'Perm Address',
        accessorKey: 'PermAddress',
    },
    {
        header: 'Corp Address',
        accessorKey: 'CorpAddress',
    },
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
    {
        header: 'PAN NO',
        accessorKey: 'PANNO',
    },
    {
        header: 'CIN Number',
        accessorKey: 'CINNumber',
    },
]

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

    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([''])
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
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = async (e,values) => {
        const resp = await apiGetSalesProducts(values)            
        setdata(resp.data)
        setIsOpen(false)
    }

    return (
        <>
            <Card
                header="Entity Master"
                headerExtra={headerExtraContent(openDrawer)}
            >
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
                            </Tr>
                        ))}
                    </THead>
                    <TBody>
                        {table
                            .getRowModel()
                            .rows.slice(0, 10)
                            .map((row) => {
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
                                    </Tr>
                                )
                            })}
                    </TBody>
                </Table>
            </Card>

            <Drawer
                title="Edit Entity Master"
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={600}
            >
                <EntityEdit onDrawerClose={onDrawerClose}/>
            </Drawer>
        </>
    )
}

export default Entitymaster
