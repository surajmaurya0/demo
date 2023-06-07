const User = require('../models/user')
const bcrypt = require('bcrypt')
const { response } = require('express')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const { send_mail_otp, send_mail_link } = require('./nodeMailerController')

const jwt_secret = process.env.JWT_SECRET
function getAllUsers(req, res) {
    console.log("working")
    res.send("send")
}
// new user regsiter 
async function regsiterUser(req, res) {
    try {
        let { name, email, password, value } = req.body
        password = await bcrypt.hash(password, saltRounds)
        if ((name.length < 1) || (email.length < 1) || (password.length < 1)) {
            return res.status(400).json({ message: 'All Field Is Required' })
        }
        //check user Already exist or not
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ error: 'Email Already exists' })
        }
        //if user didnt exist forward to next code 
        const newUser = new User({
            name,
            email,
            password,
            value
        })
        const createdUser = await newUser.save()
        return res.status(201).json(createdUser)

    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }

}
//user login Api
async function loginUser(req, res) {
    try {
        let { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ message: 'User Didnt exist' })
        }
        const match = await bcrypt.compare(password, existingUser.password)
        if (!match) {
            return res.status(401).json({ message: 'Please Check Your PassWord' })
        }
        const payload = {
            userId: existingUser.id
        }
        const token = jwt.sign(payload, jwt_secret, { expiresIn: '6h' })
        // localStorage.setItem('login')
        res.status(201).json({ message: 'user login', authentication_token: token })

    } catch (error) {
        res.status(501).json({ error: 'Failed to Login user' })
    }
}
async function profile(req, res) {
    let { userId } = req.user
    const userMatch = await User.findById(userId)
    res.send(userMatch)
}
async function profileUpdate(req, res) {
    const { email, password, name } = req.body
    if (!(name && email && password)) {
        return res.status(401).json({ message: "all field is required" })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ message: "user not found" })
    }
    const hashPassoword = await bcrypt.hash(password, saltRounds)
    await User.findOneAndUpdate({ email }, { $set: { password: hashPassoword, name } })
    res.status(200).json({message:"profile update successfully"})
}
async function changePswdLogin(req, res) {
    let { userId } = req.user
    const { email, newPassword, oldPassword } = req.body

    const user = await User.findById(userId)
    const match = await bcrypt.compare(newPassword, user.password)
    const oldMatch = await bcrypt.compare(oldPassword, user.password)
    if (!oldMatch) {
        return res.status(401).json({ message: 'old Password is Wrong' })
    }
    if (match) {
        return res.status(401).json({ message: "please type new password" })
    }

    const newPasswordDb = await bcrypt.hash(newPassword, saltRounds)
    user.password = newPasswordDb
    user.save()
    res.status(200).json({ message: 'password changed ' })

}
async function deleteUser(req, res) {
    const { userId } = req.user
    let { email, password } = req.body

    const user = await User.findById(userId)
    //if user not exist 
    //but this if() code is not important because of when user login after user_id is delete this code just example
    if (!user) {
        return res.status(404).json({ message: "user not Exist" })
    }
    const pswdMatch = await bcrypt.compare(password, user.password)
    //if password is wrong then excute if condition other wise jump to next code
    if (!pswdMatch) {
        return res.status(401).json({ message: 'please check your password' })
    }
    const deleteUser = await User.findByIdAndDelete(userId)

    res.status(200).json({ message: "user deleted" })
}
async function offlinepswdOtp(req, res) {
    const { email } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(401).json({ message: 'email is wrong' })
    }

    // if(user.code){
    //     return res.status(201).json({message:'Otp Already Send'}) 
    // }
    const min = 100000;
    const max = 999999;

    const otp = Math.floor(Math.random() * (max - min + 1) + min);

    send_mail_otp(user.name, JSON.stringify(email), JSON.stringify(otp))
    await User.findOneAndUpdate({ email }, { $set: { code: otp, value: true } })
    res.status(200).json({ message: `Please Check Your Email Otp Send` })
    setTimeout(async () => {
        await User.findOneAndUpdate({ email }, { $unset: { code: '', value: '' } })
    }, 300000)
}
async function offlinepswdOtp_verify(req, res) {
    const { otp, email, password } = req.body
    const user = await User.findOne({ email })
    if (!user.value) {
        return res.status(401).json({ message: 'please request otp' })
    }
    if (user.code != otp) {
        return res.status(401).json({ message: 'OTP is wrong' })
    }
    const newPassword = await bcrypt.hash(password, saltRounds)
    user.password = newPassword
    user.save()
    await User.findOneAndUpdate({ email }, { $unset: { value: '', code: '' } })
    res.status(200).json({ message: 'password change successfully' })
}
async function offlinepswdLink(req, res) {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!email) {
        return res.status(401).json({ message: "email is required" })
    }
    if (!user) {
        return res.status(401).json({ message: 'email is wrong' })
    }
    const paylaod = {
        userId: user.id
    }
    const token = jwt.sign(paylaod, jwt_secret, { expiresIn: '5m' })
    const link = `http://localhost:3000/reset-password/${token}`
    send_mail_link(user.name, JSON.stringify(email), JSON.stringify(link))
    await User.findOneAndUpdate({ email }, { $set: { value: true } })
    setTimeout(async () => {
        await User.findOneAndUpdate({ email }, { $unset: { value: '' } })
    }, 300000)
    res.status(200).json({ message: 'link send check your email', link: link })

}
async function offlinepswdLinkVerify(req, res) {
    const { userId } = req.user
    const { password } = req.body
    const user = await User.findById(userId)
    if (user.value == false) {
        return res.status(401).json({ message: 'password already changed' })
    }
    if (!user) {
        return res.status(401).json({ message: 'user not exist' })
    }
    const newPassword = await bcrypt.hash(password, saltRounds)
    await User.findOneAndUpdate({ email: user.email }, { $set: { password: newPassword, value: false } })
    res.status(200).json({ message: "Password Changed" })
}




module.exports = {
    getAllUsers,
    regsiterUser,
    loginUser,
    profile,
    profileUpdate,
    changePswdLogin,
    deleteUser,
    offlinepswdOtp,
    offlinepswdOtp_verify,
    offlinepswdLink,
    offlinepswdLinkVerify
}