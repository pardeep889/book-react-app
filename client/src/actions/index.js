import axios from 'axios';

export function getBooks(limit = 10,start=0,order='asc'){
    const request = axios.get(`api/getBooks?limit=${limit}&skip=${start}&order=${order}`)
    .then(res=>res.data)
    .catch(console.error());
    return{
        type: 'GET_BOOKS',
        payload: request
    }
}