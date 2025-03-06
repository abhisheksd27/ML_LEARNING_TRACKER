const express = require('express');
const {
  initializeLearningPath,
  getLearningPath,
  updateTaskStatus,
  addTopic,
  addTask
} = require('../controllers/learningPath.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/init', protect, initializeLearningPath);
router.get('/', protect, getLearningPath);
router.put('/topics/:topicId/tasks/:taskId', protect, updateTaskStatus);
router.post('/topics', protect, addTopic);
router.post('/topics/:topicId/tasks', protect, addTask);

module.exports = router;