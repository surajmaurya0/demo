const initialState = {
    loading :false,
    error:null,
    user:null,
}
const RegisterUser = (state = initialState,action) => {
    switch(action.type){
        case 'REGISTER_USER_SUCCESS':
            return {
                ...state,
                loading:false,
                user:action.payload,
                error:null
            };
        case 'REGISTER_USER_FAILURE':
            return {
            ...state,
            loading:false,
            error:action.payload
            };
            default:
                return state;

    }
}
export default RegisterUser