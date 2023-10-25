const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const randomId = require("crypto").randomUUID;

const User = require("../models/user");
const { ctrlWrapper, HttpError, verifyEmailTmpl } = require("../helpers");
const sendEmail = require("../helpers/sendEmailUkrNet");
const errMsg = require("../constants/errors");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    const userAvatar =
        "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";

    const verificationToken = randomId();

    const result = await User.create({
        ...req.body,
        password: hashPass,
        userAvatar,
        verificationToken,
    });

    await sendEmail(verifyEmailTmpl(result.email, verificationToken));

    res.status(201).json({
        user: {
            name: result.name,
            email: result.email,
        },
    });
};

const login = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, errMsg.errMsgAuthInvalid);
    }

    if (!user.verify) {
        throw HttpError(401, errMsg.errMsgEmailNotVerify);
    }

    const copmarePass = await bcrypt.compare(req.body.password, user.password);
    if (!copmarePass) {
        throw HttpError(401, errMsg.errMsgAuthInvalid);
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            name: user.name,
            email: user.email,
            average: user.email,
            userAvatar: user.userAvatar,
            passedQuizzes: user.passedQuizzes,
        },
    });
};

const current = async (req, res) => {
    const { email, name, average, userAvatar, passedQuizzes } = req.user;
    res.json({ email, name, average, userAvatar, passedQuizzes });
};

const logout = async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { token: "" });

    res.status(204).json();
};

const updateAvatar = async (req, res) => {
    await jimp
        .read(req.file.path)
        .then((image) => {
            return image.resize(250, 250).quality(75).writeAsync(req.file.path);
        })
        .catch((err) => {
            throw HttpError(400, err.message);
        });

    const newFileName = `${req.user._id}_${req.file.originalname}`;
    ///===================================
    const avatarPath = path.join(
        __dirname,
        "../",
        "public",
        "avatars",
        newFileName
    );

    await fs.rename(req.file.path, avatarPath);

    const userAvatar = path.join("avatars", newFileName);
    await User.findByIdAndUpdate(req.user._id, { userAvatar });

    res.json({ userAvatar });
};

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw HttpError(404, errMsg.errMsgUserNotFound);
    }

    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: "",
    });

    res.json({ message: "Verification successful" });
};

const resendVerifyToken = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, errMsg.errMsgUserNotFound);
    }

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }

    await sendEmail(verifyEmailTmpl(email, user.verificationToken));

    res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyToken: ctrlWrapper(resendVerifyToken),
};
