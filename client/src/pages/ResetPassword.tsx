import { Box, Button, Center, FormControl, FormLabel, Input, InputGroup, Text, FormErrorMessage, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import PasswordChecklistComp from "../components/Validation/PasswordChecklist";



const ResetPassword = () => {
    const { id, token } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const [submitPassword, setSubmitPassword] = useState(false);
    const [submitSecondPassword, setSubmitSecondPassword] = useState(false);

    const [showChecklist, setShowChecklist] = useState(false);

    const isErrorPassword = password === "" && submitPassword;
    const isErrorSecondPassword = password !== secondPassword && submitSecondPassword;

 // add password checklist to reset password input
 const showListOnClick = () => {
    setShowChecklist(true);
};

    const onChangePassword = (e: any) => {
        setSubmitPassword(false);
        setSubmitSecondPassword(false);
        setPassword(e.target.value);
    };

    const onChangeSecondPassword = (e: any) => {
        setSubmitSecondPassword(false);
        setSecondPassword(e.target.value);
    };

    const onSubmit = () => {
        console.log('PASSWORD:', password);
        console.log('SECOND PASSWORD:',secondPassword);

        setSubmitPassword(true);
        setSubmitSecondPassword(true);

     axios
     .post("http://localhost:3001/auth/save-new-password/", {
            newPassword: password,
            id,
            token
        })
        .then((response) => {
            console.log('RESPONSE', response.data);
        setPassword('');
        setSecondPassword('');
        navigate('/login');
        toast({
            title: 'Success',
            description: 'Your password has been reset! Please login with your new password',
            status: 'success',
            duration: 2000,
            position: 'top-left',
            isClosable: true,
        })   
        })
        .catch(() => {
            toast({
                title: 'Error',
                description: 'We cannot reset your password at this time. Please start the restart password process again',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        })

    }
    return (
        <Center>
          <Box display='flex' flexDirection='column' alignItems='center' mt='3em' w='65%'>
            <Text pt='3em' fontSize='3xl' className='verse'>Reset Your Password</Text>
                <FormControl isRequired isInvalid={isErrorPassword}>
                <FormLabel mt={4}>Password</FormLabel>
                    <InputGroup display='flex' flexDirection='column'>
                        <Input
                            className="input"
                            id="login-password"
                            placeholder="Password"
                            type={'password'}
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            onClick={showListOnClick}
                        />
                       {!isErrorPassword ? null : (
                            <FormErrorMessage>
                                Password is required.
                            </FormErrorMessage>
                        )}
                    </InputGroup>
                    {showChecklist ?
                        <PasswordChecklistComp password={password} /> : false
                    }
                </FormControl>
        <FormControl  isInvalid={isErrorSecondPassword} isRequired>
                        <FormLabel mt={4}>Re-enter Password</FormLabel>
                    <InputGroup display='flex' flexDirection='column'>
                        <Input
                            className="input"
                            id="login-password"
                            placeholder="Password"
                            type={'password'}
                            name="password"
                            value={secondPassword}
                            onChange={onChangeSecondPassword}
                        />
                        {!isErrorSecondPassword ? null : (
                            <FormErrorMessage>
                                Passwords must match.
                            </FormErrorMessage>
                        )}

                    </InputGroup>
 </FormControl>

                        <Button m={8}
                            size='lg'
                            color='white'
                            width='200px'
                            backgroundColor='#371236'
                            _hover={{ bg: '#F7F9F7', color: 'black' }}
                            type='submit'
                        onClick={onSubmit}
                        >
                            Submit
                        </Button>
        </Box>          
        </Center>


    )
}

export default ResetPassword;