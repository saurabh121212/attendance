const nodemailer = require('nodemailer');


async function sendEmail(email,subject,msg) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        auth: {
            user: "tcmdev20@gmail.com",
            pass: "euwbgdlbhtflwvfy", // this is app password  // this is tcm id password tcm@2021
        }
    })
    message = {
        from: 'tcmdev20@gmail.com',
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
            console.log(message.from ," ttt ", message.to);
            return 1;
        }
    });

}

module.exports = sendEmail;