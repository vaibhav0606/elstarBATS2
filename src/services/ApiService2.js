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

const PostEntity = (param, token) => {
    // const { token } = useSelector((state) => state.auth.session)
    // console.log(token)

    return new Promise((resolve, reject) => {
        // BaseService(param)
        console.log(param)
        let data = JSON.stringify({
            "EntityName": param.entityname,
            "PermAddress": param.PermAddress,
            "CorpAddress": param.CorpAddress,
            "ContactPerson": param.ContactPerson,
            "Contact": ""+param.Contact+"",
            "IsActive": param.IsActive,
            "PANNO": param.PANNO,
            "CINNumber": param.CINNumber,
        })
       

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/Entitymaster/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
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
}

export { ApiService2, PostEntity }
