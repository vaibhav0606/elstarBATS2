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

const PostEmp = (param, token) => {
    return new Promise((resolve, reject) => {
        console.log(param)
        let data = JSON.stringify({
            Emp_FirstName: param.Emp_FirstName,
            Emp_LastName: param.Emp_LastName,
            Emp_Code: param.Emp_Code,
            Emp_Email: param.Emp_Email,
            Emp_Addr1: param.Emp_Addr1,
            Emp_Addr2: param.Emp_Addr2,
            PlaceCode: param.CityCode,
            StateCode: param.StateCode,
            CountryCode: param.CountryCode,
            Emp_Contact1: '' + param.Emp_Contact1 + '',
            Emp_Contact2: '' + param.Emp_Contact2 + '',
            Emp_Grade: param.Emp_Grade,
            Emp_DOB: param.Emp_DOB,
            Emp_DOJ: param.Emp_DOJ,
            Emp_DOL: param.Emp_DOL,
            Emp_BloodGroup: param.Emp_BloodGroup,
            Emp_Image: '1.jpg',
            DepartmentCode: param.DepartmentCode,
            DesignationCode: param.DesignationCode,
            ReportingTo: 0,
            Emp_Description: param.Emp_Description,
            RegionCode: param.RegionCode,
            Emp_Addr1: 'string',
            Emp_Addr2: 'string',
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/empmaster/',
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

const PutEmp = (param, token) => {
    return new Promise((resolve, reject) => {
        console.log(param)
        let data = JSON.stringify({
            Emp_FirstName: param.Emp_FirstName,
            Emp_LastName: param.Emp_LastName,
            Emp_Code: param.Emp_Code,
            Emp_Email: param.Emp_Email,
            Emp_Addr1: param.Emp_Addr1,
            Emp_Addr2: param.Emp_Addr2,
            PlaceCode: param.CityCode,
            StateCode: param.StateCode,
            CountryCode: param.CountryCode,
            Emp_Contact1: '' + param.Emp_Contact1 + '',
            Emp_Contact2: '' + param.Emp_Contact2 + '',
            Emp_Grade: param.Emp_Grade,
            Emp_DOB: param.Emp_DOB,
            Emp_DOJ: param.Emp_DOJ,
            Emp_DOL: param.Emp_DOL,
            Emp_BloodGroup: param.Emp_BloodGroup,
            Emp_Image: '1.jpg',
            DepartmentCode: param.DepartmentCode,
            DesignationCode: param.DesignationCode,
            ReportingTo: 0,
            Emp_Description: param.Emp_Description,
            RegionCode: param.RegionCode,
            Emp_Addr1: 'string',
            Emp_Addr2: 'string',
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/empmaster/${param.EmployeeCode}`,
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
    PostEmp,
    PutEmp,
}
