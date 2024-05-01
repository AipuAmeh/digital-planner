import {Card, CardBody, CardHeader, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import { todosObject } from "../../pages/Todo";
import CompletedCheckBox from "./CompletedCheckBox";
import EditTodoModal from "./EditTodoModal";
import { DeleteIcon } from "@chakra-ui/icons";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


type AllTodoProps = {
    id: number,
    priority: string,
    todo: string,
    reflectionText: string,
    todaysDate: any,
}

const style = {
    border: {
      'border': 'solid 4px #371236'
    },
  };

const AllTodos = ({ id, priority, todo, reflectionText, todaysDate }: AllTodoProps) => {
const data:any = useLoaderData();
const loadedData = data.todos.data;
const [todoData, setTodoData] = useState(loadedData);


const deleteTodo = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/todo/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id: number) => {
    deleteTodo(id);
    setTodoData(loadedData.filter((todoData: todosObject) => todoData.id !== id));
    window.location.reload();
  };

return (
    <Stack
    className = 'rendered-todos'
    spacing={6}
    mx={10}>
           <Card
                overflow='hidden'
                backgroundColor='#FFFFFA'
                style={style.border}
                key={id}
                size={{base: 'xs', sm: 'xs', md: 'sm', lg: 'sm'}}
                color='black'
                pb='1em'>
                <CardHeader
                  className='card-header'
                  display='flex'
                  alignContent='flex-end'
                  fontSize='lg'
                  pt={{base: '1em', sm: '1em'}}>
                   <CompletedCheckBox 
                   id={id} 
                   setData={setTodoData}/>
                  <Text
                    fontWeight='800'
                  > {todaysDate}</Text>
                  <Spacer></Spacer>
                  <Text
                  className='priority'
                    color={priority === 'Extremely Important!' ? "red" : priority === 'Coming soon.' ? "orange" : "green"}
                    mr='1em'
                    fontWeight='700'>{priority}</Text>
                </CardHeader>
                <CardBody
                  fontSize='md'>
                  <Text my='10px'>{todo}</Text>
                  <Text>
                    {reflectionText}
                  </Text>
                
                </CardBody>
                  <Flex
                gap='3'
                flexDirection='row'
                justify={{base: 'center', sm: 'center', md:'flex-end', lg: 'flex-end'}}
                mr={{base: '0', sm: '0', md: '2em', lg: '2em'}}
              >
                 <EditTodoModal id={id}/>
                  <DeleteIcon 
                  boxSize={6}
                  color='#371236'
                  onClick={() => deleteHandler(id)}
                  cursor='pointer'
              
                  />
                 
             </Flex>
                </Card>
        
    </Stack>
)
}

export default AllTodos;