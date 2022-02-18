const { Schema, model } = require('mongoose');

/** Model for setlists */
const setlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [ /** array of object ids from modell song */
    {
      type: Schema.Types.ObjectId,
      ref: 'Song',
    },
  ],
});

module.exports = model('Setlist', setlistSchema);
