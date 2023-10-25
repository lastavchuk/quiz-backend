const nodemailer = require("nodemailer");

const { EMAIL_FROM, UKR_NET_PASSWORD } = process.env;

const sendEmailUkrNet = async (data) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ukr.net",
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_FROM,
            pass: UKR_NET_PASSWORD,
        },
    });

    await transporter.sendMail({ ...data, from: EMAIL_FROM });
    return true;
};

module.exports = sendEmailUkrNet;
