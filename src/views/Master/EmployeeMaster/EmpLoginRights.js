import { Badge, Card } from 'components/ui'
import React, { useEffect, useMemo, useState } from 'react'
import { apiGetFormmaster } from 'services/MasterService'
import DisplayTableEmpAccess from 'views/Controls/DisplayTableEmpAccess'

const statusColor = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
}

const EmpLoginRights = ({  setCurrentTab,count,setcount,tab,tabP}) => {
    const [sorting, setSorting] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [data, setdata] = useState([''])
    useEffect(() => {
        ;(async (values) => {
            const resp = await apiGetFormmaster(values)
            setdata(resp.data)
        })()
    }, [])
    const columns = useMemo(
        () => [
            {
                header: 'Module Name',
                accessorKey: 'module',
                cell: (props) => {
                    const { module } = props.row.original
                    return (
                        <div className="flex items-center">
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {module?.ModuleName}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'SubModule Name',
                accessorKey: 'SubModule',
                cell: (props) => {
                    const { SubModule } = props.row.original
                    return (
                        <div className="flex items-center">
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {SubModule?.SubModuleName}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Form Name',
                accessorKey: 'FormName',
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
    const [game, setGame] = useState(2)

    const handleClicks = () => {
        setCurrentTab(tab)
        if (game > 2) {
            setGame(1)
            setcount(1)
        } else {
            setcount(count+1)
            setGame(game + 1)
        }
    }
    const handleClickPrevious = () => {
        setCurrentTab(tabP)
        if (game > 2) {
            setGame(1)
            setcount(1)
        } else {
            setcount(count-1)
            setGame(game - 1)
        }
    }
    return (
        <Card>
            <DisplayTableEmpAccess
                data={data}
                columns={columns}
                sorting={sorting}
                globalFilter={globalFilter}
                setSorting={setSorting}
                setGlobalFilter={setGlobalFilter}
                handleClicks={handleClicks}
                game={game}
                handleClickPrevious={handleClickPrevious}
            />
        </Card>
    )
}

export default EmpLoginRights
