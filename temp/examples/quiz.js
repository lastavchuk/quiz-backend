const quizSchema = new Schema({
  quizTheme: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  totalPassed: {
    type: Number,
    default: 0, //+1
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  quizCategory: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
  quizType: {
    type: String,
    enum: ['adults', 'children'],
    required: true,
    default: 'adults',
  },
});
