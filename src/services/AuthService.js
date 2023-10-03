import ApiService from './ApiService'
const qs = require('qs')
export async function apiSignIn(data3) {
    let data2 = qs.stringify({
        username: data3.username,
        password: data3.password,
    })
    return ApiService.fetchData({
        method: 'post',
        maxBodyLength: Infinity,
        url: '/login',
        headers: {
            // ...data2.getHeaders(),
        },
        data: data2,
    })
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data,
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
