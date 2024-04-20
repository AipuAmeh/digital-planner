import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Box,
    Button,
    Text,
    Input
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import { isInvalidEmail } from "../../pages/Signup";

type Props = {
    isOpen: boolean,
    onClose: () => void
}
const ForgotPasswordModal = ({ isOpen, onClose }: Props) => {
    const [email, setEmail] = useState('');
    const toast = useToast();

    const saveEmail = (e: any) => {
        setEmail(e.target.value);

    };

    const submitEmail = () => {
        const invalidEmail = isInvalidEmail(email);
        if (invalidEmail) {
            toast({
                title: "Error",
                description: `Please enter a valid email address.`,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        } else {
            axios
                .post("http://localhost:3001/auth/reset-password/", {
                    email
                })
                .then((response) => {
                    setEmail('');
                    console.log('RESPONSE:', response.data);
                    toast({
                        title: 'Success',
                        description: 'Check your email account for further directions.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    });
                })
                .catch((error) => {
                    if (error.response.data.message === 'email not found') {
                        toast({
                            title: 'Success',
                            description: 'Check your email account for further directions.',
                            status: 'success',
                            duration: 2000,
                            isClosable: true,
                        });
                    } else {
                        toast({
                            title: 'Error',
                            description: error.response.data.message,
                            status: 'error',
                            duration: 2000,
                            isClosable: true
                        });
                    }

                })
        }
        onClose();
    }

    return (

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <Box>
                        <Text mb={4}>Enter the email address associated with your account:</Text>
                        <Input
                            type={'text'}
                            onChange={saveEmail}
                        />

                    </Box>
                </ModalBody>
                <Button mb={4} mx={6} mt={2} onClick={submitEmail}>
                    Send Verification Email
                </Button>
            </ModalContent>
        </Modal>
    )
}

export default ForgotPasswordModal;