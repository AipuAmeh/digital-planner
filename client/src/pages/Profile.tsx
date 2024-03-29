
import { useLoaderData } from "react-router-dom";
import { Avatar, Box,  Center, useBreakpointValue } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react'
import { useState } from "react";
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
  const fontSize = useBreakpointValue({ base: 'sm', sm: 'md', md: 'lg', lg: 'xl', xl: '2xl' });
  const versePadding = useBreakpointValue({ base: '20', sm: '10em', md: '20px', lg: '30px'});
  const accountPadding = useBreakpointValue({ base: '2.5em', sm: '2.5em', md: '3em', lg: '4em'})
  const width = useBreakpointValue({ base: '80%', sm: '80%', md: '60%', lg: '60%'})
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
        <Text fontSize={fontSize} py='2em' px='3em' pb={versePadding} className="verse" noOfLines={[1, 2, 3]} flex={2} overflow={"visible"}  >{verse}</Text>
        
<Box  display='flex' className='account-details' w={width} gap={8} m="0 auto" py={accountPadding} >
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