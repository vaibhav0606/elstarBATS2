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
import { Button, Input } from 'components/ui'
import { HiOutlinePencil } from 'react-icons/hi'

const DisplayTable = ({
    data,
    columns,
    sorting,
    globalFilter,
    setSorting,
    setGlobalFilter,
    seteditData,
    openDrawer,
}) => {
    //console.log(setGlobalFilter);
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
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    })
    const { Tr, Th, Td, THead, TBody, Sorter } = Table

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
                                        style={{
                                            position: 'relative',
                                            //  width: header.getSize(3000),
                                        }}
                                    >
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
                                    </Th>
                                )
                            })}
                            <Th>Action</Th>
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
                                <Td
                                    onClick={() => {
                                        seteditData(row.original)
                                        openDrawer()
                                    }}
                                >
                                    <Button
                                        size="xs"
                                        variant="twoTone"
                                        icon={<HiOutlinePencil />}
                                    ></Button>
                                </Td>
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </>
    )
}

export default DisplayTable
