import React, { useEffect, useState } from 'react'
import { useGlobalFilter } from '@tanstack/react-table';
import { ScrollBar, Table } from 'components/ui'
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
import GlobalFilter from './filters';
import './Displaytable.css';



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
        getFilteredRowModel: getFilteredRowModel(),
    })
    const { Tr, Th, Td, THead, TBody, Sorter } = Table
    const themeColor = useSelector((state) => state.theme.themeColor)

    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            <Table>
                <THead
                    className="border-b-1 "
                    style={{
                        borderColor: themeColor,
                    }}
                    variant="solid"
                >
                    {table.getHeaderGroups().map((headerGroup) => (

                        <Tr   key={headerGroup.id}>
                            <Th className="srno" >
                                <p className="text-black capitalize">Sr.</p>

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

                                                            {/* <div>
                                                                <GlobalFilter
                                                                    column={header.column}
                                                                    themeColor={themeColor}
                                                                />
                                                            </div> */}

                                                            <div
                                                                className={`cursor-all-scroll ${header.column.getIsResizing()
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
                            <Th className="actions" >
                                <center className="text-black capitalize">
                                    Actions
                                </center>
                            </Th>
                        </Tr>
                    ))}
                </THead>
                <TBody>   
                    <ScrollBar>
                    {table.getRowModel().rows.map((row, index) => {
                        return (

                            <Tr key={row.id} className="border-y">
                                <Td className="text-xs text-black font-light text-center capitalize srno">

                                    {index + 1}
                                </Td>

                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td
                                            key={cell.id}
                                            className="text-xs text-black font-light  capitalize"
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
                                    className="text-xs text-black font-medium actions"
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
                    </ScrollBar>
                </TBody>
            </Table>
            <div className="flex  justify-start mt-2">
                <h1 className="text-xs  font-light">Records : {data.length}</h1>
            </div>
        </div>
    )
}

export default DisplayTable
