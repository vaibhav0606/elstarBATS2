import { useState, useEffect } from 'react'
import { Table } from 'components/ui'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { apiGetSalesProducts } from 'services/SalesService'
import { Button } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
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

// const data = [
//     {
//         firstName: 'Maria',
//         lastName: 'Anders',
//         age: 24,
//         visits: 28,
//         progress: 56,
//         status: 'complicated',
//     },
//     {
//         firstName: 'Francisco',
//         lastName: 'Chang',
//         age: 9,
//         visits: 90,
//         progress: 77,
//         status: 'single',
//     },
//     {
//         firstName: 'Roland',
//         lastName: 'Mendel',
//         age: 1,
//         visits: 16,
//         progress: 56,
//         status: 'single',
//     },
//     {
//         firstName: 'Helen',
//         lastName: 'Bennett',
//         age: 43,
//         visits: 94,
//         progress: 53,
//         status: 'single',
//     },
//     {
//         firstName: 'Yoshi ',
//         lastName: 'Tannamuri',
//         age: 37,
//         visits: 85,
//         progress: 28,
//         status: 'single',
//     },
// ]

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const Entitymaster = () => {
    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([''])
    useEffect(() => {
        ;(async (values) => {
            const resp = await apiGetSalesProducts(values)
            console.log(resp.data)
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

    return (
        <>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/sales/product-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Product
                </Button>
            </Link>
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
                                                    cell.column.columnDef.cell,
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
        </>
    )
}

export default Entitymaster
