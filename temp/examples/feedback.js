const feedbackSchema = new Schema({
  quizId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  userAvatar: {
    type: String,
  },
  rate: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    minlength: 8,
    maxlength: 500,
    required: true,
  },
});
