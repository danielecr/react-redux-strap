import { ajax } from 'rxjs/ajax'
import {from } from 'rxjs';

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


// this give back the payload as if it was retrieved from remote
// by ajax
export const simulGet = (url, payload) => {
    return from(new Promise((resolve,reject) => {
        setTimeout(()=>{resolve({response:payload})}, 1200);
    }))
}
