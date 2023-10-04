import BaseService from './BaseService'
const axios = require('axios')
const FormData = require('form-data')
const ApiService2 = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            // BaseService(param)
            let data = new FormData()
            data.append('username', param.data.userName)
            data.append('password', param.data.password)

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://103.14.97.155:3000/login',
                headers: {},
                data: data,
            }

            axios
                .request(config)
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },
}

export default ApiService2
