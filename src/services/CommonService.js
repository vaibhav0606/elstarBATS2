import ApiService from './ApiService'

export async function apiGetNotificationCount() {
    return ApiService.fetchData({
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        method: 'get',
    })
}

export async function apiGetNotificationList() {
    return ApiService.fetchData({
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        method: 'get',
    })
}

export async function apiGetSearchResult(data) {
    return ApiService.fetchData({
        url: '/search/query',
        method: 'post',
        data,
    })
}
