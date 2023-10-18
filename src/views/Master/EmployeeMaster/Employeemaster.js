import { useState, useEffect, useMemo } from 'react'
import { Badge, Tabs, Input, Alert, Dialog, ScrollBar } from 'components/ui'
import {
    apiGetEmployeemaster,
    apiGetDesignationMaster,
    apiGetPlaceMaster,
    apiGetStateMaster,
    apiGetDepartmentmaster,
    apiGetCountryMaster,
    apiGetRegionMaster,
    apiGetempmasterdropmaster,
    apiGetEmpbyid,
} from 'services/MasterService'
import { Button, Card } from 'components/ui'
import { HiOutlinePencil, HiOutlinePlus, HiPlusCircle } from 'react-icons/hi'
import EmployeeEdit from './EmployeeEdit'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import DisplayTableEmp from 'views/Controls/DisplayTableEmp'
import EmpLoginRights from './EmpLoginRights'
import CustomerDetail from '../../crm/CustomerDetail/index'
import HeaderExtra from 'views/Controls/HeaderExtra'
import { useNavigate } from 'react-router-dom'

const Last = () => {
    return (
        <div>
            <p>
                In C++ its harder to shoot yourself in the foot, but when you
                do, you blow off your whole leg. (Bjarne Stroustrup)
            </p>
        </div>
    )
}

