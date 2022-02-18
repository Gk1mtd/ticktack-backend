const { Schema, model } = require('mongoose');

const setlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Song',
    },
  ],
});

module.exports = model('Setlist', setlistSchema);
