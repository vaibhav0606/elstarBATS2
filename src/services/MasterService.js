import ApiService from './ApiService'
const axios = require('axios')

export async function apiGetEmployeemaster() {
    return ApiService.fetchData({
        url: '/empmaster/',
        method: 'get',
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

export async function apiGetPlaceMasterbyId(data) {
    return ApiService.fetchData({
        url: `/placemaster/getplaceasperstate/${data}`,
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
export async function apiGetStateMasterbyId(data) {
    return ApiService.fetchData({
        url: `/statemaster/getstateaspercountry/${data}`,
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

export async function apiGetEmpbyid(data) {
    return ApiService.fetchData({
        url: `/empmaster/${data}`,
        method: 'get',
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
            Emp_Addr2: param.Emp_Addr1 || 'NA',
            PlaceCode: param.PlaceCode,
            StateCode: param.StateCode,
            CountryCode: param.CountryCode,
            Emp_Contact1: '' + param.Emp_Contact1 + '',
            Emp_Contact2: '' + param.Emp_Contact1 + '',
            Emp_Grade: param.Emp_Grade,
            Emp_DOB: param.Emp_DOB,
            Emp_DOJ: param.Emp_DOJ,
            Emp_DOL: param.Emp_DOL || '0000',
            Emp_BloodGroup: param.Emp_BloodGroup,
            Emp_Image: param.img,
            DepartmentCode: param.DepartmentCode,
            DesignationCode: param.DesignationCode,
            ReportingTo: param.ReportingTo || 0,
            Emp_Description: param.Emp_Description || 'NA',
            RegionCode: param.RegionCode,
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
        let data = JSON.stringify({
            Emp_FirstName: param.Emp_FirstName,
            Emp_LastName: param.Emp_LastName,
            Emp_Code: param.Emp_Code,
            Emp_Email: param.Emp_Email,
            Emp_Addr1: param.Emp_Addr1,
            Emp_Addr2: param.Emp_Addr1 || 'NA',
            PlaceCode: param.PlaceCode,
            StateCode: param.StateCode,
            CountryCode: param.CountryCode,
            Emp_Contact1: '' + param.Emp_Contact1 + '',
            Emp_Contact2: '' + param.Emp_Contact1 + '',
            Emp_Grade: param.Emp_Grade,
            Emp_DOB: param.Emp_DOB,
            Emp_DOJ: param.Emp_DOJ,
            Emp_DOL: param.Emp_DOL,
            Emp_BloodGroup: param.Emp_BloodGroup,
            Emp_Image: param.imgList[0]?.img,
            DepartmentCode: param.DepartmentCode,
            DesignationCode: param.DesignationCode,
            ReportingTo: param.ReportingTo,
            Emp_Description: param.Emp_Description || 'NA',
            RegionCode: param.RegionCode,
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

export async function apiGetempmasterdropmaster(data) {
    return ApiService.fetchData({
        url: '/empmaster/drop/',
        method: 'get',
        data,
    })
}

export async function apiGetRegionmaster(data) {
    return ApiService.fetchData({
        url: '/regionmaster/',
        method: 'get',
        data,
    })
}
export async function apiGetFormmaster(data) {
    return ApiService.fetchData({
        url: '/formmaster/',
        method: 'get',
        data,
    })
}

export async function apiGetSubModulemaster(data) {
    return ApiService.fetchData({
        url: '/submodulemaster/',
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

export async function apiGetCountrymaster(data) {
    return ApiService.fetchData({
        url: '/countrymaster/',
        method: 'get',
        data,
    })
}

export async function apiGetLanguagemaster(data) {
    return ApiService.fetchData({
        url: '/languagemaster/',
        method: 'get',
        data,
    })
}

const Postlanguage = (param, token) => {
    return new Promise((resolve, reject) => {
        console.log(param)
        let data = JSON.stringify({
            LanguageName: param.LanguageName,
            CountryCode: param.CountryCode,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/languagemaster/',
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

const Putlanguage = (param, token) => {
    return new Promise((resolve, reject) => {
        console.log(param.Country)

        let data = JSON.stringify({
            LanguageName: param.LanguageName,
            CountryCode: param.CountryCode,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/languagemaster/${param.LanguageCode}`,
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

export async function apiGetModulemaster(data) {
    return ApiService.fetchData({
        url: '/modulemaster/',
        method: 'get',
        data,
    })
}

const Postmodule = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            ModuleName: param.ModuleName,
            IndexNum: param.IndexNum,
            ModuleImage: 'string',
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/modulemaster/',
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

const Putmodule = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            ModuleName: param.ModuleName,
            IndexNum: param.IndexNum,
            ModuleImage: '1.png',
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/modulemaster/${param.ModuleCode}`,
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

export async function apiGetSubmodulemaster(data) {
    return ApiService.fetchData({
        url: '/submodulemaster/',
        method: 'get',
        data,
    })
}

const PostSubmodule = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            SubModuleName: param.SubModuleName,
            IndexNum: param.IndexNum,
            ModuleCode: param.ModuleCode,
            SubModuleImage: 'string',
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/submodulemaster/',
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

const PutSubmodule = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            SubModuleName: param.SubModuleName,
            IndexNum: param.IndexNum,
            ModuleCode: param.ModuleCode,
            IsActive: param.IsActive ? 1 : 0,
            SubModuleImage: '1.png',
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/submodulemaster/${param.SubModuleCode}`,
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

const Postcurrency = (param, token, binaryData) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            CurrencyName: param.CurrencyName,
            Currency_image: param.Currency_image,
            CurrencySymbol: param.CurrencySymbol,
            ShortName: param.ShortName,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/currencymaster/',
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

const Putcurrency = (param, token, binaryData) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            CurrencyName: param.CurrencyName,
            Currency_image: param.Currency_image,
            CurrencySymbol: param.CurrencySymbol,
            ShortName: param.ShortName,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/currencymaster/${param.CurrencyCode}`,
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

export async function apiGetDesignationmaster(data) {
    return ApiService.fetchData({
        url: '/designationMaster/',
        method: 'get',
        data,
    })
}

const Postdesignation = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            DesignationName: param.DesignationName,
            ShortName: param.ShortName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/designationMaster/',
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

const Putdesignation = (param, token) => {
    return new Promise((resolve, reject) => {
        console.log(param.DesignationCode)
        let data = JSON.stringify({
            DesignationName: param.DesignationName,
            ShortName: param.ShortName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/designationMaster/${param.DesignationCode}`,
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

const PostForm = (param, token) => {
    return new Promise((resolve, reject) => {
        console.log(param.IsActive ? 1 : 0)
        let data = JSON.stringify({
            FormName: param.FormName,
            ModuleCode: param.ModuleCode,
            SubModuleCode: param.SubModuleCode,
            IndexNum: param.IndexNum,
            WinFormName: param.WinFormName,
            FormImage: '1.jpg',
            IS_MO: 1,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/formmaster/',
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

const PutForm = (param, token) => {
    return new Promise((resolve, reject) => {
        console.log(param)
        let data = JSON.stringify({
            FormName: param.FormName,
            ModuleCode: param.ModuleCode,
            SubModuleCode: param.SubModuleCode,
            IndexNum: param.IndexNum,
            WinFormName: param.WinFormName,
            FormImage: '1.jpg',
            IS_MO: 1,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/formmaster/${param.FormCode}`,
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
export async function apiGetChannelmaster(data) {
    return ApiService.fetchData({
        url: '/channelmaster/',
        method: 'get',
        data,
    })
}
export async function apiGetGenremaster(data) {
    return ApiService.fetchData({
        url: '/genremaster/',
        method: 'get',
        data,
    })
}

const Postchannel = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            ChannelName: param.ChannelName,
            ShortName: param.ShortName,
            Channel_Image: 'string',
            ChannelGenre: param.ChannelGenre,
            ChannelContentType: param.ChannelContentType,
            StateCode: param.State,
            GSTN_id: param.GSTN_id,
            SACCode: param.SACCode,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/channelmaster/',
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

const Putchannel = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            ChannelName: param.ChannelName,
            ShortName: param.ShortName,
            Channel_Image: '1.png',
            ChannelGenre: param.ChannelGenre,
            ChannelContentType: param.ChannelContentType,
            StateCode: param.State,
            GSTN_id: param.GSTN_id,
            SACCode: param.SACCode,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/channelmaster/${param.ChannelCode}`,
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
export async function apiGetPlacemaster(data) {
    return ApiService.fetchData({
        url: '/placemaster/',
        method: 'get',
        data,
    })
}
const Postplace = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            PlaceName: param.PlaceName,
            ShortName: param.ShortName,
            ZoneCode: param.ZoneCode || '0',
            StateCode: param.StateCode,
            CountryCode: param.CountryCode,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/placemaster/',
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

const Putplace = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            PlaceName: param.PlaceName,
            ShortName: param.ShortName,
            ZoneCode: param.ZoneCode || '0',
            StateCode: param.StateCode,
            CountryCode: param.CountryCode,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/placemaster/${param.PlaceCode}`,
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

const Poststate = (param, token) => {
    return new Promise((resolve, reject) => {
        console.log(param.IsActive ? 1 : 0)
        let data = JSON.stringify({
            StateName: param.StateName,
            StateShortName: param.StateShortName,
            CountryCode: param.CountryCode,
            StateTinNo: param.StateTinNo,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/statemaster/',
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

const Putstate = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            StateName: param.StateName,
            StateShortName: param.StateShortName,
            CountryCode: param.CountryCode,
            StateTinNo: param.StateTinNo,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/timeZonemaster/${param.StateCode}`,
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

export async function apiGetgetrights(LoginId) {
    return ApiService.fetchData({
        url: `/rights/getrights/${LoginId}`,
        method: 'get',
    })
}
const PostRights = (data, token) => {
    return new Promise((resolve, reject) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/rights/',
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
    Postzone,
    Putzone,
    PuttimeZone,
    PosttimeZone,
    PostRegion,
    PutRegion,
    Postlanguage,
    Putlanguage,
    Postmodule,
    Putmodule,
    PostSubmodule,
    PutSubmodule,
    Postcurrency,
    Putcurrency,
    Postdesignation,
    Putdesignation,
    Postchannel,
    Putchannel,
    PutForm,
    PostForm,
    Postplace,
    Putplace,
    Putstate,
    Poststate,
    PostRights,
}
