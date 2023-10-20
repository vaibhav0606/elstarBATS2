import { useState } from 'react'
import Table from 'components/ui/Table'
import { Button, Input, Notification, toast } from 'components/ui'

const { Tr, Th, Td, THead, TBody } = Table
const THD = [
    {
        name: 'StarCastType Name',
    },
    {
        name: 'StartCast Name',
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
const MapStarcast = () => {
    const [data, setdata] = useState([])
    const [StarCastType, setStarCastType] = useState('')
    const [StartCast, setStartCast] = useState('')
    const handleAdd = () => {
        if (!StarCastType || !StartCast) {
            openNotification('danger')
        } else {
            const newData = {
                StarCastType: StarCastType, // provide the value from the input field for Season
                StartCast: StartCast, // provide the value from the input field for End
            }
            setdata([...data, newData])
        }

        setStarCastType('')
        setStartCast('')
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
                                value={StarCastType}
                                onChange={(e) =>
                                    setStarCastType(e.target.value)
                                }
                            />
                        </Td>
                        <Td>
                            <Input
                                value={StartCast}
                                size="xs"
                                onChange={(e) => setStartCast(e.target.value)}
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
                                {e.StarCastType}
                            </Td>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {e.StartCast}
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}
export default MapStarcast
