import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import { Box, IconButton, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
    field: string,
    value: string,
    username: string,
}; 

const UserDetailsRow = ({field, value, username }: Props) => {
    const [updateField, setUpdates] = useState(false);
    const [valueState, setValueState] = useState(value);

    const onChange = (e:any) => {
        setValueState(e.target.value);
    };

    const onClickEdit = () => {
        setUpdates(!updateField);
    };

    const onClickCheck = () => {
        const token = localStorage.getItem('token');
        console.log('TOKEN:', token);  
        console.log('USERNAME:', username);    
        setUpdates(!updateField);   
         axios.post("http://localhost:3001/auth/change-account-details/", {
        username,
           field: field.toLowerCase(),
           value: valueState
        }, {
            headers: { Authorization: `Bearer ${token}` }
          }).then((response) => {
            console.log("RESPONSE:", response.data);
          })
    }

    return (
        <Box display='flex' gap={2}>
        <Text flex={1} lineHeight='32px'>{field}:</Text>
        { updateField ? 
        <>
        <Input value={valueState} flex={1} h='32px' onChange={onChange}/>  
         </> :
        <> 
        <Text flex={1} lineHeight='32px'>{valueState}  </Text> </> }
        <IconButton aria-label='Edit Username'  icon={updateField ? <CheckIcon/> : <EditIcon />} size='sm' 
        onClick={updateField ? onClickCheck : onClickEdit}
        />
      </Box>
    )
}

export default UserDetailsRow;