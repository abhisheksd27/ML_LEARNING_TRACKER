import React, { useState, useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import LearningPathContext from '../context/LearningPathContext';

const AddTaskModal = ({ isOpen, onClose, topicId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resourceLink, setResourceLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const toast = useToast();
  const { createTask } = useContext(LearningPathContext);

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast({
        title: 'Title is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      await createTask(topicId, {
        title,
        description,
        resourceLink,
      });
      
      toast({
        title: 'Task added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setResourceLink('');
      
      onClose();
    } catch (error) {
      toast({
        title: 'Failed to add task',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input 
                placeholder="Task title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea 
                placeholder="Task description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>Resource Link</FormLabel>
              <Input 
                placeholder="Link to learning resource" 
                value={resourceLink}
                onChange={(e) => setResourceLink(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="purple" 
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Add Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;