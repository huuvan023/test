import axios from 'axios'
import { func } from 'prop-types'
import { API_URL } from './../key'
 
// const token = localStorage.getItem("FBIDToken");
// const a = axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// console.log(a)
// if (token) {
//     axios.defaults.headers.common['Authoriation'] = token
// }
const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

async function get(url) {
    try {
        var header = {};
        if (localStorage.getItem('FBIDToken')) {
            const FBIDToken = localStorage.getItem('FBIDToken'); 
            header = {
                headers: {
                    'Authorization': FBIDToken,
                }
            }
        }
        const response = await client.get(url,header)
        if (response.status === 200) {
            return response.data
        }
    }
    catch (error) {
        throw error
    }
}

async function post(url, data, option) {
    try {
        var header = {};
        if (localStorage.getItem('FBIDToken')) {
            const FBIDToken = localStorage.getItem('FBIDToken'); 
            header = {
                headers: {
                    'Authorization': FBIDToken,
                }
            }
        }
        const response = await client.post(url, data, header) 

        if (response.status === 200) {
            return response.data
        }
    }
    catch (error) {
        throw error
    }
}
export const httpClient = {
    get,
    post
}