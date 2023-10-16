import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setModule } from 'store/auth/sessionSlice'
const Home = () => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth.session)
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
    return <div>homer</div>
}

export default Home
