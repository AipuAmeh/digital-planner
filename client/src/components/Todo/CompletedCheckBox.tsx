import { Checkbox } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { todosObject } from "../../pages/Todo";

type Props = {
id: number;
setData: React.Dispatch<React.SetStateAction<todosObject>>
}

const CompletedCheckBox = ({ id, setData }: Props) => {

const completedTodo = async () => {
   axios
   .patch(
    `http://localhost:3001/todo/mark-complete/${id}`
   )
   .then((response) => {
    console.log('RESPONSE:', response.data);
    // newArray.map to show all the completed
    // const newArray = [];
    // newArray.push(response.data);
    // console.log(newArray);
    setData(response.data);
    window.location.reload();
    //     // move completed cards to separate 
    //     // page 
    //     // show toggle for todo and completed


   })
   .catch((error) => {
    console.log(error);
   })
  
    };

    return (
        <Checkbox
        display='flex'
        justifyContent='flex-end' 
        mr='0.5em'
        onChange={completedTodo}>         
        </Checkbox>
    )
};

export default CompletedCheckBox;

