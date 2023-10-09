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
export async function apiGetZonemaster(data) {
    return ApiService.fetchData({
        url: '/zonemaster/',
        method: 'get',
        data,
    })
}

const Postzone = (param, token) => {
    return new Promise((resolve, reject) => {
        console.log(param.IsActive ? 1 : 0)
        let data = JSON.stringify({
            ZoneName: param.ZoneName,
            ShortName: param.ShortName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/zonemaster/',
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

const Putzone = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            ZoneName: param.ZoneName,
            ShortName: param.ShortName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/zonemaster/${param.ZoneCode}`,
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

export async function apiGetRegionmaster(data) {
    return ApiService.fetchData({
        url: '/regionmaster/',
        method: 'get',
        data,
    })
}

const PostRegion = (param, token) => {
    return new Promise((resolve, reject) => {
        console.log(param.IsActive ? 1 : 0)
        let data = JSON.stringify({
            RegionName: param.RegionName,
            ShortName: param.ShortName,
            ZoneCode: param.ZoneCode,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/regionmaster/',
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

const PutRegion = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            RegionName: param.RegionName,
            ShortName: param.ShortName,
            ZoneCode: param.ZoneCode,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/regionmaster/${param.RegionCode}`,
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

export async function apiGetTimeZonemaster(data) {
    return ApiService.fetchData({
        url: '/timeZonemaster/',
        method: 'get',
        data,
    })
}

const PosttimeZone = (param, token) => {
    return new Promise((resolve, reject) => {
        console.log(param.IsActive ? 1 : 0)
        let data = JSON.stringify({
            TimeZoneName: param.TimeZoneName,
            ShortName: param.ShortName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/timeZonemaster/',
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

const PuttimeZone = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            TimeZoneName: param.TimeZoneName,
            ShortName: param.ShortName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/timeZonemaster/${param.TimeZoneCode}`,
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

export async function apiGetDesignationMaster(data) {
    return ApiService.fetchData({
        url: '/designationMaster/',
        method: 'get',
        data,
    })
}

export async function apiGetPlaceMaster(data) {
    return ApiService.fetchData({
        url: '/placemaster/',
        method: 'get',
        data,
    })
}

export async function apiGetStateMaster(data) {
    return ApiService.fetchData({
        url: '/statemaster/',
        method: 'get',
        data,
    })
}

export async function apiGetCountryMaster(data) {
    return ApiService.fetchData({
        url: '/countrymaster/',
        method: 'get',
        data,
    })
}

export async function apiGetDepartmentmaster(data) {
    return ApiService.fetchData({
        url: '/departmentmaster/',
        method: 'get',
        data,
    })
}

export async function apiGetRegionMaster(data) {
    return ApiService.fetchData({
        url: '/regionmaster/',
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
    Putzone,
    Postzone,
    PuttimeZone,
    PosttimeZone,
    PutRegion,
    PostRegion,
}
