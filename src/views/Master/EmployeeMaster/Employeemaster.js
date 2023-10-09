import { useState, useEffect, useMemo } from 'react'
import { Badge, Tabs, Input, Alert, Dialog } from 'components/ui'
import {
    apiGetEmployeemaster,
    apiGetDesignationMaster,
    apiGetPlaceMaster,
    apiGetStateMaster,
    apiGetDepartmentmaster,
    apiGetCountryMaster,
    apiGetRegionMaster,
} from 'services/MasterService'
import { Button, Card } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import EmployeeEdit from './EmployeeEdit'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import DisplayTableEmp from 'views/Controls/DisplayTableEmp'

const headerExtraContent = (
    openDialog,
    DebouncedInput,
    globalFilter,
    setGlobalFilter
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
                    onClick={() => openDialog()}
                >
                    Add Employee
                </Button>
            </span>
        </span>
    )
}

const Employee = () => {
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

    const [Place, setPlace] = useState({ value: '', label: '' })
    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')
    const [currentTab, setCurrentTab] = useState('tab1')
    const { TabNav, TabList, TabContent } = Tabs

    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
        setIsOpen(false)
    }

    const onDialogOk = () => {
        setIsOpen(false)
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
    // const openDrawer = () => {
    //     setIsOpen(true)
    // }

    // const onDrawerClose = async (e, values) => {
    //     // setIsOpen(false)
    //     const resp = await apiGetEmployeemaster(values)
    //     setdata(resp.data)
    //     seteditData([''])
    // }
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

    // console.log(log)
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
                header="Employee Master"
                headerExtra={headerExtraContent(
                    openDialog,
                    DebouncedInput,
                    globalFilter,
                    setGlobalFilter
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
                />
            </Card>

            {/* <Drawer
                title={
                    editData.Emp_FirstName
                        ? 'Edit Employee Master'
                        : 'Add Employee Master'
                }
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={600}
            >
                <LocationEdit
                    onDrawerClose={onDrawerClose}
                    editData={editData}
                    setMessage={setMessage}
                    setlog={setlog}
                    currency={currency}
                />
            </Drawer> */}

            <Dialog
                isOpen={dialogIsOpen}
                width={1000}
                height="auto"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                style={{
                    content: {
                        overflow: 'auto',
                    },
                }}
                contentClassName=" max-h-96 overflow-y-auto"
            >
                <div className="flex flex-col h-full justify-between">
                    {/* // sm:max-h-96 */}

                    <div>
                        <h5 className="mb-4">
                            {editData.Emp_FirstName
                                ? 'Edit Employee Master'
                                : 'Add Employee Master'}
                        </h5>

                        <Tabs
                            value={currentTab}
                            onChange={(val) => setCurrentTab(val)}
                        >
                            <TabList>
                                <TabNav value="tab1">
                                    {editData.Emp_FirstName
                                        ? 'Edit Employee '
                                        : 'Add Employee '}
                                </TabNav>
                                <TabNav value="tab2">
                                    {editData.Emp_FirstName
                                        ? 'Edit Login Rights '
                                        : 'Add Login Rights  '}
                                </TabNav>
                                <TabNav value="tab3">
                                    {editData.Emp_FirstName
                                        ? 'Edit Map Channel '
                                        : 'Add Map Channel  '}
                                </TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="tab1">
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
                                    />
                                </TabContent>
                                <TabContent value="tab2">
                                    <p>
                                        A computer lets you make more mistakes
                                        faster than any invention in human
                                        history with the possible exceptions of
                                        handguns and tequila. (Mitch Radcliffe).
                                    </p>
                                </TabContent>
                                <TabContent value="tab3">
                                    <p>
                                        In C++ its harder to shoot yourself in
                                        the foot, but when you do, you blow off
                                        your whole leg. (Bjarne Stroustrup)
                                    </p>
                                </TabContent>
                            </div>
                        </Tabs>

                        <div className="text-right mt-6">
                            <Button
                                className="ltr:mr-2 rtl:ml-2"
                                variant="plain"
                                onClick={onDialogClose}
                            >
                                Cancel
                            </Button>
                            <Button variant="solid" onClick={onDialogOk}>
                                Okay
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Employee
