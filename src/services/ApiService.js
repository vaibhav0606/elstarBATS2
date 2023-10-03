import BaseService from './BaseService'

const ApiService = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            BaseService(param)
                .then((response) => {
                    alert('hhhh')
                    resolve(response)
                })
                .catch((errors) => {
                    alert('hhhh')
                    reject(errors)
                })
        })
    },
}

export default ApiService
