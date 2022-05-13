const nodemailer = require('nodemailer');


async function sendEmail(email,subject,msg) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        //port: 2525,
        auth: {
            user: "tcmdev20@gmail.com",
            pass: "tcm@2021",
        }
    })
    message = {
        from: "tcmdev20@gmail.com",
        to: email,
        subject: subject,
        text: msg
    } 
    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log(error);
            return 0;
        } else {
            console.log('Email sent: ' + info.response);
            return 1;
        }
    });

}

module.exports = sendEmail;