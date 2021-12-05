const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
});

UsersSchema.index({ email: 'text' });

mongoose.model('Users', UsersSchema);