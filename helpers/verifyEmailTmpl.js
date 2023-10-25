const verifyEmailTmpl = (to, token) => {
    return {
        to,
        subject: "Verify email",
        html: `Click <a target="_blank" href="${process.env.BASE_URL}/api/auth/verify/${token}">here</a> to confirm your email`,
    };
};

module.exports = verifyEmailTmpl;
