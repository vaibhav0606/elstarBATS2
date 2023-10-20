import BaseService from './BaseService'
const ApiService = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            BaseService(param)
                .then((response) => {
                    // console.log(response)
                    resolve(response)
                })
                .catch((errors) => {
                    // console.log(errors)
                    reject(errors)
                })
        })
    },
}

export default ApiService
