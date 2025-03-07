import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  useColorModeValue,
  Progress,
} from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';
import LearningPathContext from '../context/LearningPathContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { calculateProgress } = useContext(LearningPathContext);
  const navigate = useNavigate();
  
  const { percentage } = calculateProgress();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        align={'center'}
        justifyContent={'space-between'}
      >
        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <Link to="/">
              <Text
                fontFamily={'heading'}
                fontWeight={'bold'}
                color={useColorModeValue('purple.800', 'white')}
              >
                ML Learning Tracker
              </Text>
            </Link>
          </Box>
        </HStack>
        <Flex alignItems={'center'}>
          {isAuthenticated ? (
            <>
              <HStack mr={4}>
                <Text fontSize="sm">Welcome, {user?.name}</Text>
              </HStack>
              <Button
                variant={'outline'}
                colorScheme={'purple'}
                size={'sm'}
                mr={4}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              <Button
                variant={'solid'}
                colorScheme={'purple'}
                size={'sm'}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={'outline'}
                colorScheme={'purple'}
                size={'sm'}
                mr={4}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant={'solid'}
                colorScheme={'purple'}
                size={'sm'}
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {isAuthenticated && (
        <Box bg="gray.100" px={4} py={1}>
          <Flex align="center">
            <Text fontSize="xs" width="120px">Your Progress: {percentage}%</Text>
            <Progress 
              value={percentage} 
              size="xs" 
              colorScheme="purple" 
              flex="1" 
              borderRadius="full"
            />
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Header;