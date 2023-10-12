import ApiService from './ApiService'
const axios = require('axios')

export async function apiGetStarCastTypemaster(data) {
    return ApiService.fetchData({
        url: '/starcasttype/',
        method: 'get',
        data,
    })
}

const Poststarcasttype = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            StarCastTypeName: param.StarCastTypeName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/starcasttype/',
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

const Putstarcasttype = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            StarCastTypeName: param.StarCastTypeName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/starcasttype/${param.StarCastTypeCode}`,
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

export async function apiGetStarCastmaster(data) {
    return ApiService.fetchData({
        url: '/starcastmaster/',
        method: 'get',
        data,
    })
}

export async function apiGetCountrymaster(data) {
    return ApiService.fetchData({
        url: '/countrymaster/',
        method: 'get',
        data,
    })
}

const Poststarcast = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            StarCastName: param.StarCastName,
            StarCastTypeCode: param.StarCastTypeCode,
            MaleFemale: param.MaleFemale,
            DateOfBirth: param.DateOfBirth,
            DateOfDeath: param.DateOfDeath,
            StarCast_Image: '1.png',
            CountryCode: param.CountryCode,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/starcastmaster/',
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

const Putstarcast = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            StarCastName: param.StarCastName,
            StarCastTypeCode: param.StarCastTypeCode,
            MaleFemale: param.MaleFemale,
            DateOfBirth: param.DateOfBirth,
            DateOfDeath: param.DateOfDeath,
            StarCast_Image: '1.png',
            CountryCode: param.CountryCode,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/starcastmaster/${param.StarCastCode}`,
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

export async function apiGetGenremaster(data) {
    return ApiService.fetchData({
        url: '/genremaster/',
        method: 'get',
        data,
    })
}

const Postgenre = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            GenreName: param.GenreName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/genremaster/',
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

const Putgenre = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            GenreName: param.GenreName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/genremaster/${param.GenreCode}`,
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

export async function apiGetSubGenremaster(data) {
    return ApiService.fetchData({
        url: '/SubGenreMaster/',
        method: 'get',
        data,
    })
}

const Postsubgenre = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            SubGenreName: param.SubGenreName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/SubGenreMaster/',
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

const Putsubgenre = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            SubGenreName: param.SubGenreName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/SubGenreMaster/${param.SubGenreCode}`,
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

export async function apiGetContentTypemaster(data) {
    return ApiService.fetchData({
        url: '/contenttypemaster/',
        method: 'get',
        data,
    })
}

const Postcontenttype = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            ContentTypeName: param.ContentTypeName,
            MultiPart: param.MultiPart,
            EpisodeSpecific: param.EpisodeSpecific,
            LiveEvent: param.LiveEvent,
            SportEvent: param.SportEvent,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/contenttypemaster/',
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

const Putcontenttype = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            ContentTypeName: param.ContentTypeName,
            MultiPart: param.MultiPart,
            EpisodeSpecific: param.EpisodeSpecific,
            LiveEvent: param.LiveEvent,
            SportEvent: param.SportEvent,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/contenttypemaster/${param.ContentTypeCode}`,
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

export async function apiGetViewmaster(data) {
    return ApiService.fetchData({
        url: '/viewmaster/',
        method: 'get',
        data,
    })
}

const Postview = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            ViewName: param.ViewName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/viewmaster/',
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

const Putview = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            ViewName: param.ViewName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/viewmaster/${param.ViewCode}`,
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

export async function apiGetCensorshipmaster(data) {
    return ApiService.fetchData({
        url: '/Censorshipmaster/',
        method: 'get',
        data,
    })
}

const Postcensorship = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            CensorshipName: param.CensorshipName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/Censorshipmaster/',
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

const Putcensorship = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            CensorshipName: param.CensorshipName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/Censorshipmaster/${param.CensorshipCode}`,
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

export async function apiGetTXVersionmaster(data) {
    return ApiService.fetchData({
        url: '/Telecastmaster/',
        method: 'get',
        data,
    })
}

const Posttxversion = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            TXVersionName: param.TXVersionName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/Telecastmaster/',
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

const Puttxversion = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            TXVersionName: param.TXVersionName,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/Telecastmaster/${param.TXVersionCode}`,
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

export async function apiGetSuppliermaster(data) {
    return ApiService.fetchData({
        url: '/suppliermastertable/',
        method: 'get',
        data,
    })
}

const PostSupplier = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            SupplierName: param.SupplierName,
            ShortName: param.ShortName,
            SupplierERPCode: param.SupplierERPCode,
            Address1: param.Address1,
            Address2: param.Address2,
            Pin: param.Pin,
            CountryCode: param.CountryCode,
            StateCode: param.State,
            PlaceCode: param.CityCode,
            Phone: param.Phone,
            Mobile: param.Mobile,
            Fax: param.Fax,
            Email: param.Email,
            ContactPerson: param.ContactPerson,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://103.14.97.155:3000/suppliermastertable/',
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

const PutSupplier = (param, token) => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify({
            SupplierName: param.SupplierName,
            ShortName: param.ShortName,
            SupplierERPCode: param.SupplierERPCode,
            Address1: param.Address1,
            Address2: param.Address2,
            Pin: param.Pin,
            CountryCode: param.CountryCode,
            StateCode: param.State,
            PlaceCode: param.CityCode,
            Phone: param.Phone,
            Mobile: param.Mobile,
            Fax: param.Fax,
            Email: param.Email,
            ContactPerson: param.ContactPerson,
            IsActive: param.IsActive ? 1 : 0,
        })

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://103.14.97.155:3000/suppliermastertable/${param.SupplierCode}`,
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
    Poststarcasttype,
    Putstarcasttype,
    Poststarcast,
    Putstarcast,
    Postgenre,
    Putgenre,
    Postsubgenre,
    Putsubgenre,
    Postcontenttype,
    Putcontenttype,
    Postview,
    Putview,
    Postcensorship,
    Putcensorship,
    Posttxversion,
    Puttxversion,
    PostSupplier,
    PutSupplier,
}
