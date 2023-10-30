import { useMemo, useState } from 'react'
import Table from 'components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
//import { dataWithSubRows } from './data'
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi'

const { Tr, Th, Td, THead, TBody } = Table
const dataWithSubRows = [
    {
        firstName: 'Maria',
        lastName: 'Anders',
        age: 24,
        visits: 28,
        progress: 56,
        status: 'complicated',
        subRows: [
            {
                firstName: 'newspaper',
                lastName: 'dinner',
                age: 25,
                visits: 2,
                progress: 78,
                status: 'single',
            },
            {
                firstName: 'whip',
                lastName: 'marriage',
                age: 3,
                visits: 95,
                progress: 65,
                status: 'single',
            },
            {
                firstName: 'bee',
                lastName: 'invention',
                age: 7,
                visits: 83,
                progress: 68,
                status: 'complicated',
            },
        ],
    },
    {
        firstName: 'Maria',
        lastName: 'Anders',
        age: 24,
        visits: 28,
        progress: 56,
        status: 'complicated',
        subRows: [
            {
                firstName: 'newspaper',
                lastName: 'dinner',
                age: 25,
                visits: 2,
                progress: 78,
                status: 'single',
            },
            {
                firstName: 'whip',
                lastName: 'marriage',
                age: 3,
                visits: 95,
                progress: 65,
                status: 'single',
            },
            {
                firstName: 'bee',
                lastName: 'invention',
                age: 7,
                visits: 83,
                progress: 68,
                status: 'complicated',
            },
        ],
    },
]
function Exapanding() {
    const columns = useMemo(
        () => [
            {
                id: 'expander',
                header: ({ table }) => {
                    return (
                        <button
                            className="text-xl"
                            {...{
                                onClick:
                                    table.getToggleAllRowsExpandedHandler(),
                            }}
                        >
                            {table.getIsAllRowsExpanded() ? (
                                <HiOutlineMinusCircle />
                            ) : (
                                <HiOutlinePlusCircle />
                            )}
                        </button>
                    )
                },
                cell: ({ row, getValue }) => {
                    return (
                        <>
                            {row.getCanExpand() ? (
                                <button
                                    className="text-xl"
                                    {...{
                                        onClick: row.getToggleExpandedHandler(),
                                    }}
                                >
                                    {row.getIsExpanded() ? (
                                        <HiOutlineMinusCircle />
                                    ) : (
                                        <HiOutlinePlusCircle />
                                    )}
                                </button>
                            ) : null}
                            {getValue()}
                        </>
                    )
                },
            },
            {
                header: 'First Name',
                accessorKey: 'firstName',
            },
            {
                header: 'Last Name',
                accessorKey: 'lastName',
            },
            {
                header: 'Age',
                accessorKey: 'age',
            },
            {
                header: 'Visits',
                accessorKey: 'visits',
            },
            {
                header: 'Status',
                accessorKey: 'status',
            },
            {
                header: 'Profile Progress',
                accessorKey: 'progress',
            },
        ],
        []
    )

    const [data] = useState(dataWithSubRows)
    const [expanded, setExpanded] = useState([])

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    })

    return (
        <>
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
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
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

export default Exapanding
