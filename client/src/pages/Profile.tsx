
import { useLoaderData } from "react-router-dom";
import { Avatar, Box,  Center, Flex, HStack, Input, WrapItem } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react'
import axios from "axios";
import { useState } from "react";
import { CheckIcon, EditIcon} from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import UserDetailsRow from "../components/Profile/UserDetailsRow";



const Profile = () => {
  const data: any = useLoaderData();
  const [verse, setVerse] = useState('');
  const [show, setShowState] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

console.log('LOADER DATA:',data);

  const options = {
    method: 'GET',
    url: 'https://labs.bible.org/api/?',
    params: {
      passage: 'votd',
      formatting: 'plain'
    },
    origin: true
  };
  const getBibleVerses = async () => {
    try {
      const verseResponse = await axios.request(options);
      console.log(verseResponse.data);
      setVerse(verseResponse.data);
      return
    } catch (error) {
      console.error(error);
    }
  }
  getBibleVerses();

  const handleNewEditClick = () => {
    setShowState(true);
  };

  const saveEdits = async (id:number) => {
    setShowState(false);
    try {
      const response = await axios.patch(`http://localhost:3001/user/update-user/${id}`, {
        username: username,
        email: email,
        password: password
      });
      console.log('EDITED USER:', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e:any) => {
    const {name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    }

    if (name === 'email') {
      setEmail(value) 
    } else {
      setPassword(value)
    }
  };


  // truncate Bible verse and show more upon click
  // add media queries for responsive design
  return (
    <Box>
      <Center display='flex' flexDirection='column'>
        <Text mt='3em' fontSize='3xl'>My Profile</Text>
        <Text fontSize='2xl' pt='3em' px='3em' pb='1em' className="verse" noOfLines={[1, 2, 3]}>{verse}</Text>
<Box  display='flex' className='account-details' w="60%" gap={8} m="0 auto" py={20} >
  <Box>
    <Avatar name={data.username} size='2xl' bg=' #371236'/>
  </Box>
  <Box  w='100%' display='flex' flexDirection='column' gap={3}>
    <UserDetailsRow field="Username" value={data.username} username={data.username}/>
    <UserDetailsRow field="Email Address" value={data.email} username={data.username}/>
    <UserDetailsRow field="Password" value="********" username={data.username}/>
  </Box>


</Box>
      </Center>

    </Box>

  )
}


export default Profile;