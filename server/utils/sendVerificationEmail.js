const nodemailer = require("nodemailer");

const sendVerificationEmail = async (emailTo, code) => {
  const transport = nodemailer.createTransport({
    host: "mail.keabafrica.com",
    port: 587,
    secure: false,
    auth: {
      user: "circletrackadmin@keabafrica.com",
      pass: "Password36yishak",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: `"CircleTrack" <circletrackadmin@keabafrica.com>`,
    to: `${emailTo}`,
    subject: "Verification Code",
    text: `Your verification code is ${code}. If you haven't requested this code, please do not reply.`,
  };
  let sent
  try {
    const info = await transport.sendMail(mailOptions);
    sent = true
  } catch (error) {
    console.log(error);
    sent = false    
  }
  return sent
};

module.exports = sendVerificationEmail;
