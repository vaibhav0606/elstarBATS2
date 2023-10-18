import React, { useEffect, useState } from 'react'
import { Table } from 'components/ui'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel,
} from '@tanstack/react-table'
import { Button } from 'components/ui'
import { HiOutlinePencil } from 'react-icons/hi'
import { useSelector } from 'react-redux'

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
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
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
                            <Th>
                                <p className="text-black capitalize">#</p>
                            </Th>

                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        <p className="text-black capitalize">
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
                                <center className="text-black capitalize">
                                    Actions
                                </center>
                            </Th>
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row, index) => {
                        return (
                            <Tr key={row.id}>
                                <Td className="text-xs text-black font-light border-y capitalize">
                                    {index + 1}
                                </Td>

                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td
                                            key={cell.id}
                                            className="text-xs text-black font-light border-y capitalize"
                                        >
                                            <p className="text-black capitalize">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </p>
                                        </Td>
                                    )
                                })}
                                <Td
                                    onClick={() => {
                                        seteditData(row.original)
                                        openDrawer()
                                    }}
                                    className="text-xs text-black font-medium border-y"
                                >
                                    <center>
                                        <Button
                                            size="xs"
                                            variant="twoTone"
                                            icon={<HiOutlinePencil />}
                                        ></Button>
                                    </center>
                                </Td>
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
            <div className="flex  justify-start mt-2">
                <h1 className="text-xs  font-light">Records : {data.length}</h1>
            </div>
        </>
    )
}

export default DisplayTable
