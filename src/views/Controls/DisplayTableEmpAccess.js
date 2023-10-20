import React, { useEffect, useState } from 'react'
import { Checkbox, ScrollBar, Table } from 'components/ui'
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
import { useSelector } from 'react-redux'

const DisplayTableEmpAccess = ({
    data,
    columns,
    sorting,
    globalFilter,
    setSorting,
    setGlobalFilter,
    seteditData,
    openDialog,
    onDialogOk,
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
        // getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    })
    const { Tr, Th, Td, THead, TBody, Sorter } = Table
    const [first, setfirst] = useState(1)
    const [CheckboxValue, setCheckboxValue] = useState([''])
    const { LoginId } = useSelector((state) => state.auth.session)
    const [datas, setData] = useState([])
    const functioation = (val, e) => {
        const { checked, name } = e.target
    }

    console.log(data)
    return (
        <>
            <h6 className="mb-4">Login Rights</h6>
            <div className="overflow-y-auto h-96 mb-6">
                {/* <Button onClick={() => setfirst(1)}>IsActive</Button>
                <Button onClick={() => setfirst(0)}> Inactive</Button> */}

                <ScrollBar>
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
                                                <p className="apitalize">
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
                                                                header.column
                                                                    .columnDef
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
                                    <Th>Read Write</Th>
                                </Tr>
                            ))}
                        </THead>
                        <TBody>
                            {table
                                .getRowModel()
                                .rows.filter(
                                    (row) => row.original.IsActive === first
                                )
                                .map((row) => {
                                    return (
                                        <Tr key={row.id}>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => {
                                                    return (
                                                        <Td key={cell.id}>
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </Td>
                                                    )
                                                })}
                                            <Td>
                                                <Checkbox
                                                    name="Read"
                                                    onClick={(e) =>
                                                        functioation(
                                                            row.original,
                                                            e
                                                        )
                                                    }
                                                />
                                                &nbsp;&nbsp;
                                                <Checkbox
                                                    name="Write"
                                                    onClick={(e) =>
                                                        functioation(
                                                            row.original,
                                                            e
                                                        )
                                                    }
                                                />
                                            </Td>
                                        </Tr>
                                    )
                                })}
                        </TBody>
                    </Table>
                </ScrollBar>
            </div>

            <Button className="mr-2 mb-2 " variant="solid" type="button">
                Save
            </Button>

            {/* <Button
                className="mr-2 mb-2"
                variant="twoTone"
                color="red-600"
                type="button"
               
            >
                Close
            </Button> */}
        </>
    )
}

export default DisplayTableEmpAccess
