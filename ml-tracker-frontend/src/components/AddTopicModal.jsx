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

const AddTopicModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const toast = useToast();
  const { createTopic } = useContext(LearningPathContext);

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
      await createTopic({
        title,
        description,
        timeframe,
      });
      
      toast({
        title: 'Topic added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setTimeframe('');
      
      onClose();
    } catch (error) {
      toast({
        title: 'Failed to add topic',
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
        <ModalHeader>Add New Topic</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input 
                placeholder="Topic title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea 
                placeholder="Topic description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>Timeframe</FormLabel>
              <Input 
                placeholder="e.g., Month 7-8" 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
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
            Add Topic
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTopicModal;