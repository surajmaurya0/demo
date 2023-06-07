

export const getAllPosts = () => {
    return (dispatch) => {
        fetch("https://jsonplaceholder.typicode.com/users").then((resp) => resp.json()).then((result) => dispatch({ type: 'DO_THIS', payload: result }))
    }
}

export const registerUser = (user, navigate) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://test1-5-kg9h.onrender.com/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const result = await response.json();
            if (response.ok == false) {
                return alert(result.error)
            }
            alert('succefully register please login')
            navigate('/')
            dispatch({ type: 'REGISTER_USER_SUCCESS', payload: result })
        } catch (error) {
            dispatch({ type: 'REGISTER_USER_FAILURE', payload: error.message })
        }
    }
}

export const logInUser = (userData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://test1-5-kg9h.onrender.com/users/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            const result = await response.json()
            if (response.ok == false) {
                return alert((result.message))
            }
            navigate('/')
            dispatch({ type: 'LOGIN_USER_SUCCESS', payload: result })
        } catch (error) {
            dispatch({ type: 'LOGIN_USER_FAILURE', payload: error.message })

        }
    }
}
export const ProfileUser = (token) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://test1-5-kg9h.onrender.com/users/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(token)
            })
            const result = await response.json()
            if (response.ok == false) {
                return alert((result.error))
            }
            dispatch({ type: 'PROFILE_SUCECESS', payload: result })
        } catch (error) {
            dispatch({ type: 'PROFILE_FAIL', payload: error })
        }
    }

}
export const ProfileUserUpdate= (user,navigate)=>{
    return async (dispatch) => {
        try {
            const response = await fetch("https://test1-5-kg9h.onrender.com/users/profileUpdate",{
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(user)
            })
            const result = await response.json()
            if(response.ok == false){
                return alert((result.error))
            }
            alert(result.message)
            navigate('/home')
            
        } catch (error) {
            alert(error)
            
        }
    }
}

export const deleteUser = (user, navigate) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://test1-5-kg9h.onrender.com/users/deleteUser", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const result = await response.json()
            if (response.ok == false) {
                return alert(result.message)
            }
            dispatch({ type: 'DELETE_SUCCESS', payload: result })
            localStorage.clear('login')
            navigate('/')
        } catch (error) {
            dispatch({ type: 'DELETE_FAIL', payload: error })
        }
    }

}
export const changePswdLogin = (user, navigate) => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://test1-5-kg9h.onrender.com/users/changepswdlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const result = await response.json()
            if (response.ok == false) {
                return alert(result.message)
            }
            navigate('/profile')
            alert('password changed successful' + `your new password is ${user.newPassword}`)
            dispatch({ type: 'CHANGE_PASSWORD_SUCCESS', payload: result.message })

        } catch (error) {
            dispatch({ type: 'CHANGE_PASSWORD_SUCCESS', payload: error })
        }
    }

}
export const otpGenerate = (email, setOtpSend) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://test1-5-kg9h.onrender.com/users/offlinepswdOtp", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(email)
            })
            const result = await response.json()
            if (response.ok == false) {
                return alert(result.message)
            }
            if (response.ok == true) {
                alert(result.message)
                setOtpSend(true)
            }

        } catch (error) {
            alert(error)
        }
    }
}
export const otpGenerateVerify = (data, navigate) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://test1-5-kg9h.onrender.com/users/offlinepswdOtp_verify", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if (response.ok == false) {
                return alert(result.message)
            }
            alert(result.message)
            navigate('/entry')

        } catch (error) {
            alert(error)
        }
    }
}
export const linkGenerate = (email, navigate) => {
    return async (dispatch) => {
        try {
            const response = await fetch('https://test1-5-kg9h.onrender.com/users/offlinepswdLink', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
            // debugger
            const result = await response.json()
            if (response.ok == false) {
                return alert(result.message)
            }
            alert(result.message)
            navigate('/entry')
        } catch (error) {
            alert(error)
        }
    }
}
export const linkGenerateVerify = (user, navigate) => {
    return async (dispatch) => {
        try {
            const response = await fetch("https://test1-5-kg9h.onrender.com/users/offlinepswdLinkVerify", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const result = await response.json()
            if (response.ok == false) {
                return (alert(result.message),
                    navigate('/entry'))
            }
            alert(result.message)
            navigate('/entry')

        } catch (error) {
            alert(error)
        }
    }

}