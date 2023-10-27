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
import { Checkbox } from 'components/ui'
import { useSelector } from 'react-redux'

const { Tr, Th, Td, THead, TBody } = Table
const dataWithSubRows = [
    {
        module: 'DEAL',
        modulecode: 1,
        submodule: 'Master Data',
        submodulecode: 2,
        form: 'Agency Group Master',
        formcode: 3,
        read: 1,
        write: 1,
    },
    {
        module: 'PROGRAMMING',
        modulecode: 2,
        submodule: 'Content Management',
        submodulecode: 1,
        form: 'Award Master',
        formcode: 5,
        read: 1,
        write: 1,
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
                header: 'Module',
                accessorKey: 'module',
            },
            {
                header: 'submodule',
                accessorKey: 'submodule',
            },
            {
                header: 'form',
                accessorKey: 'form',
            },
            {
                header: 'read',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Checkbox
                                name="read"
                                type="checkbox"
                                // checked={true}
                                onClick={(e) => console.log(row)}
                            />
                        </div>
                    )
                },
            },
            {
                header: 'write',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Checkbox
                                name="write"
                                type="checkbox"
                                // checked={true}
                                onClick={(e) => console.log(row)}
                            />
                        </div>
                    )
                },
            },
        ],
        []
    )
    const { LoginId } = useSelector((state) => state.auth.session)
    console.log(LoginId)
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
