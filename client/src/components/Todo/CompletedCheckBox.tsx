import { Checkbox } from "@chakra-ui/react";
import axios from "axios";
import { todosObject } from "../../pages/TodoPages/Todo";

type Props = {
id: number;
setData: React.Dispatch<React.SetStateAction<todosObject>>;
}

const CompletedCheckBox = ({ id, setData}: Props) => {

const completedTodo = async () => {
   axios
   .patch(
    `http://localhost:3001/todo/mark-complete/${id}`
   )
   .then((response) => {
    setData(response.data);
   })
   .catch((error) => {
    console.error(error);
   })
  
    };

    return (
        <Checkbox
        display='flex'
        justifyContent='flex-end' 
        mx={2}
        onChange={completedTodo}>         
        </Checkbox>
    )
};

export default CompletedCheckBox;