const headerExtraContent = (
    openDialog,
    DebouncedInput,
    globalFilter,
    setGlobalFilter,
    navigate
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
                <Button
                    block
                    variant="solid"
                    size="sm"
                    icon={<HiPlusCircle />}
                    onClick={() => navigate('/editUser')}
                >
                    Add Employee
                </Button>
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
    const [designation, setDesignation] = useState({ value: '', label: '' })
    const [State, setState] = useState({ value: '', label: '' })
    const [Department, setDepartment] = useState({ value: '', label: '' })
    const [Country, setCountry] = useState({ value: '', label: '' })
    const [Region, setRegion] = useState({ value: '', label: '' })
    const [Emp, setEmp] = useState({ value: '', label: '' })
    const [count, setcount] = useState(1)
    const [game, setGame] = useState(2)
    const [Place, setPlace] = useState({ value: '', label: '' })
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')
    const [currentTab, setCurrentTab] = useState('tab1')

    const { TabNav, TabList, TabContent } = Tabs

    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = async (response) => {
        try {
            const resp = await apiGetEmployeemaster()
            setdata(resp.data)
            const resps = await apiGetEmpbyid(response)
            seteditData(resps.data)
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }

    const onDialogOk = async () => {
        setIsOpen(false)
        seteditData([''])
        setcount(1)
        setGame(2)
        setCurrentTab('tab1')
    }

    const statusColor = {
        1: 'bg-emerald-500',
        0: 'bg-red-500',
    }

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

    const TABS = [
        {
            tab: 'tab1',
            name: 'Employee',
            component: (
                <EmployeeEdit
                    onDialogClose={onDialogClose}
                    editData={editData}
                    setMessage={setMessage}
                    setlog={setlog}
                    Designation={designation}
                    Place={Place}
                    State={State}
                    Department={Department}
                    Country={Country}
                    Region={Region}
                    Emp={Emp}
                    onDialogOk={onDialogOk}
                    setCurrentTab={setCurrentTab}
                    count={count}
                    setcount={setcount}
                    tab={'tab2'}
                    data={data}
                />
                 
            ),
            status: count >= 1 ? false : true,
        },
        {
            tab: 'tab2',
            name: 'Login Right',
            component: (
                // <EmpLoginRights
                //     setCurrentTab={setCurrentTab}
                //     count={count}
                //     setcount={setcount}
                //     tab={'tab3'}
                //     tabP={'tab1'}
                //     setGame={setGame}
                //     game={game}
                //     onDialogOk={onDialogOk}
                // />
                // <CustomerDetail
                // id={8}>

                // </CustomerDetail>
                <></>
            ),
            status: count >= 2 ? false : true,
        },
        {
            tab: 'tab3',
            name: 'Map Channel',
            component: <Last />,
            status: count >= 3 ? false : true,
        },
    ]

    useEffect(() => {
        ;(async (values) => {
            const resp = await apiGetEmployeemaster(values)
            setdata(resp.data)
        })()
        ;(async (values) => {
            const Designation = await apiGetDesignationMaster(values)
            const formattedOptions = Designation.data.map((option) => ({
                value: option.DesignationCode,
                label: option.DesignationName,
            }))
            setDesignation(formattedOptions)
        })()
        ;(async (values) => {
            const Place = await apiGetPlaceMaster(values)
            const formattedOptions = Place.data.map((option) => ({
                value: option.PlaceCode,
                label: option.PlaceName,
            }))
            setPlace(formattedOptions)
        })()
        ;(async (values) => {
            const State = await apiGetStateMaster(values)
            const formattedOptions = State.data.map((option) => ({
                value: option.StateCode,
                label: option.StateName,
            }))
            setState(formattedOptions)
        })()
        ;(async (values) => {
            const emp = await apiGetempmasterdropmaster(values)
            const formattedOptions = emp.data.map((option) => ({
                value: option.EmployeeCode,
                label: option.Emp_FirstName,
            }))
            setEmp(formattedOptions)
        })()
        ;(async (values) => {
            const Department = await apiGetDepartmentmaster(values)
            const formattedOptions = Department.data.map((option) => ({
                value: option.DepartmentCode,
                label: option.DepartmentName,
            }))
            setDepartment(formattedOptions)
        })()
        ;(async (values) => {
            const Country = await apiGetCountryMaster(values)
            const formattedOptions = Country.data.map((option) => ({
                value: option.CountryCode,
                label: option.CountryName,
            }))
            setCountry(formattedOptions)
        })()
        ;(async (values) => {
            const Region = await apiGetRegionMaster(values)
            const formattedOptions = Region.data.map((option) => ({
                value: option.RegionCode,
                label: option.RegionName,
            }))
            setRegion(formattedOptions)
        })()
    }, [])

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
            {/* {log && (
                <Alert className="mb-4" type="success" showIcon>
                    {log}
                </Alert>
            )} */}
            <Card
                header={<HeaderExtra Component={'Employee Master'} />}
                headerExtra={headerExtraContent(
                    openDialog,
                    DebouncedInput,
                    globalFilter,
                    setGlobalFilter,
                    navigate
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
                    openDialog={openDialog}
                    setCurrentTab={setCurrentTab}
                    setcount={setcount}
                    setGame={setGame}
                />
            </Card>

            <Dialog
                isOpen={dialogIsOpen}
                closable={false}
                width="auto"
                height="auto"
                style={{
                    content: {
                        overflow: 'auto',
                    },
                }}
            >
                <div className="flex flex-col h-full justify-between">
                    {/* // sm:max-h-96 */}

                    <div>
                        {editData.Emp_FirstName ? (
                            <p className="text-xl font-medium text-black flex ">
                                <center>
                                    <Button
                                        size="xs"
                                        variant="twoTone"
                                        icon={<HiOutlinePencil />}
                                    ></Button>
                                </center>
                                Employee Master
                            </p>
                        ) : (
                            <p className="text-xl font-medium text-black flex ">
                                <center>
                                    <Button
                                        size="xs"
                                        variant="twoTone"
                                        icon={<HiOutlinePlus />}
                                    ></Button>
                                </center>
                                Employee Master
                            </p>
                        )}
                        {message && (
                            <Alert className="mb-4" type={log} showIcon>
                                {message}
                            </Alert>
                        )}
                        <Tabs
                            value={currentTab}
                            onChange={(val) => setCurrentTab(val)}
                        >
                            <TabList>
                                {TABS.map((i) => (
                                    <TabNav value={i.tab} disabled={i.status}>
                                        {editData.Emp_FirstName
                                            ? `Edit ${i.name} `
                                            : `Add ${i.name} `}
                                    </TabNav>
                                ))}
                            </TabList>
                            <div className="p-4">
                                {TABS.map((i) => (
                                    <TabContent value={i.tab}>
                                        {i.component}
                                    </TabContent>
                                ))}
                            </div>
                        </Tabs>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Employee
