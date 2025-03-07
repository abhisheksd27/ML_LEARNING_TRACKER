import React, { useState } from 'react';
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
  Switch,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';

const TaskDetailsModal = ({ isOpen, onClose, task, topicId, onUpdateTask }) => {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [resourceLink, setResourceLink] = useState(task.resourceLink || '');
  const [githubLink, setGithubLink] = useState(task.githubLink || '');
  const [notes, setNotes] = useState(task.notes || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await onUpdateTask(topicId, task._id, {
        isCompleted,
        resourceLink,
        githubLink,
        notes
      });
      onClose();
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Task Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontWeight="bold" fontSize="lg">{task.title}</Text>
            {task.description && (
              <Text fontSize="md" color="gray.600">{task.description}</Text>
            )}
            
            <HStack>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="is-completed" mb="0">
                  Mark as completed
                </FormLabel>
                <Switch
                  id="is-completed"
                  isChecked={isCompleted}
                  onChange={(e) => setIsCompleted(e.target.checked)}
                  colorScheme="green"
                />
              </FormControl>
            </HStack>
            
            <FormControl>
              <FormLabel>Resource Link</FormLabel>
              <Input 
                placeholder="Add link to learning resource" 
                value={resourceLink}
                onChange={(e) => setResourceLink(e.target.value)}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>GitHub Link</FormLabel>
              <Input 
                placeholder="Add link to your GitHub repository" 
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Textarea 
                placeholder="Add your notes about this task" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
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
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskDetailsModal;