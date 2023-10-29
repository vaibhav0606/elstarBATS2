import React, { useEffect, useState } from 'react'
import { useGlobalFilter } from '@tanstack/react-table'
import { Pagination, ScrollBar, Select, Table } from 'components/ui'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { Button } from 'components/ui'
import { HiOutlinePencil } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import GlobalFilter from './filters'
import './Displaytable.css'
import { Affix } from 'components/shared'
import TableRowSkeleton from 'components/shared/loaders/TableRowSkeleton'


// Import the export-to-excel function
//import { exportToExcel } from 'react-table-export-to-excel';

// Import jsPDF for PDF export
//import jsPDF from 'jspdf';

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
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    
    const onPaginationChange = (page) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value) => {
        table.setPageSize(Number(value))
    }

    const { Tr, Th, Td, THead, TBody, Sorter } = Table
    const themeColor = useSelector((state) => state.theme.themeColor)
    const totalData = data.length

    const pageSizeOption = [
        { value: 10, label: '10 / page' },
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ]

    const handleExportToExcel = () => {
        const sheetData = table.getRowModel().rows.map((row, index) => {
          const currentPage = table.getState().pagination.pageIndex;
          const pageSize = table.getState().pagination.pageSize;
          const serialNumber = currentPage * pageSize + index + 1;
          const rowData = [serialNumber];
    
          row.getVisibleCells().forEach((cell) => {
            const cellValue = flexRender(cell.column.columnDef.cell, cell.getContext());
            rowData.push(cellValue);
          });
    
          return rowData;
        });
    
        const sheetName = 'Table Data';
        const fileName = 'table_data';
    
        //exportToExcel(sheetData, sheetName, fileName);
      };
    
      // Define a function to export data to PDF
    // const handleExportToPDF = () => {
    //     const doc = new jsPDF();
    //     const tableData = table.getRowModel().rows.map((row, index) => {
    //         const currentPage = table.getState().pagination.pageIndex;
    //         const pageSize = table.getState().pagination.pageSize;
    //         const serialNumber = currentPage * pageSize + index + 1;
    //         const rowData = [serialNumber];

    //         row.getVisibleCells().forEach((cell) => {
    //             const cellValue = flexRender(cell.column.columnDef.cell, cell.getContext());
    //             rowData.push(cellValue);
    //         });

    //         return rowData;
    //     });

    //     // doc.autoTable({
    //     //   head: [['Sr.', ...columns.map((col) => col.Header)],
    //     //   body: tableData,
    //     // });

    //     doc.save('table_data.pdf');
    // };


    return (
        <>
        <div style={{   overflowY: 'auto' }}>
            <Table >
                <Affix className="z-50">
                    <THead
                        className="border-b-1 "
                        style={{
                            borderColor: themeColor,
                        }}
                        variant="solid"
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id} className="tr" >
                                <Th className="srno th">
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
                                <Th className="actions">
                                    <center className="text-black capitalize">
                                        Actions
                                    </center>
                                </Th>
                            </Tr>
                        ))}
                    </THead>
                </Affix>
                {isLoading ? (
                    <TableRowSkeleton columns={3} rows={5} />
                ) : (
                    <TBody className="tbody">
                        <ScrollBar>
                            {table.getRowModel().rows.map((row, index) => {
                                 const currentPage = table.getState().pagination.pageIndex;
                                 const pageSize = table.getState().pagination.pageSize;
                                 const serialNumber = currentPage * pageSize + index + 1;

                                return (
                                    <Tr key={row.id} className="border-y tr">
                                        <Td className="  text-xs text-black font-light text-center capitalize  srno">
                                            {serialNumber}
                                        </Td>

                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <Td
                                                    key={cell.id}
                                                    className="text-xs text-black font-light  capitalize td"
                                                >
                                                    <p className="text-black capitalize">
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
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
                                            className="text-xs text-black font-medium actions td"
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
                )}
            </Table>
  
        </div>
        <div className="flex items-center justify-between mt-1">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={totalData}
                    onChange={onPaginationChange}
                />
                <div style={{ minWidth: 130 }}>
                    <Select
                        size="sm"
                        isSearchable={false}
                        value={pageSizeOption.filter(
                            (option) =>
                                option.value ===
                                table.getState().pagination.pageSize
                        )}
                        options={pageSizeOption}
                        onChange={(option) => onSelectChange(option.value)}
                    />
                </div>
            </div> 
            <div>
                {/* <Button onClick={handleExportToExcel}>Export to Excel</Button>
                <Button onClick={handleExportToPDF}>Export to PDF</Button> */}
            </div>
            <div className="flex  justify-start mt-2">
                <h1 className="text-xs  font-light">Records : {data.length}</h1>
            </div>
        </>
    )
}

export default DisplayTable
