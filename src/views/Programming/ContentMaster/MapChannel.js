import { useRef, useEffect, useMemo, useState } from 'react'
 
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Table from 'components/ui/Table'
import Checkbox from 'components/ui/Checkbox'
import { apiGetChannelmaster } from 'services/MasterService'
import { Badge, Dropdown, ScrollBar, Tag } from 'components/ui'
import { Affix } from 'components/shared'
import './img.css'
 import cloneDeep from 'lodash/cloneDeep'
//import { createUID, taskLabelColors, labelList } from './utils'

const { Tr, Th, Td, THead, TBody } = Table


function IndeterminateCheckbox({ indeterminate, onChange, ...rest }) {
    const ref = useRef(null)

    useEffect(() => {
        if (typeof indeterminate === 'boolean' && ref.current) {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, indeterminate])

    return <Checkbox ref={ref} onChange={(_, e) => onChange(e)} {...rest} />
}
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function MapChannel() {
    const [ticketData, setTicketData] = useState({ labels: [] })
    
    const [rowSelection, setRowSelection] = useState({})
    const [data, setdata10] = useState({})
     const [channelList, setChannelList] = useState(['Map Channel', 'NEW Channel']);
     const [channelListColors, setchannelListColors] = useState({})
   
     const colorClasses = ['bg-rose-500', 'bg-indigo-500', 'bg-blue-500', 'bg-amber-400'];

    useEffect(() => {
        ; (async (values) => {
            const resp = await apiGetChannelmaster(values)
         
           

           setdata10(resp.data)
           
           const channels = resp.data
           .filter(channel => channel.IsActive === 1)  
          .map(channel => channel.ChannelName);  

        //   console.log('channelList')
        //   console.log(channelList)
        //   console.log('labelList')
        //   console.log(labelList)


             setChannelList(channels)
            const channelListColors = {};
 
            channels.forEach((channel, index) => {
              const colorClass = colorClasses[index % colorClasses.length]; // Rotate through color classes
              channelListColors[channel] = colorClass;
            });


            console.log('channelListColors')
            console.log(channelListColors)
            setchannelListColors(channelListColors)

        })()
    },  [])

    const columns = useMemo(() => {
        return [
            {
                id: 'select',
                header: ({ table }) => (
                    <IndeterminateCheckbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler(),
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <div className="px-1">
                        <IndeterminateCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    </div>
                ),
            },
            {
                header: 'Channel Name',
                accessorKey: 'ChannelName',
            },
            {
                header: ' ',
                accessorKey: ' ',
            },
            {
                header: ' ',
                accessorKey: ' ',
            },
            {
                header: ' ',
                accessorKey: ' ',
            },
            {
                header: ' ',
                accessorKey: ' ',
            },
            {
                header: ' ',
                accessorKey: ' ',
            },

        ]
    }, [])
    const onRemoveChannel = (labelToRemove) => {
        console.log(labelToRemove)
        // Use filter to create a new array that excludes the label to be removed
        const updatedLabels = ticketData.labels.filter((label) => label !== labelToRemove);
      
        // Update the state with the new labels array
        setTicketData((prevState) => ({
          ...prevState,
          labels: updatedLabels,
        }));
      };


    const onAddLabelClick = (label) => {
        console.log(label)
        const labels = cloneDeep(ticketData.labels)
        labels.push(label)
        
        setTicketData((prevState) => ({ ...prevState, ...{ labels: labels } }))
        console.log(labels)
    }

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true, //enable row selection for all rows
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (

        <div className="py-4 px-6">


            <div className="mt-4">
                {/* <div className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    Channels:
                </div> */}
                <div>
                    {ticketData.labels?.map((label) => (
                        <Tag
                            key={label}
                            className="mr-2 rtl:ml-2 mb-2"
                            prefix
                            prefixClass={`${channelListColors[label]}`}
                            onClose={() => onRemoveChannel(label)}
                        >
                             
                            {label}
                        </Tag>
                    ))}
                    <Dropdown
                        renderTitle={
                            <Tag 
                            showCloseButton={false}
                             className="border-dashed cursor-pointer mr-2 rtl:ml-2">
                                Map Channel
                            </Tag>
                        }
                        placement="bottom-end"
                    >
                        {channelList.map(
                            (label) =>
                                !ticketData.labels?.includes(
                                    label
                                ) && (
                                    <Dropdown.Item
                                        onSelect={
                                            onAddLabelClick
                                        }
                                        eventKey={label}
                                        key={label}
                                    >
                                        <div className="flex items-center">
                                            <Badge
                                                innerClass={`${channelListColors[label]}`}
                                            />
                                            <span className="ml-2 rtl:mr-2">
                                                {label}
                                            </span>
                                        </div>
                                    </Dropdown.Item>
                                )
                        )}
                    </Dropdown>
                </div>
            </div>



            {/* <div className="bg-white rounded-lg shadow-md">
                <div className="overflow-y-auto h-60">
                    <ScrollBar>
                        <Table className="w-full">
                            <THead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <Tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <Th key={header.id} colSpan={header.colSpan}>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </Th>
                                        ))}
                                    </Tr>
                                ))}
                            </THead>
                            <TBody>
                                {table.getRowModel().rows.map((row) => (
                                    <Tr key={row.id}>
                                        {row.getVisibleCells().map((cell, index) => (
                                            <Td key={cell.id} className={index === 1 ? 'w-2/5 overflow-ellipsis' : 'w-1/5 overflow-ellipsis'} title={cell.value}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </Td>
                                        ))}
                                    </Tr>
                                ))}
                            </TBody>
                        </Table>
                    </ScrollBar>
                </div>
            </div> */}
        </div>

    );
}
export default MapChannel
