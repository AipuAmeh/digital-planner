
import { useLoaderData } from "react-router-dom";
import { Avatar, Box,  Center, Flex, HStack, Input, WrapItem } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react'
import axios from "axios";
import { useState } from "react";
import { CheckIcon, EditIcon} from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import UserDetailsRow from "../components/Profile/UserDetailsRow";

export type Data = {
  email: string,
  password: string,
  username: string
}

type LoaderData = {
  user: {
    email: string,
    password: string,
    username: string
  },
  verseData: string
}

const Profile = () => {
  const loaderData = useLoaderData() as LoaderData;
  const userData = loaderData.user;
  const verse = loaderData.verseData;
  const [data, setData] = useState(userData);


console.log('LOADER DATA:', loaderData);



  // truncate Bible verse and show more upon click
  // add media queries for responsive design
  return (
    <Box>
      <Center display='flex' flexDirection='column'>
        <Text mt='3em' fontSize='3xl'>My Profile</Text>
        <Text fontSize='2xl' pt='3em' px='3em' pb='1em' className="verse" noOfLines={[1, 2, 3]}>{verse}</Text>
<Box  display='flex' className='account-details' w="60%" gap={8} m="0 auto" py={20} >
  <Box>
    <Avatar name={data.username} size='2xl' bg='#371236' color='white'/>
  </Box>
  <Box  w='100%' display='flex' flexDirection='column' gap={3}>
    <UserDetailsRow field="Username" value={data.username} username={data.username} setData={setData}/>
    <UserDetailsRow field="Email" value={data.email} username={data.username} setData={setData}/>
    <UserDetailsRow field="Password" value="********" username={data.username} setData={setData}/>
  </Box>


</Box>
      </Center>

    </Box>

  )
}


export default Profile;