const nodemailer = require("nodemailer");

const MakeEmail = async (pair,trend, SL,currentPrice) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
var TP=0
if(trend=="up"){
  var risk=currentPrice-SL
  TP=currentPrice+(risk*2)
}else{
  var risk=SL-currentPrice
  TP=currentPrice-(risk*2)
}


  //    host: "smtp.ethereal.email",
  //   secure: false, // true for 465, false for other ports
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    // service: 'gmail',
    auth: {
      user: "shahinsamiur@gmail.com",
      pass: "iwlbfxxntocfsrne",
    },
  });

  let info = await transporter.sendMail({
    from: '"samiur shahin" <shahinsamiur@gmail.com>', // sender address
    to: "shahinsamiur@proton.me, shahinsamiur@yahoo.com", // list of receivers
    subject: ` ${pair}    ${trend}`, // Subject line
    text: ` SL=${SL},  Take Profit=${TP} `, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
};
module.exports = MakeEmail;
