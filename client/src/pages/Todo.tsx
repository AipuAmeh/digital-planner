import { useState, useEffect } from "react";
import { FormControl, FormLabel, Input, Modal, ModalContent, ModalOverlay, Spacer, useDisclosure, ModalCloseButton, Checkbox, Flex, Heading, Select } from "@chakra-ui/react";
import { Textarea, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { Card, CardHeader, CardBody, Stack } from '@chakra-ui/react'
import React from "react";

type todosObject = {
    id: number,
    todo: string,
    reflectionText: string
    todaysDate: any
    priority: string
    color: string
  };

const Todo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [todoInput, setTodoInput] = useState('');
  const [reflection, setReflection] = useState('');
  const [priority, setPriority] = useState('');


  const [data, setData] = useState<todosObject[]>([]);

  const style = {
    border: {
      'border': 'solid 4px #371236'
    },
  };

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

  const deleteTodo = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/todo/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id: number) => {
    deleteTodo(id);
    setData(data.filter((todoData: todosObject) => todoData.id !== id));
  };

  return (
    <div className="App">
           <Button onClick={onOpen}>Add Task</Button>
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

      <Stack className="rendered-todos" spacing='6' px='2em'>
        {
              data.map((todos: todosObject) => {
                return (
                  <Card 
                  maxW={'100%'}
                  backgroundColor='#FFFFFA' 
                  style={style.border}
                  key={todos?.id} 
                  size={"sm"} 
                  color='black'
                  p='1em' >
                    <CardHeader
                      fontSize='lg'>
                        <Text 
                        fontWeight='800'> Created Date: {todos?.todaysDate}</Text>
                        <Text mt='1em'>{todos?.todo}</Text>
                        </CardHeader>
                    <CardBody
                      fontSize='md'>{todos?.reflectionText}</CardBody>
                        <Flex justify='flex-end'>
                      <Button
                        maxW={'60%'}
                        size={'sm'}
                        _hover={{ bg: '#F7F9F7', color: 'black' }}
                        onClick={() => deleteHandler(todos?.id)}
                        color='black'
                        width='200px'
                        backgroundColor='#CEBACF' >
                          Delete</Button>
                    </Flex>
                  </Card>
                )
              })
            }
      </Stack>       
    </div>
  
  );
}

export default Todo;