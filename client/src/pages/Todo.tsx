import { useState } from "react";
import { Box, Text, useBreakpointValue, } from "@chakra-ui/react";
import { Stack} from '@chakra-ui/react'
import React from "react";
import TodoModal from "../components/Todo/TodoModal";
import { useLoaderData } from "react-router-dom";
// commenting out checkbox until working again
import CompletedCheckBox from "../components/Todo/CompletedCheckBox";
import SortByMenu from "../components/Todo/SortByMenu";
import AllTodos from "../components/Todo/AllTodos";


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



// when checkbox is clicked, task is 
// placed in new array, shown when toggled
const completedTodos = [];
for (let i = 0; i < todoData.length; i++) {
  if (todoData[i].completed === true) {
    completedTodos.push(todoData[i]);
  }
}
completedTodos.forEach(item => {
  const index = todoData.indexOf(item);
  if (index !== -1) {
    todoData.splice(index, 1);
  }
});
loadedData.push(...completedTodos);
// instead of creating new component for completed todos, only loop through completed todos
// make separate loops for all sorting elements
console.log('COMPLETED TODOS ARRAY', completedTodos);
console.log('TODO DATA', todoData);
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