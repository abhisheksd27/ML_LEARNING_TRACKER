import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  getLearningPath, 
  initializeLearningPath, 
  updateTaskStatus, 
  addTopic, 
  addTask 
} from '../services/api';
import AuthContext from './AuthContext';

export const LearningPathContext = createContext();

export const LearningPathProvider = ({ children }) => {
  const [learningPath, setLearningPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchLearningPath = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getLearningPath();
        setLearningPath(data);
        setError(null);
      } catch (error) {
        // If learning path doesn't exist, try to initialize it
        if (error.response?.status === 404) {
          try {
            const newPath = await initializeLearningPath();
            setLearningPath(newPath);
            setError(null);
          } catch (initError) {
            setError(initError.response?.data?.message || 'Failed to initialize learning path');
          }
        } else {
          setError(error.response?.data?.message || 'Failed to fetch learning path');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, [isAuthenticated]);

  const updateTask = async (topicId, taskId, taskData) => {
    try {
      setLoading(true);
      const updatedPath = await updateTaskStatus(topicId, taskId, taskData);
      setLearningPath(updatedPath);
      return updatedPath;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update task');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createTopic = async (topicData) => {
    try {
      setLoading(true);
      const updatedPath = await addTopic(topicData);
      setLearningPath(updatedPath);
      return updatedPath;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add topic');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (topicId, taskData) => {
    try {
      setLoading(true);
      const updatedPath = await addTask(topicId, taskData);
      setLearningPath(updatedPath);
      return updatedPath;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add task');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = () => {
    if (!learningPath || !learningPath.topics) return { completed: 0, total: 0, percentage: 0 };

    let completed = 0;
    let total = 0;

    learningPath.topics.forEach(topic => {
      topic.tasks.forEach(task => {
        total++;
        if (task.isCompleted) completed++;
      });
    });

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percentage };
  };

  return (
    <LearningPathContext.Provider
      value={{
        learningPath,
        loading,
        error,
        updateTask,
        createTopic,
        createTask,
        calculateProgress
      }}
    >
      {children}
    </LearningPathContext.Provider>
  );
};

export default LearningPathContext;
