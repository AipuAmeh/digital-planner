import { useState } from "react";
import { Checkbox, Flex, FormControl, FormLabel, Input, Spacer, useDisclosure } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react'
import { EditIcon } from "@chakra-ui/icons";
import React from "react";
import axios from "axios";


type todosObject = {
  id: number,
  todo: string,
  reflectionText: string
  todaysDate: any
  priority: string
  color: string
};

function EditTodoModal(props: { id: number; }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [todoInput, setTodoInput] = useState('');
  const [reflection, setReflection] = useState('');
  const [priority, setPriority] = useState('');
  const [data, setData] = useState<todosObject[]>([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    return name === 'todo' ? setTodoInput(value) : setReflection(value);
  };

  const handlePriorityChange = (e:any) => {
    const {name,  value } = e.target;

    if (name === value) {
      return setPriority(value);
    }

  };
  const editTodoHandler = async(id: number) => {
    try {
      const response = await axios.patch(`http://localhost:3001/todo/${id}`, {
        todo: todoInput,
        reflectionText: reflection,
        priority: priority
      });
      console.log('EDITED RESPONSE:',response.data);
      setTodoInput('');
      setReflection('');
      window.location.reload();
      setData([...data, response.data]);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="App">
         <EditIcon 
                    boxSize={6}
                    color='#371236'
                    cursor='pointer'
                    onClick={onOpen}
                    />
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
            <FormLabel>Todo Task</FormLabel>
            <Input
              className="input"
              placeholder="What do you want to do..."
              type="text"
              name='todo'
              value={todoInput}
              onChange={handleChange}
            />
            <FormLabel mt={4}>Intentions</FormLabel>
            <Textarea
              className="todo-text-area"
              placeholder="Why do you want to do it..."
              name='reflectionText'
              value={reflection}
              onChange={handleChange}
            />
            <Spacer />
            <Flex flexDirection='column'>
            <FormLabel mt={4}>Priority</FormLabel>
            <Checkbox 
            size='md'
            name='Extremely Important!' 
            value="Extremely Important!"   
            onChange={handlePriorityChange}
            >
    Extremely Important!
  </Checkbox>
  <Checkbox 
  size='md'
  name='Coming soon.' 
  value="Coming soon."
  onChange={handlePriorityChange}
  >
    Coming soon.
  </Checkbox>
  <Checkbox 
  size='md'
  name='Not Urgent.' 
  value="Not Urgent."
  onChange={handlePriorityChange}
  >
    Not Urgent.
  </Checkbox>
            </Flex>
            <Center>
              <Button
                width='200px'
                mt="20px"
                
                className="save-todo"
                backgroundColor='#371236' 
                _hover={{ bg: '#F7F9F7', color: 'black' }}
                color='white'
                size="lg"
                type="button"
                onClick={() => editTodoHandler(props.id)}
              >
                Save Changes
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

export default EditTodoModal;