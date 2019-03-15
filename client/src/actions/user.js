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