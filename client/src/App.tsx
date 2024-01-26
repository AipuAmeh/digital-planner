// import { useState, useEffect } from "react";
import "./App.css";
import { Input, Spacer } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
// import { Flex } from '@chakra-ui/react'
import { Center } from "@chakra-ui/react";
import axios from "axios";

// want to make form a modal
// want to style page so that day is split into blocks
// on add button modal pops up and you can add todo for that block

function App() {


  // const [data, setData] = useState({
  //   todo: "",
  //   reflectionText: "",
  // });

  // const handleChange = (e:any) => {
  //   const value = e.target.value;
  //   setData({ ...data, [e.target.todo]: value });
  // };

  // const handleFormSubmit = async (e:any) => {
  //   e.preventDefault();

  //   try {
  //     const response = axios.post("/todo", data);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  const handleClick = async () => {
    const response = await axios.get("http://localhost:3000")
    console.log('RESPONSE', response)
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Center>
          <form className="todo-form">
            <h2>Today's Date: </h2>
            <h2 className="todo-title">Todo Task</h2>
            <Input 
            className="input" 
            placeholder="Basic usage"
            type="text"
            // value={data.todo}
            // onChange={handleChange} 
            />
            <h3 className="todo-title">Reflection</h3>
            <Textarea
              className="todo-text-area"
              placeholder="Here is a sample placeholder"
              // value={data.reflectionText}
              // onChange={handleChange}
            />
            <Spacer />
            <Center>
              <Button
                mt="20px"
                className="save-todo"
                colorScheme="teal"
                size="lg"
                onClick={handleClick}
              >
                Save Todo
              </Button>
            </Center>
          </form>
        </Center>
      </main>
    </div>
  );
}

export default App;
