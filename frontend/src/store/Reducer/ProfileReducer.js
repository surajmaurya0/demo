const initialState = {
    loading:false,
    user:null,
    error:null
}
export const ProfileReducer=(state=initialState,action) =>{
    switch(action.type){
        case 'PROFILE_SUCECESS':
            return {
                ...state,
                loading:false,
                user:action.payload,
                error:null
            };
        case 'PROFILE_FAIL':
            return {
                ...state,
                loading:false,
                user:null,
                error:action.payload
            }
        default:
            return state;
    }

}