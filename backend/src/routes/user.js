//user releated only

const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

//define user-related routes

router.get('/',userController.getAllUsers)
router.post('/register',userController.regsiterUser)
router.post('/login',userController.loginUser)
router.post('/profile',authMiddleware,userController.profile)
router.post('/profileUpdate',authMiddleware,userController.profileUpdate)
router.post('/changepswdlogin',authMiddleware,userController.changePswdLogin)
router.delete('/deleteUser',authMiddleware,userController.deleteUser)
router.post('/offlinepswdOtp',userController.offlinepswdOtp)
router.post('/offlinepswdOtp_verify',userController.offlinepswdOtp_verify)
router.post('/offlinepswdLink',userController.offlinepswdLink)
router.post('/offlinepswdLinkVerify',authMiddleware,userController.offlinepswdLinkVerify)


module.exports = router; 