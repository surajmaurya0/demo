const initialState = {
    loading:false,
    error:null,
    user:null
}
export const Delete = (state= initialState,action) =>{
    switch(action.type){
        case 'DELETE_SUCCESS':
            return {
                ...state,
                loading:false,
                error:null,
                user:action.payload
            }
        case 'DELETE_FAIL':
            return {
                ...state,
                loading:false,
                error:action.payload,
                user:null
            }
        default:
            return state
    }
}