import { useState, useEffect } from "react";
// import "./App.css";
import { Checkbox, Flex, FormControl, FormLabel, Input, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, Stack } from '@chakra-ui/react'
import React from "react";
const date = new Date().toDateString();

// want to make form a modal
// want to style page so that day is split into blocks
// on add button modal pops up and you can add todo for that block
// type todosObject = {
//   todo: string,
//   reflectionText: string
//   todaysDate: any;
// };
type todosObject = {
  id: number,
  todo: string,
  reflectionText: string
  todaysDate: any
  priority: string
  color: string
};

function TodoModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [todoInput, setTodoInput] = useState('');
  const [reflection, setReflection] = useState('');
  const [priority, setPriority] = useState('');


  const [data, setData] = useState<todosObject[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/todo/")
      .then((response) => {
        setData(response.data)
      })
  }, []);

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

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3001/todo", {
        todo: todoInput,
        reflectionText: reflection,
        priority: priority
      });

      setTodoInput('');
      setReflection('');
      setData([...data, response.data]);
      
  
    } catch (error) {
      console.log('DATA', data);
      console.error(error)
    }
  };


  return (
    <div className="App">
           <Button onClick={onOpen}>Add Event</Button>
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
              placeholder="Basic usage"
              type="text"
              name='todo'
              value={todoInput}
              onChange={handleChange}
            />
            <FormLabel mt={4}>Intentions</FormLabel>
            <Textarea
              className="todo-text-area"
              placeholder="Here is a sample placeholder"
              name='reflectionText'
              value={reflection}
              onChange={handleChange}
            />
            <Spacer />
            <Flex flexDirection='column'>
            <FormLabel mt={4}>Priority</FormLabel>
            <Checkbox 
            size='md'
            name='High' 
            value="High"
            
            onChange={handlePriorityChange}
            >
    High Priority
  </Checkbox>
  <Checkbox 
  size='md'
  name='Medium' 
  value="Medium"
  onChange={handlePriorityChange}
  >
    Medium Priority
  </Checkbox>
  <Checkbox 
  size='md'
  name='Low' 
  value="Low"
  onChange={handlePriorityChange}
  >
    Low Priority
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
