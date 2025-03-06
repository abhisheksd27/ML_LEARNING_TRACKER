const LearningPath = require('../models/learningPath.model');

// @desc    Initialize learning path for a user
// @route   POST /api/learning-path/init
// @access  Private
const initializeLearningPath = async (req, res) => {
  try {
    // Check if user already has a learning path
    const existingPath = await LearningPath.findOne({ user: req.user._id });

    if (existingPath) {
      return res.status(400).json({ 
        message: 'Learning path already exists for this user',
        learningPath: existingPath
      });
    }

    // Create a new learning path with default ML curriculum
    const learningPath = new LearningPath({
      user: req.user._id,
      topics: [
        {
          title: 'Mathematics Foundations',
          description: 'Linear Algebra and Basic Statistics',
          timeframe: 'Month 1',
          tasks: [
            {
              title: 'Linear Algebra Basics',
              description: 'Learn vectors, matrices, and operations',
              isCompleted: false,
              resourceLink: 'https://www.khanacademy.org/math/linear-algebra',
            },
            {
              title: 'Statistics & Probability',
              description: 'Learn descriptive statistics and probability distributions',
              isCompleted: false,
              resourceLink: 'https://www.khanacademy.org/math/statistics-probability',
            }
          ]
        },
        {
          title: 'Python Programming',
          description: 'Python Basics and Data Manipulation',
          timeframe: 'Month 2',
          tasks: [
            {
              title: 'Python Basics',
              description: 'Learn syntax, data types, and basic operations',
              isCompleted: false,
              resourceLink: 'https://www.codecademy.com/learn/learn-python-3',
            },
            {
              title: 'NumPy & Pandas',
              description: 'Learn data manipulation with NumPy and Pandas',
              isCompleted: false,
              resourceLink: 'https://pandas.pydata.org/docs/getting_started/index.html',
            }
          ]
        }
        // Additional topics would be added here (abbreviated for brevity)
      ]
    });

    const savedPath = await learningPath.save();
    res.status(201).json(savedPath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's learning path
// @route   GET /api/learning-path
// @access  Private
const getLearningPath = async (req, res) => {
  try {
    const learningPath = await LearningPath.findOne({ user: req.user._id });

    if (!learningPath) {
      return res.status(404).json({ message: 'Learning path not found' });
    }

    res.json(learningPath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update task completion status
// @route   PUT /api/learning-path/topics/:topicId/tasks/:taskId
// @access  Private
const updateTaskStatus = async (req, res) => {
  try {
    const { topicId, taskId } = req.params;
    const { isCompleted, resourceLink, githubLink, notes } = req.body;

    const learningPath = await LearningPath.findOne({ user: req.user._id });

    if (!learningPath) {
      return res.status(404).json({ message: 'Learning path not found' });
    }

    // Find the topic and task
    const topic = learningPath.topics.id(topicId);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    const task = topic.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task fields
    task.isCompleted = isCompleted !== undefined ? isCompleted : task.isCompleted;
    task.resourceLink = resourceLink !== undefined ? resourceLink : task.resourceLink;
    task.githubLink = githubLink !== undefined ? githubLink : task.githubLink;
    task.notes = notes !== undefined ? notes : task.notes;
    
    if (isCompleted && !task.completedDate && isCompleted !== task.isCompleted) {
      task.completedDate = new Date();
    }

    // Update lastUpdated timestamp
    learningPath.lastUpdated = new Date();

    await learningPath.save();
    res.json(learningPath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new topic
// @route   POST /api/learning-path/topics
// @access  Private
const addTopic = async (req, res) => {
  try {
    const { title, description, timeframe } = req.body;

    const learningPath = await LearningPath.findOne({ user: req.user._id });

    if (!learningPath) {
      return res.status(404).json({ message: 'Learning path not found' });
    }

    learningPath.topics.push({
      title,
      description,
      timeframe,
      tasks: []
    });

    learningPath.lastUpdated = new Date();
    await learningPath.save();
    
    res.status(201).json(learningPath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new task to a topic
// @route   POST /api/learning-path/topics/:topicId/tasks
// @access  Private
const addTask = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { title, description, resourceLink } = req.body;

    const learningPath = await LearningPath.findOne({ user: req.user._id });

    if (!learningPath) {
      return res.status(404).json({ message: 'Learning path not found' });
    }

    const topic = learningPath.topics.id(topicId);
    
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    topic.tasks.push({
      title,
      description,
      resourceLink,
      isCompleted: false
    });

    learningPath.lastUpdated = new Date();
    await learningPath.save();
    
    res.status(201).json(learningPath);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  initializeLearningPath,
  getLearningPath,
  updateTaskStatus,
  addTopic,
  addTask
};