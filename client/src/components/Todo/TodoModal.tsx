import { useState } from "react";
import { Flex, FormControl, FormLabel, Input, Spacer, useDisclosure, Radio, RadioGroup } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react'
import React from "react";

type todosObject = {
  id: number,
  todo: string,
  reflectionText: string
  todaysDate: any
  priority: string
  color: string
};

type Props = {
setCurrentData: React.Dispatch<React.SetStateAction<todosObject>>
}

function TodoModal({ setCurrentData} : Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [todoInput, setTodoInput] = useState('');
  const [reflection, setReflection] = useState('');
  const [priority, setPriority] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    return name === 'todo' ? setTodoInput(value) : setReflection(value);
  };

  const handlePriorityChange = (priority: string) => {
    setPriority(priority);

  };

  const handleClick = async () => {
    const token = localStorage.getItem('token');
    try {
      if (reflection.trim() === '') {
        setError(true);
      } else {
        setError(false);
      };
      const response = await axios.post("http://localhost:3001/auth/create-todo", {
        todo: todoInput,
        reflectionText: reflection,
        priority: priority
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('RESPONSE DATA:', response.data);
      setCurrentData(response.data);
      setTodoInput('');
      setReflection('');
      window.location.reload();
  


    } catch (error) {
      console.error(error)
    }
  };


  return (
    <div className="App">
      <Button
        className='todo-modal-btn'
        size='lg'
        onClick={onOpen}
        mb='5em'
        backgroundColor='#371236'
        _hover={{ bg: '#F7F9F7', color: 'black' }}
        color='white'>Add Task</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent pb={5}>
          <Center>
            <FormControl
              w='65%'
              pt="5em"
              className="todo-card">
              <FormLabel>Task</FormLabel>
              <Input
                className="input"
                placeholder="What do you want to do..."
                type="text"
                name='todo'
                value={todoInput}
                onChange={handleChange}
              />
              <FormLabel
                mt={4}>Intentions</FormLabel>
              <Textarea
                className="todo-text-area"
                placeholder="Why do you want to do it..."
                name='reflectionText'
                value={reflection}
                onChange={handleChange}
              />
              {error && <p style={{ color: 'red' }}>Be Intentional!</p>}
              <Spacer />
              <Flex flexDirection='column'>
                <FormLabel mt={4}>Priority</FormLabel>
                <RadioGroup
                  display='flex'
                  flexDirection='column'
                  onChange={handlePriorityChange}
                  value={priority}
                >
                  <Radio
                    size='md'
                    name='Extremely Important!'
                    value="Extremely Important!"
                  >
                    Extremely Important!
                  </Radio>
                  <Radio
                    size='md'
                    name='Coming soon.'
                    value="Coming soon."
                  >
                    Coming soon.
                  </Radio>
                  <Radio
                    size='md'
                    name='Not Urgent.'
                    value="Not Urgent."
                  >
                    Not Urgent.
                  </Radio>
                </RadioGroup>
              </Flex>
              <Center>
                <Button
                  mt="20px"

                  className="save-todo"
                  backgroundColor='#371236'
                  _hover={{ bg: '#F7F9F7', color: 'black' }}
                  color='white'
                  size="md"
                  type="button"
                  onClick={handleClick}
                >
                  Save Todo
                </Button>
                <ModalCloseButton />
              </Center>
            </FormControl>
          </Center>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default TodoModal;
