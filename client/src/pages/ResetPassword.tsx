import { Box, Button, Center, FormControl, FormLabel, Input, InputGroup, Text, InputRightElement, Stack, FormErrorMessage } from "@chakra-ui/react";
import React, { useState } from 'react';
import { useParams } from "react-router-dom";


const ResetPassword = () => {
    const { id, token } = useParams();
    console.log(id, token);
    const [show, setShow] = React.useState(false);
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const [submitPassword, setSubmitPassword] = useState(false);
    const [submitSecondPassword, setSubmitSecondPassword] = useState(false);

    const isErrorPassword = password === "" && submitPassword;
    const isErrorSecondPassword = password !== secondPassword && submitSecondPassword;

 

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
        // setPassword('');
        // setSecondPassword('');
    }
    const showPasswordBtn = () => setShow(!show);
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
                            type={show ? 'text' : 'password'}
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                        />
                       {!isErrorPassword ? null : (
                            <FormErrorMessage>
                                Password is required.
                            </FormErrorMessage>
                        )}
                    </InputGroup>
                </FormControl>
        <FormControl  isInvalid={isErrorSecondPassword} isRequired>
                        <FormLabel mt={4}>Re-enter Password</FormLabel>
                    <InputGroup display='flex' flexDirection='column'>
                        <Input
                            className="input"
                            id="login-password"
                            placeholder="Password"
                            type={show ? 'text' : 'password'}
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