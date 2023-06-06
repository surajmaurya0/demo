import {combineReducers} from 'redux'
import TestReducer from './TestReducer'
import RegisterUser from './RegisterUser'
import { LogInUser } from './LogInUser'
import { ProfileReducer } from './ProfileReducer'
import { Delete } from './Delete'
import { LoginChangePswd } from './LoginChangePswd'

const reducers =  combineReducers({
    Test:TestReducer,
    Register:RegisterUser,
    Login: LogInUser,
    Profile:ProfileReducer,
    Delete:Delete,
    LoginChangePswd:LoginChangePswd 

})

export default reducers