import { useState, useEffect } from "react";
import { FormControl, FormLabel, Input, Modal, ModalContent, ModalOverlay, Spacer, useDisclosure, ModalCloseButton } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { Card, CardHeader, CardBody, Stack } from '@chakra-ui/react'
import React from "react";

const date = new Date().toDateString();

type todosObject = {
    id: number,
    todo: string,
    reflectionText: string
    todaysDate: any;
  };

const Todo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [todoInput, setTodoInput] = useState('');
  const [reflection, setReflection] = useState('');
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

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3001/todo", {
        todo: todoInput,
        reflectionText: reflection
      });
      setTodoInput('');
      setReflection('');
      setData([...data, response.data])   
  
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
    setData(data.filter((todoData: todosObject) => todoData.id !== id))
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
      <ModalContent>
        <Center>
          <FormControl
          w='65%'
          pt="5em"
            className="todo-form">
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
      <Center>
          <Stack className="rendered-todos" spacing='6' maxW='sm'>
            {
              data.map((todos: todosObject) => {
                return (
                  <Card 
                  backgroundColor='#371236' 
                  key={todos?.id} 
                  size={"sm"} 
                  color='white'
                  p='1em' >
                    <CardHeader
                      fontSize='lg'>Todo: {todos?.todo}</CardHeader>
                    <CardBody
                      onChange={(e: any) => setReflection(e.target.value)}
                      fontSize='md'>Intention: {todos?.reflectionText}</CardBody>
                    <Center>
                      <Button
                        maxW={'60%'}
                        size={'sm'}
                        _hover={{ bg: '#F7F9F7', color: 'black' }}
                        onClick={() => deleteHandler(todos?.id)}
                        color='black'
                        width='200px'
                        backgroundColor='#CEBACF' >
                          Delete</Button>
                    </Center>

                  </Card>
                )
              })
            }
          </Stack>
        </Center>
    </div>
  );
}

export default Todo;