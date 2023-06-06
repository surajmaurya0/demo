const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2
require('dotenv').config();
const config = require('./config.js')
const User = require('../models/user.js')

const OAuth2_client = new OAuth2(config.CLIENT_ID,config.CLIENT_SECRET)
OAuth2_client.setCredentials({refresh_token : config.REFRESH_TOKEN})

function send_mail_otp(name,recipient,otp){
    const accessToken = OAuth2_client.getAccessToken()
    const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            type:'OAuth2',
            user: config.USER_ID,
            clientId: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET,
            refreshToken: config.REFRESH_TOKEN,
            accessToken: accessToken
        }
    })

    const mail_option = {
        from:`${config.USER_ID}`,
        to: recipient,
        subject:'Password Change Request',
        html:`<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">MernDemo</a>
          </div>
          <p style="font-size:1.1em">Hi, ${name}</p>
          <p> We Are Recevie PassWord Change Request.</p><p>
          If You Didn't Request For Password Change JUST IGNORE IT.</p><p> OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />MernDemo</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Suraj Maurya</p>
            <p>Surat</p>
            <p>Gujarat</p>
          </div>
        </div>
      </div>`
    }

    transport.sendMail(mail_option , function(error,result){
        if(error){
            console.log('Error',error)
        }else{
            console.log('Success',result)
        }
        transport.close()

    })
}
function send_mail_link(name,recipient,token){
    const accessToken = OAuth2_client.getAccessToken()
    const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            type:'OAuth2',
            user: config.USER_ID,
            clientId: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET,
            refreshToken: config.REFRESH_TOKEN,
            accessToken: accessToken
        }
    })

    const mail_option = {
        from:`${config.USER_ID}`,
        to: recipient,
        subject:'Password Change Request',
        html:`<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">MernDemo</a>
          </div>
          <p style="font-size:1.1em">Hi, ${name}</p>
          <p> We Are Recevie PassWord Change Request.</p><p>
          If You Didn't Request For Password Change JUST IGNORE IT.</p><p> Link is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"><a href=${token}>Link</a></h2>
          <p style="font-size:0.9em;">Regards,<br />MernDemo</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Suraj Maurya</p>
            <p>Surat</p>
            <p>Gujarat</p>
          </div>
        </div>
      </div>`
    }

    transport.sendMail(mail_option , function(error,result){
        if(error){
            console.log('Error',error)
        }else{
            console.log('Success',result)
        }
        transport.close()

    })
}


module.exports ={ send_mail_otp,send_mail_link}
