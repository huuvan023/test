import axios from 'axios'
import * as reference from './../key'

const token = localStorage.getItem("FBIDToken");

export default async () => {
    axios.defaults.baseURL = reference.API_URL
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    axios.defaults.headers.post['Content-Type'] = 'application/json'
console.log('a')
    if (token) {
        axios.defaults.headers.common['Authoriation'] = token
    }
}