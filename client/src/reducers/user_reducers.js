export default function(state={}, action){
    switch(action.type){
        case "USER_LOGIN": 
            return {...state,login: action.payload}
        case "AUTH_CHECK":
            return {...state,login: action.payload}
        default:
            return state;
    }
}