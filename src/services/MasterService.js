import ApiService from './ApiService'
const axios = require('axios')

export async function apiGetEmployeemaster(data) {
    return ApiService.fetchData({
        url: '/empmaster/',
        method: 'get',
        data,
    })
}

export async function apiGetCurrencymaster(data) {
    return ApiService.fetchData({
        url: '/currencymaster/',
        method: 'get',
        data,
    })
}

export async function apiGetEntitymaster(data) {
    return ApiService.fetchData({
        url: '/Entitymaster/',
        method: 'get',
        data,
    })
}

const PostEntity = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            EntityName: param.entityname,
            PermAddress: param.PermAddress,
            CorpAddress: param.CorpAddress,
            ContactPerson: param.ContactPerson,
            Contact: '' + param.Contact + '',
            IsActive: param.IsActive ? 1 : 0,
            PANNO: param.PANNO,
            CINNumber: param.CINNumber,
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

const PutEntity = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            EntityName: param.entityname,
            PermAddress: param.PermAddress,
            CorpAddress: param.CorpAddress,
            ContactPerson: param.ContactPerson,
            Contact: '' + param.Contact + '',
            IsActive: param.IsActive ? 1 : 0,
            PANNO: param.PANNO,
            CINNumber: param.CINNumber,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/Entitymaster/${param.EntityCode}`,
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

export async function apiGetLocationmaster(data) {
    return ApiService.fetchData({
        url: '/locationmaster/',
        method: 'get',
        data,
    })
}

const Postlocation = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            LocationName: param.LocationName,
            ShortName: param.ShortName,
            TimeZoneCode: param.TimeZoneCode,
            CurrencyCode: param.CurrencyCode,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/locationmaster/',
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

const Putlocation = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            LocationName: param.LocationName,
            ShortName: param.ShortName,
            TimeZoneCode: param.TimeZoneCode,
            CurrencyCode: param.CurrencyCode,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/locationmaster/${param.LocationCode}`,
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

export async function apiGetDepartmentmaster(data) {
    return ApiService.fetchData({
        url: '/departmentmaster/',
        method: 'get',
        data,
    })
}

const Postdepartment = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            DepartmentName: param.DepartmentName,
            ShortName: param.ShortName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/departmentmaster/',
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

const Putdepartment = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            DepartmentName: param.DepartmentName,
            ShortName: param.ShortName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/departmentmaster/${param.DepartmentCode}`,
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

export {
    PostEntity,
    PutEntity,
    Postlocation,
    Putlocation,
    Putdepartment,
    Postdepartment,
}
