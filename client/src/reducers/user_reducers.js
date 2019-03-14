export default function(state={}, action){
    switch(action.type){
        case "ListUser": 
            return {...state,users: action.payload}
        default:
            return state;
    }
}