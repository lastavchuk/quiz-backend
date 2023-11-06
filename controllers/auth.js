const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const randomId = require('crypto').randomUUID;

const User = require('../models/user');
const { ctrlWrapper, HttpError, verifyEmailTmpl } = require('../helpers');
const sendEmail = require('../helpers/sendEmailUkrNet');
const errMsg = require('../constants/errors');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const hashPass = await bcrypt.hash(req.body.password, 10);

  // const userAvatar = gravatar.url(req.body.email, {
  //   protocol: 'https',
  //   s: '100',
  // });

  // "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";

  const verificationToken = randomId();

  const result = await User.create({
    ...req.body,
    password: hashPass,
    // userAvatar,
    verificationToken,
  });

  await sendEmail(verifyEmailTmpl(result.email, verificationToken));

  res.status(201).json({
    name: result.name,
    email: result.email,
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
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2d' });

  const result = await User.findByIdAndUpdate(
    user._id,
    {
      token,
    },
    {
      new: true,
      select:
        '-password -totalQuestions -totalAnswers -verify -verificationToken -createdAt -updatedAt',
    }
  );

  res.json(result);
};

const current = async (req, res) => {
  const { email, name, average, userAvatar, passedQuizzes } = req.user;
  res.json({ email, name, average, userAvatar, passedQuizzes });
};

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: '' });

  res.status(204).json();
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, errMsg.errMsgUserNotFound);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: '',
  });

  res.json({ message: 'Verification successful' });
};

const resendVerifyToken = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, errMsg.errMsgUserNotFound);
  }

  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  await sendEmail(verifyEmailTmpl(email, user.verificationToken));

  res.status(200).json({ message: 'Verification email sent' });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyToken: ctrlWrapper(resendVerifyToken),
};
