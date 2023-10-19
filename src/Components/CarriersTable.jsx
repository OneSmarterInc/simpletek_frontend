import {
    Alert,
    Box,
    Button,
    Flex,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";
  import { DeleteIcon, DownloadIcon, InfoIcon } from "@chakra-ui/icons";
  import { AlertIcon } from "@chakra-ui/react";
  import { AiOutlineCheckCircle } from "react-icons/ai";
  
  import React, { useContext } from "react";
import MyContext from "./ContextApi/MyContext";
import axios from "axios";
import Pagination from "./Pagination";
import { useState } from "react";
import Loader from "./Loader";
import { useEffect } from "react";
  
  const CarriersTable = () => {

    const [loading, setLoading] = useState(true);


    const {globalState, setGlobalState,api_domain} = useContext(MyContext);
    let data = globalState.carrier
    // console.log(data);
    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


    const fetchCarrier = async()=>{
      try {
        let data = await axios.get(`${api_domain}allcarrier/`);
        //  console.log(data.data);     
        setGlobalState({...globalState, carrier:data.data})  
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

     const deleteCarrier = async(id)=>{
      try {
         console.log(id);
        await axios.delete(`http://localhost:3000/carrier/${id}`)
        .then(()=>{
          fetchCarrier();
        })
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      fetchCarrier();
    },[])

    return (
      <>
      {loading ? <Loader/> :
      <TableContainer w={"100%"} m={"auto"} pr={6} mt={3} >
        <Table variant="striped">
          <Thead backgroundColor={"#3259E4"}>
            <Tr border={"0px solid red"}>
              <Th color={"white"}>#</Th>

              <Th color={"white"}>Carrier Name</Th>
              <Th color={"white"}>Client Name</Th>

              <Th color={"white"}>Created</Th>
              <Th color={"white"}>Status</Th>
              <Th color={"white"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
          {currentItems.length>0 ? currentItems.map((el,i)=>{
                return (
                <Tr>
                <Td>{i+1}</Td>
                <Td>{el.name}</Td>
                <Td>{el.client}</Td>

                <Td>08-31-2023</Td>
                <Td>
                  <AiOutlineCheckCircle color="green" size={"2em"} />
                </Td>
                <Td>
                  <DeleteIcon cursor={"pointer"} ml={4} color={"red"} onClick={()=>deleteCarrier(el.id)}/>
                </Td>
              </Tr>
              )
            }):<TableCaption>No Data Found</TableCaption>}

             
            </Tbody>
        </Table>
      </TableContainer>
      }
       <Pagination
       itemsPerPage={itemsPerPage}
       totalItems={data.length}
       currentPage={currentPage}
       onPageChange={handlePageChange}
     />
     </>
    );
  };
  
  export default CarriersTable;
  