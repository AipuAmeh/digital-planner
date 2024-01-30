import { useState, useEffect } from "react";
import "./App.css";
import { Input, Spacer, Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { Card, CardHeader, CardBody, Stack } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import { error } from "console";
// import TodoModal from "./components/TodoModal";
const date = new Date().toDateString();

// want to make form a modal
// want to style page so that day is split into blocks
// on add button modal pops up and you can add todo for that block
type todosObject = {
  id: number,
  todo: string,
  reflectionText: string
  todaysDate: any;
};

function App() {

  const [todoInput, setTodoInput] = useState('');
  const [reflection, setReflection] = useState('');
  const [data, setData] = useState([]);
  const [updatedTodo, setUpdates] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/todo/")
      .then((response) => {
        console.log(response);
        setData(response.data)
      })
  }, []);

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
    console.log(response)
  };

  const deleteTodo = async (id: number ) => {
    try {
      const response = await axios.delete(`http://localhost:3001/todo/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id: number) => {
    deleteTodo(id);
    setData(data.filter((todoData: todosObject ) => todoData.id !== id))
  };

  return (
    <div className="App">
      <header className="header"></header>
      <main>
        <Center>
          <form 
            onSubmit={handleClick}
            className="todo-form">
            <h2>Today's Date: {date}</h2>
            <h2 className="todo-title">Todo Task</h2>
            <Input
              className="input"
              placeholder="Basic usage"
              type="text"
              name='todo'
              value={todoInput}
              onChange={handleChange}
            />
            <h3 className="todo-title">Intentions</h3>
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
                maxW="md"
                mt="20px"
                className="save-todo"
                colorScheme="teal"
                size="lg"
                type="submit"
              >
                Save Todo
              </Button>
            </Center>
          </form>
        </Center>
        <h1>Todos:</h1>
        <Center>

      
        <Stack className="rendered-todos" spacing='6' maxW='sm'>
        {
          data.map((todos: todosObject) => {
            return (   
                <Card backgroundColor="teal" key={todos?.id} size={"sm"} color='white' >
                  <CardHeader 
                  fontSize='lg'>Todo: {todos?.todo}</CardHeader>
                  <CardHeader 
                  onChange={(e:any) => setReflection(e.target.value)}
                  fontSize='md'>Intention: {todos?.reflectionText}</CardHeader>
                  <Center>
                  <Button 
                  maxW={'50%'}
                  size={'sm'}
                  onClick={() => deleteHandler(todos?.id)}
                  colorScheme='blue'>Delete</Button>
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

export default App;
