const nodemailer = require('nodemailer');
const emailTemplate = require('./emailTemp')


async function sendEmail(email,payload,status) {

    let emailList = [
        'jvh@computronics.sz',
        'kunal@computronics.sz',
        'riley@computronics.sz',
        'syed@computronics.sz',
        'nathi@computronics.sz',
        'marina@computronics.sz',
        'reception@computronics.sz'
       // 'test@gmail.com'
      ];

    let subject;
    let output
    if(status==1)
    {
         subject = `${payload.leave_apply_by_name} has applied for leave from ${payload.start_date} to ${payload.end_date}`
         output = emailTemplate.managerEmailTemplate(payload);
    }
    else if(status == 2)
    {
        const leaveStatus = payload.leave_status == 3 ? "Approved" : "Rejected"
        subject = `Leave from ${payload.start_date} to ${payload.end_date} has been ${leaveStatus}`
        output = emailTemplate.senderEmailTemplate(payload,leaveStatus);
    }

    else if(status==3)
    {
         subject = `${payload.apply_by_name} has applied for OD for Date ${payload.od_date} and time ${payload.od_start_time} to ${payload.od_end_time}`
         output = emailTemplate.managerEmailTemplateOD(payload);
    }

    else if(status == 4)
    {
        const leaveStatus = payload.od_status == 3 ? "Approved" : "Rejected"
        subject = `Your OD has been ${leaveStatus} for the date of ${payload.payloadData.od_date} and time ${payload.payloadData.od_start_time} to ${payload.payloadData.od_end_time}`
        output = `Hello User, <br><br>Your OD Application has ${leaveStatus} for the date of ${payload.payloadData.od_date} and time ${payload.payloadData.od_start_time} to ${payload.payloadData.od_end_time} by your manager <br>Comments From Manager :-  ${payload.send_to_comments}`
    }

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
        cc:emailList,
        subject: subject,
        html: output
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