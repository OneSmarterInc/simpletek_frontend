import React, { useContext, useEffect } from 'react'

import ClientsTable from '../Components/ClientsTable'

import { Box,Flex,Img,Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ClientsModal from '../Components/ClientsModal';
import axios from 'axios';
import MyContext from '../Components/ContextApi/MyContext';
import { NavBar } from '../Components/NavBar';
import SideBar from '../Components/SideBar';
import DeletedTable from '../Components/DeletedTable';
import home from "../Images/home.png";

const DeletedList = () => {

    const {globalState, setGlobalState} = useContext(MyContext);
 
 
    const fetchDeletedBills = async()=>{
      try {
         let data =  await axios.get("http://localhost:3000/deleted");
        // console.log(data);
        // console.log(data.data);
         setGlobalState({...globalState, deletedBill:data.data})
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(()=>{
        fetchDeletedBills();
    },[])

  return (
    <>
     <NavBar/>
    
    <Box bg={'#f2f2f2'}>
      
        
        <Flex>
        <SideBar/>
            <Box w={'85%'} paddingTop={'30px'} marginLeft={'30px'}>

            <Box>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Box>
                <Flex gap={'15px'} alignItems={'center'}>
              <Text fontSize={'30px'} fontWeight={'600'}>Deleted Clients</Text>
              {/* <Button bg={'#339900'} color={'white'} _hover={{'bg':'#194c00'}} borderRadius={'50px'} marginTop={'10px'} size={'sm'}> + Add Clients</Button>
               */}
                
              </Flex>
              </Box>
              <Img w={'1.5%'} src={home} marginRight={'100px'}/>
            </Flex>
            </Box>
              <DeletedTable/>
            </Box>
        </Flex>
    </Box>
    </>
  )
}

export default DeletedList