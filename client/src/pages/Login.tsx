import {
    FormControl,
    FormLabel,
    Button,
    Stack,
    Center,
    Input,
    Text,
    InputGroup,
    InputRightElement,
    Box,
    useDisclosure, 
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import React from 'react';
import ForgotPasswordModal from '../components/Login/ForgotPasswordModal';

const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        username: '',
        password: ''
    });
    const [show, setShow] = React.useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handlePasswordClick = () => setShow(!show);
    
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    // add more descriptive error messages when logging in 
    // error.response.data.message ??
    const handleClick = async () => {
        try {          
            if (formState.username === "" || formState.password === "") {
                return toast({
                    title: 'Error',
                    description: 'Please log in',
                    status: 'error',
                    duration: 2000,
                });
            } else {
                const response = await axios.post("http://localhost:3001/auth/login/", {
                    username: formState.username,
                    password: formState.password
                });
              
                const token = response.data.access_token;
                if (token === undefined) {
                    return toast({
                        title: 'Error',
                        description: 'User does not exist.',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                    });
                }
                localStorage.setItem('token', token);
                setFormState({
                    username: '',
                    password: ''
                }
                
                );
                navigate('/profile');
                toast({
                    title: 'Successfully logged in.',
                    description: `Welcome back ${formState.username}!`,
                    status: 'success',
                    duration: 2000,
                    position: 'top-left',
                    isClosable: true,
                })            
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Unable to log in.',
                status: 'error',
                duration: 2000,
            });
        }
    }


    return (
        <Stack>
              <Text mx='auto' pt='3em' fontSize='3xl' className='verse'>Log in to your Account</Text>
            <Center>
              
                <FormControl isRequired
                    display="flex"
                    flexDirection="column" w='65%' mt="3em"
                >
                    <FormLabel>Username</FormLabel>
                    <Input
                        className="input"
                        id="login-username"
                        placeholder="Username"
                        variant='filled'
                        type="text"
                        name="username"
                        value={formState.username}
                        onChange={handleChange}
                    />
                    <FormLabel mt={4}>Password</FormLabel>
                    <InputGroup>
                    <Input
                        className="input"
                        id="login-password"
                        placeholder="Password"
                        variant='filled'
                        type={show ? 'text' : 'password'}
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <InputRightElement width='4.5rem'>
                            <Button 
                            h='1.75rem' 
                            size='sm' 
                            backgroundColor='#371236'
                            _hover={{ bg: '#F7F9F7', color: 'black' }}
                            color='white' 
                            onClick={handlePasswordClick}>
                                {show ? 'Hide' : 'Show'}
                            
                            </Button>
                        </InputRightElement>
                    </InputGroup>
      
                    <Center>
                        <Button m={8} 
                         size='lg'
                        color='white'
                        width='200px'
                        backgroundColor='#371236' 
                        _hover={{ bg: '#F7F9F7', color: 'black' }}
                            type='submit'
                            onClick={handleClick}
                        >
                            Login
                        </Button>
                    </Center>
                </FormControl>
            </Center>
            <Box 
                    display='flex'
                    flexDirection='row'
                    justifyContent='center'
                    gap={10}
                    >
                    <Text
                    lineHeight='35px'
                    >Forgot your password? </Text>
                    <Button
                    onClick={onOpen}
                    size='sm'
                    >Reset Password</Button>
                    </Box>
                    <ForgotPasswordModal isOpen={isOpen} onClose={onClose}/>

        </Stack>
    )

};


export default Login;