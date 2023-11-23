import  nodemailer from "nodemailer"
//-----------------------------------------------------------------------------


export async function sendMail(clientMail:string, toEmail:string, clientMessage:string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const mailOptions = {
    from: clientMail,
    to: process.env.NODEMAILER_EMAIL,
    text: clientMessage,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}