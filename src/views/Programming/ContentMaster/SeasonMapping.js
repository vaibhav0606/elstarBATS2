import React, { useState } from 'react'
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
            All Fields Are Required
        </Notification>
    )
}

const SeasonMapping = () => {
    const [data, setData] = useState([])
    const [seasonInput, setSeasonInput] = useState('')
    const [Start, setStart] = useState('')
    const [seaEnd, setSEnd] = useState('')
    const [editingRow, setEditingRow] = useState(null)

    const handleAdd = () => {
        if (!seasonInput || !Start || !seaEnd) {
            openNotification('danger')
        } else {
            const newData = {
                Season: seasonInput,
                Start: Start,
                End: seaEnd,
            }
            setData([...data, newData])
        }

        setSeasonInput('')
        setStart('')
        setSEnd('')
    }

    const handleEdit = (index) => {
        setEditingRow(index)
    }

    const handleSave = (index) => {
        // Update the data with the edited values
        const updatedData = [...data]
        updatedData[index] = {
            Season: seasonInput,
            Start: Start,
            End: seaEnd,
        }
        setData(updatedData)

        // Clear the input fields and reset the editing row
        setSeasonInput('')
        setStart('')
        setSEnd('')
        setEditingRow(null)
    }

    return (
        <div>
            <Table style={{ border: '3px solid #E3E5EB' }} compact>
                <THead>
                    <Tr style={{ border: '1px solid #E3E5EB' }}>
                        {THD.map((Td, index) => (
                            <Th key={index}>{Td.name}</Th>
                        ))}
                        {/* <Th>Edit</Th> */}
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
                        <Tr key={index} style={{ border: '1px solid #E3E5EB' }} className='fontsetting'  >
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {editingRow === index ? (
                                    <Input value={seasonInput} size="xs" onChange={(e) => setSeasonInput(e.target.value)} />
                                ) : (
                                    e.Season
                                )}
                            </Td>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {editingRow === index ? (
                                    <Input value={Start} size="xs" onChange={(e) => setStart(e.target.value)} />
                                ) : (
                                    e.Start
                                )}
                            </Td>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {editingRow === index ? (
                                    <Input value={seaEnd} size="xs" onChange={(e) => setSEnd(e.target.value)} />
                                ) : (
                                    e.End
                                )}
                            </Td>
                            <Td style={{ border: '1px solid #E3E5EB' }}>
                                {editingRow === index ? (
                                    <Button size="xs" onClick={() => handleSave(index)}>
                                        Save
                                    </Button>
                                ) : (
                                    <Button size="xs" onClick={() => handleEdit(index)}>
                                        Edit
                                    </Button>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default SeasonMapping