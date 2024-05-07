import { useState } from "react";
import { Box, Text, useBreakpointValue, } from "@chakra-ui/react";
import { Stack} from '@chakra-ui/react'
import React from "react";
import TodoModal from "../../components/Todo/TodoModal";
import { useLoaderData } from "react-router-dom";
import SortByMenu from "../../components/Todo/SortByMenu";
import AllTodos from "../../components/Todo/AllTodos";


export type todosObject = {
  id: number,
  todo: string,
  reflectionText: string
  todaysDate: any
  priority: string
  color: string
  completed: boolean
};

const date = new Date().toDateString();

const Todo = () => {
  const data: any = useLoaderData();
  const loadedData = data.todos.data;
  const [todoData, setTodoData] = useState(loadedData)
  const headerMargin = useBreakpointValue({ base: '1.5em', sm: '1em', md: '2em', lg: '3em'});

  return (
    <Box className="App">

      <Text
        className="verse"
        fontSize='3xl'
        mt={headerMargin}
        mb='2em'>{date}</Text>

      <TodoModal setCurrentData={setTodoData}/>
      < SortByMenu />
      <Stack
        className="rendered-todos"
        spacing='6'
        mx='10'>

        {
          todoData.map((todos: todosObject) => {
            return (
              <AllTodos id={todos?.id} priority={todos?.priority} todo={todos?.todo} reflectionText={todos?.reflectionText} todaysDate={todos?.todaysDate} 
              />
            )
          })
        }
      </Stack>
    </Box>

  );
}

export default Todo;