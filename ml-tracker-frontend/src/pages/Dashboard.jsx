import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  VStack,
  HStack,
  Accordion,
  Spinner,
  useDisclosure,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  SimpleGrid,
  Icon,
  Progress,
  useToast,
} from '@chakra-ui/react';
import { FaBook, FaCheckCircle, FaClock, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LearningPathContext from '../context/LearningPathContext';
import AuthContext from '../context/AuthContext';
import Topic from '../components/Topic';
import AddTopicModal from '../components/AddTopicModal';

const Dashboard = () => {
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);
  const { 
    learningPath, 
    loading, 
    error, 
    updateTask, 
    calculateProgress 
  } = useContext(LearningPathContext);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    completionRate: 0,
    githubLinks: 0,
    recentlyCompleted: 0,
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (learningPath && learningPath.topics) {
      let totalTasks = 0;
      let completedTasks = 0;
      let githubLinks = 0;
      let recentlyCompleted = 0;
      
      // Get one week ago date
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      learningPath.topics.forEach(topic => {
        topic.tasks.forEach(task => {
          totalTasks++;
          if (task.isCompleted) {
            completedTasks++;
            if (task.githubLink) {
              githubLinks++;
            }
            
            // Check if completed within the last week
            if (task.completedDate && new Date(task.completedDate) >= oneWeekAgo) {
              recentlyCompleted++;
            }
          }
        });
      });
      
      const completionRate = totalTasks > 0 
        ? Math.round((completedTasks / totalTasks) * 100) 
        : 0;
      
      setStats({
        totalTasks,
        completedTasks,
        completionRate,
        githubLinks,
        recentlyCompleted
      });
    }
  }, [learningPath]);

  const handleTaskUpdate = async (topicId, taskId, taskData) => {
    try {
      await updateTask(topicId, taskId, taskData);
      toast({
        title: 'Task updated',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to update task',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (authLoading || loading) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Heading display="inline-block" size="xl">
          Error Loading Data
        </Heading>
        <Text mt={3} mb={2}>
          {error}
        </Text>
        <Text color={'gray.500'} mb={6}>
          Please try again later.
        </Text>
      </Box>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Box>
          <Heading size="lg">ML Learning Dashboard</Heading>
          <Text color="gray.600">Track your machine learning journey</Text>
        </Box>
        <Button colorScheme="purple" onClick={onOpen}>
          Add New Topic
        </Button>
      </Flex>

      {/* Stats Section */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={5} mb={8}>
        <Stat
          px={4}
          py={3}
          shadow="md"
          border="1px"
          borderColor="gray.200"
          rounded="lg"
          bg="white"
        >
          <StatLabel fontWeight="medium">
            <HStack>
              <Icon as={FaCheckCircle} color="green.500" />
              <Text>Completion Rate</Text>
            </HStack>
          </StatLabel>
          <StatNumber fontSize="2xl">{stats.completionRate}%</StatNumber>
          <Progress
            value={stats.completionRate}
            size="xs"
            colorScheme="green"
            mt={2}
            borderRadius="full"
          />
        </Stat>

        <Stat
          px={4}
          py={3}
          shadow="md"
          border="1px"
          borderColor="gray.200"
          rounded="lg"
          bg="white"
        >
          <StatLabel fontWeight="medium">
            <HStack>
              <Icon as={FaBook} color="blue.500" />
              <Text>Tasks Progress</Text>
            </HStack>
          </StatLabel>
          <StatNumber fontSize="2xl">
            {stats.completedTasks}/{stats.totalTasks}
          </StatNumber>
          <StatHelpText>
            Tasks completed out of total
          </StatHelpText>
        </Stat>

        <Stat
          px={4}
          py={3}
          shadow="md"
          border="1px"
          borderColor="gray.200"
          rounded="lg"
          bg="white"
        >
          <StatLabel fontWeight="medium">
            <HStack>
              <Icon as={FaGithub} color="gray.700" />
              <Text>GitHub Projects</Text>
            </HStack>
          </StatLabel>
          <StatNumber fontSize="2xl">{stats.githubLinks}</StatNumber>
          <StatHelpText>
            Projects linked to GitHub
          </StatHelpText>
        </Stat>

        <Stat
          px={4}
          py={3}
          shadow="md"
          border="1px"
          borderColor="gray.200"
          rounded="lg"
          bg="white"
        >
          <StatLabel fontWeight="medium">
            <HStack>
              <Icon as={FaClock} color="purple.500" />
              <Text>Recent Progress</Text>
            </HStack>
          </StatLabel>
          <StatNumber fontSize="2xl">{stats.recentlyCompleted}</StatNumber>
          <StatHelpText>
            Tasks completed in last 7 days
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Learning Path Section */}
      <Box bg="white" p={5} shadow="md" borderRadius="lg" borderWidth="1px">
        <Heading size="md" mb={4}>
          Your Learning Path
        </Heading>
        {learningPath && learningPath.topics && learningPath.topics.length > 0 ? (
          <Accordion allowMultiple defaultIndex={[0]}>
            {learningPath.topics.map((topic) => (
              <Topic 
                key={topic._id} 
                topic={topic} 
                onUpdateTask={handleTaskUpdate} 
              />
            ))}
          </Accordion>
        ) : (
          <Text color="gray.500" textAlign="center" py={10}>
            No topics found. Add a new topic to get started.
          </Text>
        )}
      </Box>

      <AddTopicModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Dashboard;