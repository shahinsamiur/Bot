const nodemailer = require("nodemailer");

const MakeEmail = async (pair,trend, SL,TP,currentPrice) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

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
    text: ` SL=${SL},  Take Profit=${TP}  currentprice=${currentPrice}`, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
};
module.exports = MakeEmail;
