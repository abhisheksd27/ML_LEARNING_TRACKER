const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  resourceLink: {
    type: String
  },
  githubLink: {
    type: String
  },
  completedDate: {
    type: Date
  },
  notes: {
    type: String
  }
});

const topicSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  timeframe: {
    type: String,
    trim: true
  },
  tasks: [taskSchema]
});

const learningPathSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topics: [topicSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LearningPath', learningPathSchema);