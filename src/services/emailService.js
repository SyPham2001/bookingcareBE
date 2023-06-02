require("dotenv").config();
import nodemailer from "nodemailer";
let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Phúc Hưng 👻" <hungsam2810@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};
let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên BookingCare Phúc Hưng.</p>
  
    <div>Thông tin đặt lịch khám bệnh của bạn:</div>
    <br/>
    <div><b>Lý do khám bệnh của bạn: ${dataSend.reason}</b></div>
    <b>Thời gian: ${dataSend.time}</b>
    </div>
    <div>
    <b>Bác sĩ: ${dataSend.doctorName}</b>
    </div>

    <p>Nếu các thông tin trên là đúng, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh tại BookingCare Phúc Hưng.</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>
    Xin chân thành cảm ơn!</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}</h3>
    <p>You received this email because you booked a medical appointment on BookingCare Phuc Hung.</p>
    
    <div>Your history information set:</div>
    <br/>
    <div><b>
    Your reason for medical examination?: ${dataSend.reason}</b></div>
    <b>Time: ${dataSend.time}</b>
    </div>
    <div>
    <b>Doctor: ${dataSend.doctorName}</b>
    </div>

    <p>
    If the above information is correct, please click on the link below to confirm and complete the booking procedure at BookingCare Phuc Hung.</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>
    Sincerely thank!</div>
    `;
  }
  return result;
};
let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào  ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên BookingCare Phúc Hưng Thành Công</p>
    <p>Thông tin đơn thuốc/hóa đơn của bạn được gửi trong file đính kèm phía dưới</p>
    <div>
    Xin chân thành cảm ơn!</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}</h3>
    <p>You received this email because you booked a medical appointment on BookingCare Phuc Hung Success.</p>
    
    <p>lalala</p>
    <div>
    Sincerely thank!</div>
    `;
  }
  return result;
};

let sendAttachment = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Phúc Hưng 👻" <hungsam2810@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
    html: getBodyHTMLEmailRemedy(dataSend),
    attachments: [
      {
        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
        content: dataSend.imageBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
