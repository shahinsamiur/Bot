
const nodemailer = require("nodemailer");

const MakeEmail=async(pair,EMA21)=>{
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
//    host: "smtp.ethereal.email",
//   secure: false, // true for 465, false for other ports
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // service: 'gmail',
    auth: {
        user: 'shahinsamiur@gmail.com',
        pass: 'audvntutqlhgxypo'
    }
});

  

  let info = await transporter.sendMail({
    from: '"samiur shahin" <shahinsamiur@gmail.com>', // sender address
    to: "shahinsamiur@proton.me, shahinsamiur@yahoo.com", // list of receivers
    subject: `Hello Treders ${pair}`, // Subject line
    text: `got Trade ${EMA21}`, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });        
  console.log("Message sent: %s", info.messageId);

}
module.exports=MakeEmail;