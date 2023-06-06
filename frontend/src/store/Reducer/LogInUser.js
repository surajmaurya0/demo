const initialState = {
    loading:false,
    user:null,
    error:null
}
export const LogInUser= (state = initialState,action) =>{
    
switch(action.type){
    case 'LOGIN_USER_SUCCESS':
        if(action.payload.message == "user login"){
            const token = action.payload.authentication_token
            localStorage.setItem('login',token)
        }
        return {
            ...state,
            loading:false,
            user:action.payload,
            error:null
        };
    case 'LOGIN_USER_FAILURE':
        return {
            ...state,
            loading:false,
            error:action.payload

        };
        default:
            return state
}
}