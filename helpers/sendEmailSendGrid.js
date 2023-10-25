const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailSendGrid = async (data) => {
    await sgMail.send({ ...data, from: process.env.EMAIL_FROM });
    return true;
};

module.exports = sendEmailSendGrid;
