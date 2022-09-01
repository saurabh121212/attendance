const senderEmailTemplate = (payload, status) => 
`<html>
<head>
    <title></title>
</head>
<body>
    <!-- Take only this part for email -->
    <table>
        <tr>
            <td>
                <div
                    style=" margin-left: 10px; border-left:4px solid rgb(0, 22, 148); padding: 14px 32px 14px 20px; font-family: Arial, Helvetica, sans-serif;">
                    Your application for leave starting from
                    <strong>${payload.start_date} to ${payload.end_date}</strong> has been <strong style="color:green">${status}</strong>
                     by your manager
                </div>
                <div>
                Comment by manager - ${payload.assigned_to_comments}
                </div>
            </td>
        </tr>
    </table>
    </body>
    </html>`



    // This is a Manager Email Template.

   const managerEmailTemplate = (payload)=>
   `
   <!DOCTYPE html>
   <html>
   
   <head>
       <title></title>
   </head>
   
   <body>
       <!-- Take only this part for email -->    
       <table style="width: 720px; font-family: Arial, Helvetica, sans-serif; ">
           <tr>
               <td colspan="2" style="text-align: center;padding: 12px; border-bottom: 1px solid #ccc;">Leave Application
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                       Employee name
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                       ${payload.leave_apply_by_name}
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Leave Type
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.leave_type}
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Date of application
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.created_at} 
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Leave duration
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.start_date} to ${payload.end_date}
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Number of working days
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.number_of_days}
                   </div>
               </td>
           </tr>
           <tr>
               <td>
                   <a href="http://54.204.113.214:3000/report/leave-requests">
                       <button type="button"
                           style="border: 0px; background:lightgreen; width: 100%; height: 40px; text-transform: uppercase;">
                           Approve
                       </button>
                   </a>
               </td>
               <td>
                   <a href="http://54.204.113.214:3000/report/leave-requests">
                       <button type="button"
                           style="border: 0px; background:lightcoral; width: 100%; height: 40px; text-transform: uppercase;">
                           Reject
                       </button>
                   </a>
               </td>
           </tr>
       </table>
   </body>
   
   </html>
   ` 





   // This is a Manager Email Template for OD.

   const managerEmailTemplateOD = (payload)=>
   `
   <!DOCTYPE html>
   <html>
   
   <head>
       <title></title>
   </head>
   
   <body>
       <!-- Take only this part for email -->    
       <table style="width: 720px; font-family: Arial, Helvetica, sans-serif; ">
           <tr>
               <td colspan="2" style="text-align: center;padding: 12px; border-bottom: 1px solid #ccc;">OD Application
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                       Employee name
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                       ${payload.apply_by_name}
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   Date of application
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.created_at} 
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   OD Date
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.od_date}
                   </div>
               </td>
           </tr>
           <tr>
               <td style="width: 50%; vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px; ">
                   OD Time
                   </div>
               </td>
               <td style="vertical-align: top;">
                   <div style=" margin-left: 10px; padding: 10px;">
                   ${payload.od_start_time} to ${payload.od_end_time}
                   </div>
               </td>
           </tr>
           <tr>
               <td>
                   <a href="http://54.204.113.214:3000/report/od-requests">
                       <button type="button"
                           style="border: 0px; background:lightgreen; width: 100%; height: 40px; text-transform: uppercase;">
                           Approve
                       </button>
                   </a>
               </td>
               <td>
                   <a href="http://54.204.113.214:3000/report/od-requests">
                       <button type="button"
                           style="border: 0px; background:lightcoral; width: 100%; height: 40px; text-transform: uppercase;">
                           Reject
                       </button>
                   </a>
               </td>
           </tr>
       </table>
   </body>
   
   </html>
   ` 


   
   const htmlPageSendSSA = (payload)=>
   `
   <!DOCTYPE html>
   <html>
   
   <head>
       <title></title>
   </head>
   
   <body>
       <!-- Take only this part for email -->    
       <div style=" margin-left: 10px; padding: 10px;">
       ${payload}
       </div>
   </body>
   
   </html>
   ` 

    module.exports ={
        senderEmailTemplate,
        managerEmailTemplate,
        managerEmailTemplateOD,
        htmlPageSendSSA
    }