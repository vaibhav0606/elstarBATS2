import React, { useEffect, useMemo, useState } from 'react'
import { apiGetEmployeemaster } from 'services/MasterService'
import DisplayTableEmpAccess from 'views/Controls/DisplayTableEmpAccess'
const EmpLoginRights = () => {
    const [sorting, setSorting] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [data, setdata] = useState([''])
    useEffect(() => {
        ;(async (values) => {
            const resp = await apiGetEmployeemaster(values)
            setdata(resp.data)
        })()
    }, [])
    const columns = useMemo(
        () => [
            {
                header: 'Employee Name',
                accessorKey: 'Emp_FirstName',
            },
            {
                header: 'Employee Code',
                accessorKey: 'Emp_Code',
            },
            {
                header: 'Status',
                id: 'action',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.IsActive]} />
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row.IsActive == 1 ? 'Active' : 'InActive'}
                            </span>
                        </div>
                    )
                },
            },
        ],
        []
    )

    return (
        <Card
            header="Employee Master"
            headerExtra={headerExtraContent(
                DebouncedInput,
                globalFilter,
                setGlobalFilter
            )}
        >
            <DisplayTableEmpAccess
                data={data}
                columns={columns}
                sorting={sorting}
                globalFilter={globalFilter}
                setSorting={setSorting}
                setGlobalFilter={setGlobalFilter}
                seteditData={seteditData}
                openDialog={openDialog}
            />
        </Card>
    )
}

export default EmpLoginRights
