import axios from 'axios';

export function loginUser({email,password}){
    const req = axios.post('/api/login', {email,password}).then( resp => {   
        return resp.data
    }).catch(console.error());
    return{
        type: 'USER_LOGIN',
        payload: req
    }
}
export function auth(){
    const req = axios.get('/api/auth').then(resp => resp.data).catch(console.error());
    return{
        type: 'AUTH_CHECK',
        payload: req
    }
}

export function getUserPosts(userId){
    const req = axios.get(`/api/userPosts?user=${userId}`).then(resp => resp.data).catch(console.error());
    return{
        type: 'GET_USER_POSTS',
        payload: req
    }
}

export function getUsers(){
    const req = axios.get('/api/users').then(resp => resp.data).catch(console.error());
    return {
        type: "GET_USERS",
        payload: req
    }
    
}