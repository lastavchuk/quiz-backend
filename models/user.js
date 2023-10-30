const { Schema, model } = require("mongoose");
const errMsg = require("../constants/errors");
const regexp = require("../constants/regexps");
const handleSaveError = require("../helpers/handleSaveError");

const userSchemaMongoose = new Schema(
  {
    name: {
      type: String,
      minlength: [3, errMsg.errFieldMinLength("User name", 3)],
      maxlength: [50, errMsg.errFieldMaxLength("User name", 50)],
      required: [true, errMsg.errFieldIsrequired("User name")],
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          return regexp.emailRegexp.test(v);
        },
        message: (props) => `${props.value} ${errMsg.errMsgEmailRegexp}`,
      },
      required: [true, errMsg.errFieldIsrequired("Email")],
    },
    password: {
      type: String,
      minlength: [3, errMsg.errMsgMinPass],
      required: [true, errMsg.errFieldIsrequired("Password")],
    },
    userAvatar: {
      type: String,
      required: [true, errMsg.errFieldIsrequired("Avatar image")],
    },
    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, errMsg.errFieldIsrequired("Verify token")],
    },
    favorites: { type: [String], default: [] },
  },
  { versionKey: false, timestamps: true }
);

// for error add (post)
userSchemaMongoose.post("save", handleSaveError);

const User = model("user", userSchemaMongoose);

module.exports = User;
