const answerSchema = new Schema({
  answer: {
    type: String,
    minlength: 3,
    maxlength: 500,
    required: true,
  },
  validAnswer: {
    type: Boolean,
    default: false,
  },
});

const questionSchema = new Schema({
  questionType: {
    type: String,
    enum: ['quiz', 'true or false'],
    default: 'quiz',
    required: true,
  },
  questionDescr: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  questionTime: {
    type: String,
    required: true,
  },
  answers: {
    type: [answerSchema],
    required: true,
  },
  answerBackground: {
    type: String,
    default: 'rgba(255, 255, 255, 0.02)',
    enum: ['rgba(255, 255, 255, 0.02)', '#43A8D3', '#6636C5', '#E65368'],
    required: true,
  },
  questionImage: {
    type: String,
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'quiz',
    required: true,
  },
});
