import {
    FormControl,
    FormLabel,
    FormHelperText,
    Button,
    Stack,
    Center,
    Input,
    Text,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import PasswordChecklistComp from '../components/Validation/PasswordChecklist';
import React from 'react';

export const isInvalidEmail = (email: string) => {
    const emailFormat = /\S+@\S+\.\S+/;
    if (email.match(emailFormat) && email.length > 0) {
        return false;
    } else {
        return true;
    }
};

const Signup = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [show, setShow] = React.useState(false);
    const [showChecklist, setShowChecklist] = useState(false);

    const handlePasswordClick = () => setShow(!show);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const showListOnClick = () => {
        setShowChecklist(true);
    };
    // what type is e ??
    // React.MouseEvent<HTMLButtonElement> e 
    const handleClick = async (e: any) => {
        try {
            const { name } = e.target;
            if (name === 'email') {
                const invalidEmail = isInvalidEmail(formState.email);
                if (invalidEmail) {
                    toast({
                        title: "Error",
                        description: `Please enter a valid email.`,
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                    });
                    return;
                }
            } 
            else if (formState.username === "" || formState.email === "" || formState.password === " ") {
                return toast({
                    title: 'Error',
                    description: 'Please create an account.',
                    status: 'error',
                    duration: 2000,
                });;
            }
            else {
                const existingUser = await axios.get("http://localhost:3001/user");
                for (let i = 0; i < existingUser.data.length; i++) {
                    if (existingUser.data[i].username === formState.username) {
                        return toast({
                            title: 'Error',
                            description: 'Username already exists.',
                            status: 'error'
                        });
                    } else if (existingUser.data[i].email === formState.email) {
                        return toast({
                            title: 'Error',
                            description: 'Email already exists.',
                            status: 'error'
                        });
                    }
                }
                const response = await axios.post("http://localhost:3001/auth/signup", {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password
                })
                const token = response.data.access_token;
                localStorage.setItem('token', token);
                setFormState({
                    username: '',
                    email: '',
                    password: ''
                });
                toast({
                    title: 'Successfully created an account.',
                    description: `Welcome ${formState.username}!`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                navigate('/profile');
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Unable to create an account.',
                status: 'error',
                duration: 2000,
            });
        }
    };

    return (
        <Stack>
            <Text mx='auto' pt='3em' fontSize='3xl' className='verse'>Create an Account</Text>
            <Center>
                <FormControl isRequired
                    display="flex"
                    flexDirection="column"
                    w='65%'
                    pt="3em"
                >
                    <FormLabel>Username</FormLabel>
                    <Input
                        className="input"
                        id="signup-username"
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={formState.username}
                        onChange={handleChange} />

                    <FormLabel mt={4}>Email</FormLabel>
                    <Input
                        className="input"
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={formState.email}
                        onChange={handleChange} />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                    <FormLabel mt={4}>Password</FormLabel>
                    <InputGroup>
                        <Input
                            className="input"
                            id="signup-password"
                            placeholder="Password"
                            type={show ? 'text' : 'password'}
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                            onClick={showListOnClick}
                            mb={2}
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
                    {showChecklist ?
                        <PasswordChecklistComp password={formState.password} /> : false
                    }
                    <Center>
                        <Button m={8}
                            size='lg'
                            type='submit'
                            color='white'
                            width='200px'
                            backgroundColor='#371236'
                            _hover={{ bg: '#F7F9F7', color: 'black' }}
                            onClick={handleClick}
                        >
                            Sign up
                        </Button>
                    </Center>

                </FormControl>
            </Center>


        </Stack>
    )
}

export default Signup;