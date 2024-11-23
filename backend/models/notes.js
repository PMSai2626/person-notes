const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Work', 'Personal', 'Others'], 
      required: true,
    },
    created_at: { 
      type: Date,
       default: Date.now },
    updated_at: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model('Notes', noteSchema);
