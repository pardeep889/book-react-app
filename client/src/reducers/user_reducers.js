export default function(state={}, action){
    switch(action.type){
        case "USER_LOGIN": 
            return {...state,login: action.payload}
        case "AUTH_CHECK":
            return {...state,login: action.payload}
        case "GET_USER_POSTS":
            return {...state,posts: action.payload}
        case "GET_USERS":
            return {...state,users: action.payload}  
        case "USER_REGISTER":
            return {...state,
                    register: action.payload.success,
                    users: action.payload.users
                }
        case "USER_LOGOUT":
            return {...state, logout: action.payload}
        default:
            return state;
    }
}