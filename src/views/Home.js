import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setModule } from 'store/auth/sessionSlice'
import { useState } from 'react'
import MyTasks from './Dashboard/MyTasks'
import { Loading } from 'components/shared'

const myTasksData = [
    {
        taskId: 'KCM-1393',
        taskSubject: 'Design sign up flow',
        priority: 0,
        assignees: [
            {
                id: '1',
                name: 'Carolyn Perkins',
                email: 'eileen_h@hotmail.com',
                img: '/img/avatars/thumb-1.jpg',
            },
            {
                id: '2',
                name: 'Terrance Moreno',
                email: '',
                img: '/img/avatars/thumb-2.jpg',
            },
        ],
    },
    {
        taskId: 'KCM-2039',
        taskSubject: 'Update contact page',
        priority: 1,
        assignees: [
            {
                id: '1',
                name: 'Carolyn Perkins',
                email: 'eileen_h@hotmail.com',
                img: '/img/avatars/thumb-1.jpg',
            },
        ],
    },
    {
        taskId: 'KCM-2155',
        taskSubject: 'Document features 2.0',
        priority: 1,
        assignees: [
            {
                id: '1',
                name: 'Carolyn Perkins',
                email: 'eileen_h@hotmail.com',
                img: '/img/avatars/thumb-1.jpg',
            },
            {
                id: '2',
                name: 'Terrance Moreno',
                email: '',
                img: '/img/avatars/thumb-2.jpg',
            },
            {
                id: '3',
                name: 'Ron Vargas',
                email: 'ronnie_vergas@infotech.io',
                img: '/img/avatars/thumb-3.jpg',
            },
        ],
    },
    {
        taskId: 'KCM-2270',
        taskSubject: 'Fix typo in home page',
        priority: 2,
        assignees: [
            {
                id: '1',
                name: 'Carolyn Perkins',
                email: 'eileen_h@hotmail.com',
                img: '/img/avatars/thumb-1.jpg',
            },
            {
                id: '5',
                name: 'Joyce Freeman',
                email: 'joyce991@infotech.io',
                img: '/img/avatars/thumb-5.jpg',
            },
        ],
    },
    {
        taskId: 'KCM-1957',
        taskSubject: 'Fix broken API',
        priority: 0,
        assignees: [
            {
                id: '1',
                name: 'Carolyn Perkins',
                email: 'eileen_h@hotmail.com',
                img: '/img/avatars/thumb-1.jpg',
            },
        ],
    },
]

const Home = () => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth.session)
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/modulemaster/',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        axios
            .request(config)
            .then((response) => {
                console.log(response.data)
                dispatch(setModule(response.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <div className="flex flex-col gap-4 h-full">
                {/* <ProjectDashboardHeader data={{ userName, taskCount }} /> */}
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="flex flex-col gap-4 flex-auto">
                        {/* <TaskOverview data={projectOverviewData} /> */}
                        <MyTasks data={myTasksData} />
                        {/* <Projects data={projectsData} /> */}
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="xl:w-[380px]">
                            {/* <Schedule data={scheduleData} /> */}
                            {/* <Activities data={activitiesData} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
