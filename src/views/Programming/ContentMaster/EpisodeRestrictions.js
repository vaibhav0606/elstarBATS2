import { useState } from 'react'
import Table from 'components/ui/Table'
import { Button, Input, Notification, toast } from 'components/ui'

const { Tr, Th, Td, THead, TBody } = Table
const THD = [
    {
        name: 'Season No',
    },
    {
        name: 'Episode No',
    },
    {
        name: 'Reason',
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
const EpisodeRestrictions = () => {
    const [data, setdata] = useState([])
    const [seasonInput, setSeasonInput] = useState('')
    const [EpisodeNo, setEpisodeNo] = useState('')
    const [Reason, setReason] = useState('')
    const handleAdd = () => {
        if (!seasonInput || !EpisodeNo || !Reason) {
            openNotification('danger')
        } else {
            const newData = {
                Season: seasonInput, // provide the value from the input field for Season
                EpisodeNo: EpisodeNo, // provide the value from the input field for EpisodeNo
                Reason: Reason, // provide the value from the input field for Reason
            }
            setdata([...data, newData])
        }

        setSeasonInput('')
        setEpisodeNo('')
        setReason('')
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
                                value={EpisodeNo}
                                size="xs"
                                onChange={(e) => setEpisodeNo(e.target.value)}
                            />
                        </Td>
                        <Td>
                            <Input
                                value={Reason}
                                size="xs"
                                onChange={(e) => setReason(e.target.value)}
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
                                {e.EpisodeNo}
                            </Td>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {e.Reason}
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}
export default EpisodeRestrictions
