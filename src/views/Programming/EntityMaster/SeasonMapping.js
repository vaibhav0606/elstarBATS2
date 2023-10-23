import { useState } from 'react'
import Table from 'components/ui/Table'
import { Button, Input, Notification, toast } from 'components/ui'

const { Tr, Th, Td, THead, TBody } = Table
const THD = [
    {
        name: 'Season No',
    },
    {
        name: 'Start Episode',
    },
    {
        name: 'End Episode',
    },
    {
        name: 'Action',
    },
]

const openNotification = (type) => {
    toast.push(
        <Notification
            title={type.charAt(0).toUpperCase() + type.slice(1)}
            type={type}
        >
            All Field Are Required
        </Notification>
    )
}
const SeasonMapping = () => {
    const [data, setdata] = useState([])
    const [seasonInput, setSeasonInput] = useState('')
    const [Start, setStart] = useState('')
    const [seaEnd, setSEnd] = useState('')
    const handleAdd = () => {
        if (!seasonInput || !Start || !seaEnd) {
            openNotification('danger')
        } else {
            const newData = {
                Season: seasonInput, // provide the value from the input field for Season
                Start: Start, // provide the value from the input field for Start
                End: seaEnd, // provide the value from the input field for End
            }
            setdata([...data, newData])
        }

        setSeasonInput('')
        setStart('')
        setSEnd('')
    }
    return (
        <div>
            <Table compact>
                <THead>
                    <Tr>
                        {THD.map((Td, index) => (
                            <Th key={index}>{Td.name}</Th>
                        ))}
                    </Tr>
                </THead>
                <TBody>
                    <Tr>
                        <Td>
                            <Input
                                size="xs"
                                value={seasonInput}
                                onChange={(e) => setSeasonInput(e.target.value)}
                            />
                        </Td>
                        <Td>
                            <Input
                                value={Start}
                                size="xs"
                                onChange={(e) => setStart(e.target.value)}
                            />
                        </Td>
                        <Td>
                            <Input
                                value={seaEnd}
                                size="xs"
                                onChange={(e) => setSEnd(e.target.value)}
                            />
                        </Td>
                        <Td>
                            <Button size="xs" onClick={() => handleAdd()}>
                                Add
                            </Button>
                        </Td>
                    </Tr>
                    {data.map((e, index) => (
                        <Tr key={index} style={{ border: '1px solid #E3E5EB' }}>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {e.Season}
                            </Td>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {e.Start}
                            </Td>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {e.End}
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default SeasonMapping
