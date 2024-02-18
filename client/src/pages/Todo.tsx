import { useState, useEffect } from "react";
import { FormControl, FormLabel, Input, Spacer } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { Card, CardHeader, CardBody, Stack } from '@chakra-ui/react'

const date = new Date().toDateString();

type todosObject = {
    id: number,
    todo: string,
    reflectionText: string
    todaysDate: any;
  };

const Todo = () => {

  const [todoInput, setTodoInput] = useState('');
  const [reflection, setReflection] = useState('');
  const [data, setData] = useState<todosObject[]>([]);
 
  useEffect(() => {
    axios.get("http://localhost:3001/todo/")
      .then((response) => {
        console.log('TODO DATA:', response.data);
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
      console.log(response.data);
      // alert(`Your Todo is ${todoInput}`);
      // setTodoInput('');
      // setReflection('');
      // setData([...data, response.data])   
  
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
      <main>
        <Center>
          <FormControl
          w='65%'
          pt="5em"
            className="todo-form">
            <h2>Today's Date: {date}</h2>
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
                _hover={{ bg: '#B0A3D4' }}
                color='white'
                size="lg"
                type="button"
                onClick={handleClick}
              >
                Save Todo
              </Button>
            </Center>
          </FormControl>
        </Center>
        <h1>Todos:</h1>
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
                        _hover={{ bg: '#B0A3D4' }}
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
      </main>
    </div>
  );
}

export default Todo;