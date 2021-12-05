const mongoose = require('mongoose');

const { Schema } = mongoose;

const RolesSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  name: {
    type: String,
    required: true
  },
  members: [{ type: [Schema.Types.ObjectId], ref: 'Users' }],
  datasets: [String],
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
});

mongoose.model('Roles', RolesSchema);