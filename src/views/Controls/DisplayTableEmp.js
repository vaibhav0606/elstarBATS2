import React, { useEffect, useState } from 'react'
import { Table } from 'components/ui'
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
import { Button } from 'components/ui'
import { HiEye, HiLockClosed, HiOutlinePencil } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import TableRowSkeleton from 'components/shared/loaders/TableRowSkeleton'

const DisplayTable = ({
    data,
    columns,
    sorting,
    globalFilter,
    setSorting,
    setGlobalFilter,
    seteditData,
    openDialog,
    setCurrentTab,
    setcount,
    setGame,
}) => {
    //console.log(setGlobalFilter);
    const navigate = useNavigate()
    console.log(data)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        if (data.length > 0) {
            setTimeout(() => {
                setIsLoading(false)
            }, 200)
        }
    }, [])
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        enableColumnResizing: true,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    })
    const { Tr, Th, Td, THead, TBody, Sorter } = Table
    const themeColor = useSelector((state) => state.theme.themeColor)
    return (
        <>
            <Table>
                <THead
                    className="border-b-2 "
                    style={{
                        borderColor: themeColor,
                    }}
                    variant="solid"
                >
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        <p className="text-black capitalize">
                                            {/* {console.log(header.getSize(3000))} */}
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
                                                        <>
                                                            <Sorter
                                                                sort={header.column.getIsSorted()}
                                                            />
                                                            <div
                                                                className={`table-resizer cursor-all-scroll ${
                                                                    header.column.getIsResizing()
                                                                        ? 'isResizing'
                                                                        : ''
                                                                }`}
                                                                onMouseDown={header.getResizeHandler()}
                                                                onTouchStart={header.getResizeHandler()}
                                                            ></div>
                                                        </>
                                                    }
                                                </div>
                                            )}
                                        </p>
                                    </Th>
                                )
                            })}
                            <Th>
                                <p className="text-black capitalize">Actions</p>
                            </Th>
                        </Tr>
                    ))}
                </THead>
                {isLoading ? (
                    <TableRowSkeleton columns={3} rows={5} />
                ) : (
                    <TBody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td
                                                key={cell.id}
                                                className="text-xs text-black font-medium border "
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        )
                                    })}
                                    <Td className="text-xs text-black font-medium border flex">
                                        {/* <Button
                                        size="xs"
                                        variant="twoTone"
                                        icon={<HiOutlinePencil />}
                                        onClick={() => {
                                            seteditData(row.original)
                                            //openDialog()
                                            navigate(`/BasicInformationFields`)
                                        }}
                                        style={{ marginRight: '5px' }}
                                    ></Button> */}
                                        <Link
                                            to={'/editUser'}
                                            state={{ editData: row.original }}
                                            size="xs"
                                            variant="twoTone"
                                        >
                                            <Button
                                                size="xs"
                                                variant="twoTone"
                                                icon={<HiOutlinePencil />}
                                            ></Button>
                                        </Link>

                                        <Link
                                            to={'/emp/EmplyeeView'}
                                            state={{ editData: row.original }}
                                            size="xs"
                                            variant="twoTone"
                                            className="ml-2"
                                        >
                                            <Button
                                                size="xs"
                                                variant="twoTone"
                                                icon={<HiEye />}
                                            ></Button>
                                        </Link>
                                    </Td>
                                </Tr>
                            )
                        })}
                    </TBody>
                )}
            </Table>
            <div className="flex  justify-end mt-2">
                <h1 className="text-xs  font-light">Records : {data.length}</h1>
            </div>
        </>
    )
}

export default DisplayTable
