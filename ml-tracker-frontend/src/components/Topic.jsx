import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Progress,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';

const Topic = ({ topic, onUpdateTask }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Calculate progress for this topic
  const totalTasks = topic.tasks.length;
  const completedTasks = topic.tasks.filter(task => task.isCompleted).length;
  const progressPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <AccordionItem>
      <h2>
        <AccordionButton
          py={4}
          _expanded={{ bg: 'purple.50', color: 'purple.700' }}
        >
          <Box flex="1" textAlign="left">
            <Flex justify="space-between" align="center">
              <Heading size="sm">{topic.title}</Heading>
              <Text fontSize="sm" color="gray.500">
                {completedTasks}/{totalTasks} completed
              </Text>
            </Flex>
            <Text fontSize="xs" mt={1} color="gray.500">
              {topic.timeframe}
            </Text>
            <Progress
              value={progressPercentage}
              size="xs"
              colorScheme="purple"
              mt={2}
              borderRadius="full"
            />
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Text fontSize="sm" mb={4}>{topic.description}</Text>
        
        <TaskList tasks={topic.tasks} topicId={topic._id} onUpdateTask={onUpdateTask} />
        
        <Button 
          size="sm" 
          colorScheme="purple" 
          variant="outline" 
          mt={4}
          onClick={onOpen}
        >
          Add New Task
        </Button>
        
        <AddTaskModal 
          isOpen={isOpen} 
          onClose={onClose} 
          topicId={topic._id}
        />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Topic;
