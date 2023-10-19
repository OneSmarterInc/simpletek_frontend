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
  import { AiFillFilePdf, AiOutlineCheckCircle } from "react-icons/ai";
  
  import React, { useContext } from "react";
import MyContext from "./ContextApi/MyContext";
import axios from "axios";
import Pagination from "./Pagination";
import { useState } from "react";
  
  const ArchiveTable = () => {
    
    const {globalState, setGlobalState} = useContext(MyContext);
    
    let data = globalState.archive;
    // console.log(data);
    const [loading, setLoading] = useState(true);


    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


     const deleteArchive = async(id)=>{
      try {
        //  console.log(id);
        await axios.delete(`http://localhost:3000/archive/${id}`)
      } catch (error) {
        console.log(error);
      }
    }
   
    return (
      <>
      <TableContainer mt={6} pl={6} pr={6}>
        <Table variant="striped">
          <Thead backgroundColor={"#3259E4"}>
            <Tr border={"0px solid red"}>
              <Th color={"white"}>#</Th>
              <Th color={"white"}>Company</Th>
              <Th color={"white"}>Created</Th>
              <Th color={"white"}>Archived</Th>
              <Th color={"white"}>file</Th>
              <Th color={"white"}>Action</Th>
            </Tr>
          </Thead>
              
          <Tbody>
            {currentItems.length > 0 ? currentItems.map((el)=>{
              return (
<Tr>
              <Td>{el.id}</Td>
              <Td>{el.name}</Td>
              <Td>08-31-2023</Td>
              <Td>
                <Button
                  size={"sm"}
                  borderRadius={"2rem"}
                  backgroundColor={"#97D0BB"}
                  color={"#416D5B"}
                  leftIcon={<AiFillFilePdf />}
                >
                  Download
                </Button>
              </Td>
              <Td>
                <Button
                  size={"sm"}
                  borderRadius={"2rem"}
                  backgroundColor={"#DCBBBC"}
                  color={"#CA595E"}
                  leftIcon={<AiFillFilePdf />}
                >
                  Download
                </Button>
              </Td>
              <Td>
                {/* <InfoIcon cursor={"pointer"} color={"#3259E4"} /> */}
                <DeleteIcon onClick={()=>deleteArchive(el.id)} cursor={"pointer"} ml={4} color={"red"} />
              </Td>
            </Tr>
              )
            }):<TableCaption>No Data Found</TableCaption>}
            
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
       itemsPerPage={itemsPerPage}
       totalItems={data.length}
       currentPage={currentPage}
       onPageChange={handlePageChange}
     />
     </>
    );
  };
  
  export default ArchiveTable;
  