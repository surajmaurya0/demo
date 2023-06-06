const initialState = {
    loading:false,
    user:null,
    error:null
}
export const LoginChangePswd = (state = initialState,action) =>{
    switch(action.type){
        case 'CHANGE_PASSWORD_SUCCESS':
            return{
                ...state,
                user:action.paylod,
                error:null,
                loading:false
            }
        case 'CHANGE_PASSWORD_FAIL':
            return{
                ...state,
                user:null,
                error:action.payload,
                loading:false
            }
        default:
            return state;
    }
}