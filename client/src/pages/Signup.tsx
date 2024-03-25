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
import PasswordChecklist from "react-password-checklist";
import React from 'react';



const Signup = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [show, setShow] = React.useState(false);

    const handlePasswordClick = () => setShow(!show);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
// show password checklist once input is clicked

    const handleClick = async () => {
        try {
            if (formState.username === "" || formState.email === "" || formState.password === " ") {
                return toast({
                    title: 'Error',
                    description: 'Please create an account.',
                    status: 'error',
                    duration: 2000,
                });;
            } else {
                const response = await axios.post("http://localhost:3001/auth/signup", {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password
                })

                console.log('MY RESPONSE', response);
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
                })

                navigate('/todo');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            console.log(formState);
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
            <Text mx='auto' pt='3em' fontSize='3xl'>Create an Account</Text>
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
                            onChange={handleChange}/>
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
                    <PasswordChecklist
                            rules={["capital", "specialChar", "minLength", "number"]}
                            minLength={8}
                            value={formState.password}
                        />
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