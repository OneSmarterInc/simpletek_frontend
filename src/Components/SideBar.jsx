import React from 'react';
import { Box,Flex,Heading,Img,Select,Text,Input, Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import file from '../Images/file.png'
import avatar from "../Images/avatar.png"
import archive from "../Images/archive.png"
import signal from "../Images/signal.png"
import lock from "../Images/padlock-unlock.png"


const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = ()=>{
    Cookies.remove('authorized');
    navigate("/login")
  }



  return (
    <Box w={'15vw'} minH={'88vh'} bg={'#cccccc'} textAlign={'justify'} paddingTop={'30px'} paddingLeft={'20px'} >
        
       <Box>
       <Flex alignItems={'center'} gap={'6px'}>
        <Img w={'8%'} src={file}/>
        <Link to={'/'}>
        <Text color={'#3259e4'}>Bills</Text>
        </Link>
        </Flex>
       </Box>
        <br />
        <Box>
        <Flex alignItems={'center'} gap={'6px'}>
        <Img w={'8%'} src={avatar}/>
        <Link to={'/clients'}>
        <Text color={'#3259e4'}>Clients</Text>
        </Link>
        </Flex>
        </Box>
        <br />
        <Box>
        <Flex alignItems={'center'} gap={'6px'}>
        <Img w={'8%'} src={signal}/>
        <Link to={'/carriers'}>
        <Text color={'#3259e4'}>Carriers</Text>
        </Link>
        </Flex>
        </Box>
        <br />
        <Box>
        <Flex alignItems={'center'} gap={'6px'}>
        <Img w={'8%'} src={archive}/>
        <Link to={'/archievelist'}>
        <Text color={'#3259e4'}>Archive List</Text>
        </Link>
        </Flex>
        </Box>
        <br />
        <Box>
        <Flex alignItems={'center'} gap={'6px'}>
        <Img w={'8%'} src={archive}/>
        <Link to={'/deletedlist'}>
        <Text color={'#3259e4'}>Deleted List</Text>
        </Link>
        </Flex>
        </Box>
        <br />
        <Box>
        <Flex alignItems={'center'} gap={'6px'}>
        <Img w={'8%'} src={lock}/>
        <Link to={'/changepassword'}>
        <Text color={'#3259e4'}>Change Password</Text>
        </Link>
        </Flex>
        </Box>
        <br />
        <Box>
        <Flex alignItems={'center'} gap={'6px'}>
        <Img w={'8%'} src={avatar}/>
        <Text color={'#3259e4'} onClick={handleLogout} cursor={'pointer'}>Log Out</Text>
        </Flex>
        </Box>
    
    </Box>
  )
}

export default SideBar