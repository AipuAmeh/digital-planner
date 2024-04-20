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
import { useState } from "react";

type Props = {
    isOpen: boolean,
    onClose: () => void
}
const ForgotPasswordModal = ({ isOpen, onClose }: Props) => {
    const [email, setEmail] = useState('');

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
                        />

                    </Box>
                </ModalBody>
                <Button mb={4} mx={6} mt={2} onClick={onClose}>
                    Send Verification Email
                </Button>
            </ModalContent>
        </Modal>
    )
}

export default ForgotPasswordModal;