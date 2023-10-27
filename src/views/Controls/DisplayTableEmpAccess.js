import React, { useEffect, useState } from 'react'
import { Alert, Checkbox, ScrollBar, Table } from 'components/ui'
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
import { PostRights, apiGetgetrights } from 'services/MasterService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'

const DisplayTableEmpAccess = ({
    data,
    columns,
    sorting,
    globalFilter,
    setSorting,
    setGlobalFilter,
    onDrawerClose,
}) => {
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
    const [first, setfirst] = useState(1)
    const { LoginId } = useSelector((state) => state.auth.session)
    const tokenS = useSelector((state) => state.auth.session.token)
    const [datas, setData] = useState([''])
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')
    const [resultArray, setResultArray] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    // console.log(LoginId)
    useEffect(() => {
        ;(async (value) => {
            const resp = await apiGetgetrights(LoginId)
            setData(resp.data)
        })()
    }, [])

    const functioation = (row, e) => {
        const { checked, name } = e.target

        const rowIndex = selectedRows.findIndex(
            (selectedRow) => selectedRow.FormCode === row.FormCode
        )
        console.log('rowIndex' + rowIndex)

        if (name === 'Read') {
            if (checked) {
                row.IsRead = true
            } else {
                row.IsRead = false
            }
        }

        if (name === 'Write') {
            if (checked) {
                row.IsWrite = true
            } else {
                row.IsWrite = false
            }
        }

        if (rowIndex === -1) {
            // If the row is not in the selectedRows array, add it
            setSelectedRows([...selectedRows, row])
        } else {
            // Replace the row in the selectedRows array with the updated row
            selectedRows[rowIndex] = row
            setSelectedRows([...selectedRows])
        }

        const extractedData = selectedRows.map((item) => ({
            LoginCode: LoginId,
            FormCode: item.FormCode,
            CanRead: item.IsRead ? 1 : 0,
            CanWrite: item.IsWrite ? 1 : 0,
            SubModuleCode: item.SubModule.SubModuleCode,
            ModuleCode: item.module.ModuleCode,
        }))

        setResultArray(extractedData)
    }

    const onDrawerClose2 = async () => {
        const resp2 = await apiGetgetrights(LoginId)
        setData(resp2.data)
    }
    const addRights = async (values, token) => {
        try {
            const resp = await PostRights(values, token)
            if (resp.status === 200) {
                setlog('success')
                setMessage('Data Inserted Successfully')
                onDrawerClose2()
                onDrawerClose(LoginId)
                return
            } else if (resp.status === 'Server Error') {
                setlog('error')
                setMessage('Server Error')
                return
            }
        } catch (errors) {
            return {}
        }
    }

    return (
        <>
            {message && (
                <Alert className="mb-4" type={log} showIcon>
                    {message}
                </Alert>
            )}
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
                                    <Th>Read</Th>
                                    <Th>Write</Th>
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
                                    const filteredDatas = datas.filter(
                                        (e) =>
                                            e.Form.FormCode ===
                                                row.original.FormCode &&
                                            e.CanRead === 1
                                    )
                                    const filteredData2 = datas.filter(
                                        (e) =>
                                            e.Form.FormCode ===
                                                row.original.FormCode &&
                                            e.CanWrite === 1
                                    )
                                    const isCheck = filteredDatas.length > 0
                                    const isCheck2 = filteredData2.length > 0
                                    // console.log(filteredDatas)
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
                                                {isCheck ? (
                                                    <Checkbox
                                                        name="Read"
                                                        checked={true}
                                                        onClick={(e) =>
                                                            functioation(
                                                                row.original,
                                                                e
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <Checkbox
                                                        name="Read"
                                                        onClick={(e) =>
                                                            functioation(
                                                                row.original,
                                                                e
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Td>
                                            <Td>
                                                {isCheck2 ? (
                                                    <Checkbox
                                                        name="Write"
                                                        type="checkbox"
                                                        checked={true}
                                                        onClick={(e) =>
                                                            functioation(
                                                                row.original,
                                                                e
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <Checkbox
                                                        name="Write"
                                                        type="checkbox"
                                                        onClick={(e) =>
                                                            functioation(
                                                                row.original,
                                                                e
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Td>
                                        </Tr>
                                    )
                                })}
                        </TBody>
                    </Table>
                </ScrollBar>
            </div>

            {/* <Button className="mr-2 mb-2 " variant="solid" type="button">
                Save
            </Button> */}
            <Button
                className="mr-2 mb-2"
                variant="solid"
                type="button"
                onClick={() => {
                    // Handle the selected rows (rows with "Read" checkbox selected)
                    console.log('Selected Rows:', selectedRows)
                    addRights(resultArray, tokenS)
                    // You can perform any other actions with the selected rows here.
                }}
            >
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
