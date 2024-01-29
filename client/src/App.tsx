import { useState, ReactNode, useEffect } from "react";
import "./App.css";
import { Input, Spacer, Text } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
// import { Flex } from '@chakra-ui/react'
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { JSX } from "react/jsx-runtime";

// want to make form a modal
// want to style page so that day is split into blocks
// on add button modal pops up and you can add todo for that block
type todosObject = {

  // map(arg0: (todo: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  todo: string,
  reflectionText: string
};




function App() {

  const [todoInput, setTodoInput] = useState('');
  const [reflection, setReflection] = useState('');
  // const [todo, saveTodo] = useState([]);
  // const [reflectionText, saveReflection] = useState([]);
  const [data, setData] = useState([]);
  // const todoInfo: todos = {
  //   todo: todoInput,
  //   reflectionText: reflection,
  //   map: function (arg0: (todo: any) => JSX.Element): ReactNode {
  //     throw new Error("Function not implemented.");
  //   }
  // }
  useEffect(() => {
    axios.get("http://localhost:3000/todo/")
      .then((response) => {
   console.log(response);
   setData(response.data)
      })
      // .then(() => {
      //   setData(data)
      // })


  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    return name === 'todo' ? setTodoInput(value) : setReflection(value);
  };


  const handleClick = async () => {
    const response = await axios.post("http://localhost:3000/todo", {
      todo: todoInput,
      reflectionText: reflection
    });

    alert(`Your Todo is ${todoInput}`);
    setTodoInput('');
    setReflection('');
    console.log('RESPONSE', response)
    console.log(todoInput);
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Center>
          <form
            onSubmit={handleClick}
            className="todo-form">
            <h2>Today's Date: </h2>
            <h2 className="todo-title">Todo Task</h2>
            <Input
              className="input"
              placeholder="Basic usage"
              type="text"
              name='todo'
              value={todoInput}
              onChange={handleChange}
            />
            <h3 className="todo-title">Reflection</h3>
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
{
          data.map((todos: todosObject) => {
            return (
              <div className="rendered-todos">
                <Text fontSize='2xl'>{todos?.todo}</Text>
                <Text fontSize='2xl'>{todos?.reflectionText}</Text>
              </div>           
            )
          })
        }
      </main>
    </div>
  );
}

export default App;
