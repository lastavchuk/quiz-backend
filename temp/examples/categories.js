const categoriesSchema = new Schema({
  categoryName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  categoryType: {
    type: String,
    enum: ['adults', 'children'],
    required: true,
    default: 'adults',
  },
});
