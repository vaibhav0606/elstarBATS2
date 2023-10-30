import { useState, useEffect, useMemo, useRef } from 'react'
import { Badge, Drawer, Input, Alert, Progress } from 'components/ui'
import { apiGetZonemaster, apiGetCurrencymaster } from 'services/MasterService'
import { Button, Card } from 'components/ui'
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi'
import {
    FcBarChart,
    FcBullish,
    FcLowPriority,
    FcStatistics,
} from 'react-icons/fc'
import './fnt.css'
const axios = require('axios')
const ProgressInfo = ({ precent }) => {
    return (
        <div>
            <h3 style={{ fontSize: 15 }} className="pppp">
                {precent}
            </h3>
        </div>
    )
}

const Index = () => {
    const [first, setfirst] = useState([''])
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://www.omdbapi.com/?t=jawan&apikey=4374994a',
            headers: {},
        }

        axios
            .request(config)
            .then((response) => {
                setfirst(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <Card>
            <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2 ">
                    <div style={{ marginTop: 50, marginLeft: 50 }}>
                        <h1>{first.Title}</h1>
                        <br />
                        <br />
                        <p>{first.Plot}</p>
                    </div>
                </div>
                <div class="col-span-1 ">
                    <img src={first.Poster} height={300} />
                </div>
            </div>
            <div class="grid grid-cols-8 gap-2">
                <div className="col-span-1">
                    <Progress
                        variant="circle"
                        percent={first.imdbRating * 10}
                        width={60}
                        className="flex justify-center"
                        strokeWidth={10}
                        customInfo={<ProgressInfo precent={first.imdbRating} />}
                    />
                    <center>Ratings</center>
                </div>
                <div className="col-span-1">
                    <div style={{ marginTop: '5px', width: 100 }}>
                        <center>
                            <p className="text-xl">{first.imdbVotes}</p>
                            <h3 style={{ fontSize: 15 }} className="pppp">
                                Votes
                            </h3>
                        </center>
                        <p className="text-xl">
                            <Progress
                                color="blue-500"
                                percent={100}
                                showInfo={false}
                                size="sm"
                            />
                        </p>
                    </div>
                </div>
                <div className="col-span-1">
                    <p className="text-6xl">
                        <FcStatistics />
                    </p>
                    <p className="text-sm">{first.BoxOffice}</p>
                </div>
            </div>
        </Card>
    )
}

export default Index
