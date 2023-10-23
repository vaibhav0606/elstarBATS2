import { useState, useEffect, useMemo } from 'react'
import { Badge, Tabs, Input, Alert, Dialog, ScrollBar } from 'components/ui'
import { apiGetEmployeemaster } from 'services/MasterService'
import { Button, Card } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'

import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import DisplayTableEmp from 'views/Controls/DisplayTableEmp'
import HeaderExtra from 'views/Controls/HeaderExtra'
import { Link, useNavigate } from 'react-router-dom'

const headerExtraContent = (
    DebouncedInput,
    globalFilter,
    setGlobalFilter,
    editData
) => {
    return (
        <span className="flex items-center">
            <span className="mr-1 mt-4  font-semibold">
                <DebouncedInput
                    value={globalFilter ?? ''}
                    className=" solid"
                    placeholder="Search all columns..."
                    size="sm"
                    onChange={(value) => {
                        setGlobalFilter(value)
                    }}
                />
            </span>
            <span className="mr-1 font-semibold">
                <Link to={'/addUser'}>
                    <Button
                        block
                        variant="solid"
                        size="sm"
                        icon={<HiPlusCircle />}
                    >
                        Add Employee
                    </Button>
                </Link>
            </span>
        </span>
    )
}

const Employee = () => {
    const navigate = useNavigate()
    // const [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([''])
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')

    const statusColor = {
        1: 'bg-emerald-500',
        0: 'bg-red-500',
    }

    const columns = useMemo(
        () => [
            {
                header: '#',
                accessorKey: 'EmployeeCode',
            },
            {
                header: 'Employee Name',
                accessorKey: 'Emp_FirstName',
            },
            // {
            //     header: 'Employee Name',
            //     accessorKey: 'Emp_Image',
            // },
            {
                header: 'Employee Code',
                accessorKey: 'Emp_Code',
            },
            {
                header: 'Department',
                accessorKey: 'Department',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row.Department?.DepartmentName}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Contact',
                accessorKey: 'Emp_Contact1',
            },
            {
                header: 'Email',
                accessorKey: 'Emp_Email',
            },

            // {
            //     header: 'Status',
            //     id: 'action',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 <Badge className={statusColor[row.IsActive]} />
            //                 <span className="ml-2 rtl:mr-2 capitalize">
            //                     {row.IsActive == 1 ? 'Active' : 'InActive'}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
        ],
        []
    )

    useEffect(() => {
        ;(async (values) => {
            const resp = await apiGetEmployeemaster(values)
            setdata(resp.data)
        })()
    }, [])

    const onDrawerClose = async (e, values) => {
        const resp = await apiGetEmployeemaster(values)
        setdata(resp.data)
    }
    function DebouncedInput({
        value: initialValue,
        onChange,
        debounce = 500,
        ...props
    }) {
        const [value, setValue] = useState(initialValue)

        useEffect(() => {
            setValue(initialValue)
        }, [initialValue])

        useEffect(() => {
            const timeout = setTimeout(() => {
                onChange(value)
            }, debounce)

            return () => clearTimeout(timeout)
        }, [value])
        return (
            <div className="flex justify-end">
                <div className="flex items-center mb-4">
                    <span className="mr-2">Search:</span>
                    <Input
                        {...props}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </div>
        )
    }

    return (
        <>
            {message && (
                <Alert className="mb-4" type={log} showIcon>
                    {message}
                </Alert>
            )}
            <Card
                header={<HeaderExtra Component={'Employee Master'} />}
                headerExtra={headerExtraContent(
                    DebouncedInput,
                    globalFilter,
                    setGlobalFilter,
                    navigate,
                    editData
                )}
            >
                <DisplayTableEmp
                    data={data}
                    columns={columns}
                    sorting={sorting}
                    globalFilter={globalFilter}
                    setSorting={setSorting}
                    setGlobalFilter={setGlobalFilter}
                    seteditData={seteditData}
                    onDrawerClose={onDrawerClose}
                />
            </Card>
        </>
    )
}

export default Employee
