import React from 'react';
import {
  Box,
  VStack,
  Checkbox,
  Text,
  Badge,
  Link,
  HStack,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { FaGithub, FaLink, FaEdit } from 'react-icons/fa';
import { format } from 'date-fns';
import TaskDetailsModal from './TaskDetailsModal';

const TaskList = ({ tasks, topicId, onUpdateTask }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTask, setSelectedTask] = React.useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    onOpen();
  };

  const handleCheckboxChange = (taskId, isCompleted) => {
    onUpdateTask(topicId, taskId, { isCompleted: !isCompleted });
  };

  return (
    <VStack align="stretch" spacing={2}>
      {tasks.map((task) => (
        <Box 
          key={task._id} 
          p={3} 
          borderWidth="1px" 
          borderRadius="md"
          bg={task.isCompleted ? 'green.50' : 'white'}
          borderColor={task.isCompleted ? 'green.200' : 'gray.200'}
        >
          <HStack justifyContent="space-between">
            <Checkbox
              isChecked={task.isCompleted}
              onChange={() => handleCheckboxChange(task._id, task.isCompleted)}
              colorScheme="green"
            >
              <Text
                fontWeight="medium"
                textDecoration={task.isCompleted ? 'line-through' : 'none'}
                color={task.isCompleted ? 'gray.500' : 'black'}
              >
                {task.title}
              </Text>
            </Checkbox>
            <HStack spacing={2}>
              {task.resourceLink && (
                <Link href={task.resourceLink} isExternal>
                  <Icon as={FaLink} color="blue.500" />
                </Link>
              )}
              {task.githubLink && (
                <Link href={task.githubLink} isExternal>
                  <Icon as={FaGithub} color="gray.700" />
                </Link>
              )}
              <Icon
                as={FaEdit}
                color="purple.500"
                cursor="pointer"
                onClick={() => handleTaskClick(task)}
              />
            </HStack>
          </HStack>
          {task.completedDate && task.isCompleted && (
            <Text fontSize="xs" color="green.600" mt={1}>
              Completed on {format(new Date(task.completedDate), 'MMM d, yyyy')}
            </Text>
          )}
        </Box>
      ))}
      
      {selectedTask && (
        <TaskDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          task={selectedTask}
          topicId={topicId}
          onUpdateTask={onUpdateTask}
        />
      )}
    </VStack>
  );
};

export default TaskList;