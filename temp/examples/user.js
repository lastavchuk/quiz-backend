const userSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 32,
        required: true,
    },
    userAvatar: {
        type: String,
        required: true,
    },
    token: String,
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: true,
    },
    passedQuizzes: {
        type: [passedQuizSchema],
    },
    average: {
        type: Number,
        required: true,
        default: 0,
    },
    favorites: {
        type: [String],
    },
});

const passedQuizSchema = new Schema({
    quizId: {
        type: String,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    correctAnswers: {
        type: Number,
        required: true,
    },
});
