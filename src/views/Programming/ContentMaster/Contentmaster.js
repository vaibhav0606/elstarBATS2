import { useState, useEffect, useMemo } from 'react'
import { Badge, Drawer, Input, Alert } from 'components/ui'
import {
    apiGetContentmaster,
    apiGetContentTypemaster,
    apiGetCensorshipmaster,
} from 'services/ProgrammingService'
import { apiGetLanguagemaster } from 'services/MasterService'
import { Button, Card } from 'components/ui'
import { HiOutlinePencil, HiPlusCircle, HiOutlinePlus } from 'react-icons/hi'
import ContentEdit from './ContentEdit'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import DisplayTable from 'views/Controls/DisplayTable'
import HeaderExtra from 'views/Controls/HeaderExtra'

const headerExtraContent = (
    openDrawer,
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
                    onClick={() => openDrawer()}
                >
                    Add Content
                </Button>
            </span>
        </span>
    )
}

const Contentmaster = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, seteditData] = useState([''])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [data, setdata] = useState([''])
    const [ContentType, setContentType] = useState({ value: '', label: '' })
    const [Language, setLanguage] = useState({ value: '', label: '' })
    const [Censorship, setCensorship] = useState({ value: '', label: '' })

    const [message, setMessage] = useTimeOutMessage()
    const [log, setlog] = useState('')
    console.log(window.screen.width)
    const statusColor = {
        1: 'bg-emerald-500',
        0: 'bg-red-500',
    }

    const columns = useMemo(
        () => [
            {
                header: 'Content Name',
                accessorKey: 'ContentName',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[row.IsActive]} />
                            <span className="ml-2 rtl:mr-2 capitalize">
                                {row.ContentName}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'ShortName',
                accessorKey: 'ShortName',
            },
            {
                header: 'ERPCode',
                accessorKey: 'ERPCode',
            },
        ],
        []
    )
    useEffect(() => {
        ;(async (values) => {
            const resp = await apiGetContentmaster(values)
            //console.log(resp.data.length)
            setdata(resp.data)
        })()
        ;(async (values) => {
            const ContentType = await apiGetContentTypemaster(values)
            const formattedOptions = ContentType.data.map((option) => ({
                value: option.ContentTypeCode,
                label: option.ContentTypeName,
            }))
            setContentType(formattedOptions)
        })()
        ;(async (values) => {
            const Language = await apiGetLanguagemaster(values)
            const formattedOptions = Language.data.map((option) => ({
                value: option.LanguageCode,
                label: option.LanguageName,
            }))
            setLanguage(formattedOptions)
        })()
        ;(async (values) => {
            const Censorship = await apiGetCensorshipmaster(values)
            const formattedOptions = Censorship.data.map((option) => ({
                value: option.CensorshipCode,
                label: option.CensorshipName,
            }))
            setCensorship(formattedOptions)
        })()
    }, [])

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = async (e, values) => {
        setIsOpen(false)
        const resp = await apiGetContentmaster(values)
        seteditData([''])
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
                header={<HeaderExtra Component={'Content Master'} />}
                headerExtra={headerExtraContent(
                    openDrawer,
                    DebouncedInput,
                    globalFilter,
                    setGlobalFilter
                )}
            >
                <DisplayTable
                    data={data}
                    columns={columns}
                    sorting={sorting}
                    globalFilter={globalFilter}
                    setSorting={setSorting}
                    setGlobalFilter={setGlobalFilter}
                    seteditData={seteditData}
                    openDrawer={openDrawer}
                />
            </Card>

            <Drawer
                title={
                    editData.ContentName ? (
                        <p className="text-xl font-medium text-black flex ">
                            <center>
                                <Button
                                    size="xs"
                                    variant="twoTone"
                                    icon={<HiOutlinePencil />}
                                ></Button>
                            </center>
                            Content Master
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
                            Content Master
                        </p>
                    )
                }
                isOpen={isOpen}
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
                width={
                    window.screen.width > 400
                        ? window.screen.width / 2.5
                        : window.screen.width / 1.5
                }
            >
                <ContentEdit
                    onDrawerClose={onDrawerClose}
                    editData={editData}
                    setMessage={setMessage}
                    setlog={setlog}
                    ContentType={ContentType}
                    Language={Language}
                    Censorship={Censorship}
                />
            </Drawer>
        </>
    )
}

export default Contentmaster
