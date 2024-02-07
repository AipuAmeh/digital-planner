import { useState, useEffect } from "react";
// import "./App.css";
import { FormControl, FormLabel, Input, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, Stack } from '@chakra-ui/react'
const date = new Date().toDateString();

// want to make form a modal
// want to style page so that day is split into blocks
// on add button modal pops up and you can add todo for that block
// type todosObject = {
//   todo: string,
//   reflectionText: string
//   todaysDate: any;
// };

function TodoModal() {

  const [todoInput, setTodoInput] = useState('');
  const [reflection, setReflection] = useState('');
  const [data, setData] = useState([]);



//   useEffect(() => {
//     axios.get("http://localhost:3001/todo/")
//       .then((response) => {
//         console.log(response);
//         setData(response.data)

//       })
//   }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    return name === 'todo' ? setTodoInput(value) : setReflection(value);
  };


  const handleClick = async () => {
    const response = await axios.post("http://localhost:3001/todo", {
      todo: todoInput,
      reflectionText: reflection
    });

    alert(`Your Todo is ${todoInput}`);
    setTodoInput('');
    setReflection('');
    setData(data);
    console.log(response)
  };

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div >
      <header className="header"></header>
      <main>
        <Center>
        <Button onClick={onOpen}>Open Modal</Button>
          <Modal 
           isOpen={isOpen} onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
            <h2>Today's Date: {date}</h2>
            <ModalCloseButton />
           
            <FormControl>
            <FormLabel className="todo-title">Todo Task</FormLabel>
            <Input
              className="input"
              placeholder="Basic usage"
              type="text"
              name='todo'
              value={todoInput}
              onChange={handleChange}
            />
            </FormControl>
            <FormControl>
            <FormLabel className="todo-title">Intentions</FormLabel>
            <Textarea
              className="todo-text-area"
              placeholder="Here is a sample placeholder"
              name='reflectionText'
              value={reflection}
              onChange={handleChange}
            />
            </FormControl>
            <Spacer />
            <Center>
              <Button
                maxW="md"
                mt="20px"
                className="save-todo"
                colorScheme="teal"
                size="lg"
                type="submit"
                // onClose={onClose}
                onClick={handleClick}
              >
                Save Todo
                
              </Button>
            </Center>
            </ModalContent>
          </Modal>
        </Center>
        {/* <h1>Todos:</h1> */}
        {/* <Center> */}

       
        {/* <Stack className="rendered-todos" spacing='6' maxW='sm'>
        {
          data.map((todos: todosObject) => {
            return (    
                <Card backgroundColor="teal" key={"sm"} size={"sm"} color='white'>
                  <CardHeader fontSize='lg'>Todo: {todos?.todo}</CardHeader>
                  <CardBody fontSize='md'>Intention: {todos?.reflectionText}</CardBody>
                </Card>           
            )
          }) 
        }
          </Stack>
          </Center> */}
      </main>
    </div>
  );
}

export default TodoModal;
