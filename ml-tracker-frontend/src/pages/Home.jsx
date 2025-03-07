import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Flex,
  SimpleGrid,
  Image,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FaCheckCircle, FaGraduationCap, FaRocket, FaCode } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Box>
      {/* Hero Section */}
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Track Your <br />
            <Text as={'span'} color={'purple.400'}>
              Machine Learning Journey
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            The most efficient way to learn machine learning is with a structured approach. 
            Our ML Learning Tracker helps you organize your learning path, track your progress, 
            and document your projects - all in one place.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              colorScheme={'purple'}
              bg={'purple.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'purple.500',
              }}
              as={RouterLink}
              to={isAuthenticated ? '/dashboard' : '/register'}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
            </Button>
            <Button 
              variant={'link'} 
              colorScheme={'blue'} 
              size={'sm'}
              as={RouterLink}
              to={isAuthenticated ? '/dashboard' : '/login'}
            >
              {isAuthenticated ? 'View Your Progress' : 'Already have an account?'}
            </Button>
          </Stack>
        </Stack>
      </Container>

      {/* Features Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
        <Container maxW={'6xl'}>
          <Heading
            textAlign={'center'}
            fontSize={'3xl'}
            py={10}
            fontWeight={'bold'}
          >
            Features
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature
              icon={<Icon as={FaGraduationCap} w={10} h={10} />}
              title={'Structured Learning Path'}
              text={
                'Follow a comprehensive machine learning curriculum designed for efficient learning. From mathematics fundamentals to advanced deep learning techniques.'
              }
            />
            <Feature
              icon={<Icon as={FaCheckCircle} w={10} h={10} />}
              title={'Progress Tracking'}
              text={
                'Mark tasks as complete, track your progress, and visualize your journey. Set goals and see your achievements over time.'
              }
            />
            <Feature
              icon={<Icon as={FaCode} w={10} h={10} />}
              title={'Project Portfolio'}
              text={
                'Link your GitHub repositories to showcase your projects. Build a comprehensive portfolio of machine learning work for future employers.'
              }
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Learning Path Preview */}
      <Box py={20}>
        <Container maxW={'6xl'}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Box>
              <Heading mb={4}>Your ML Learning Roadmap</Heading>
              <Text fontSize={'lg'} color={'gray.500'} mb={6}>
                Our learning tracker provides a comprehensive roadmap for becoming proficient in machine learning within one year, dedicating just one hour per day.
              </Text>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Math Fundamentals: Linear Algebra, Calculus, Statistics
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Programming: Python, NumPy, Pandas, Visualization
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Core ML Algorithms: Regression, Decision Trees, Clustering
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Deep Learning: Neural Networks, CNNs, RNNs
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Specialized Topics: NLP, Computer Vision, Reinforcement Learning
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Project Portfolio: Build real-world applications
                </ListItem>
              </List>
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'purple'}
                bg={'purple.400'}
                _hover={{ bg: 'purple.500' }}
                mt={8}
                as={RouterLink}
                to={isAuthenticated ? '/dashboard' : '/register'}
              >
                Start Learning Now
              </Button>
            </Box>
            <Flex>
              <Image
                rounded={'md'}
                alt={'feature image'}
                src={
                  'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                }
                objectFit={'cover'}
              />
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

const Feature = ({ title, text, icon }) => {
  return (
    <Stack align={'center'} textAlign={'center'}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'purple.500'}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default Home;