import { ajax } from 'rxjs/ajax'

export const getViaAjax = (token, url) => {
    return (
        ajax({
            url: url,
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
    )
}

export const postViaAjax = (token, url, data) => {
    return (
        ajax({
            url: url,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: data
        })
    )
}
