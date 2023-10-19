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
  import { FaUndoAlt } from "react-icons/fa"
  
  import React, { useContext } from "react";
import MyContext from "./ContextApi/MyContext";
import axios from "axios";
import Pagination from "./Pagination";
import { useState } from "react";
  
  const DeletedTable = () => {

    const {globalState, setGlobalState} = useContext(MyContext);
    let data = globalState.deletedBill;
    const [loading, setLoading] = useState(true);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  

 
 
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

     const handleUndo = (el)=>{
    
          axios.post("http://localhost:3000/bills",el)
          .then((res)=>{
            if(res){
                axios.delete(`http://localhost:3000/deleted/${el.id}`);
                fetchDeletedBills();
            }
            else{
                console.error("Post data failed")
            }
          })
          .catch((err)=>{
            console.log(err);
          })
    
  }

  const handleDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:3000/deleted/${id}`)
      .then((res)=>{
        fetchDeletedBills();
      })
    } catch (error) {
      console.log(error);
    }
  }

    return (
      <>
      <TableContainer mt={6} pr={6}>
        <Table variant="striped">
          <Thead backgroundColor={"#3259E4"}>
            <Tr border={"0px solid red"}>
              <Th color={"white"}>#</Th>
              <Th color={"white"}>Company</Th>
              <Th color={"white"}>Created</Th>
              <Th color={"white"}>pdf</Th>
              <Th color={"white"}>Excel</Th>
              <Th color={"white"}>Excel_Detail</Th>
              <Th color={"white"}>Analysis</Th>
              <Th color={"white"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.length > 0 ? currentItems.map((el,i)=>{
                return (
<Tr key={el.id}>
              <Td>{i+1}</Td>
  
              
  
              <Td>{el.client}</Td>
  
              <Td>{el.billCycle}</Td>
              {/* <Td>
                <AiOutlineCheckCircle color="green" size={"2em"} />
              </Td> */}
               <Td>
                <Button
                  size={"sm"}
                  borderRadius={"2rem"}
                  backgroundColor={"#97D0BB"}
                  color={"#416D5B"}
                  leftIcon={<DownloadIcon />}
                >
                  Download
                </Button>
              </Td>
              <Td>
                <Button
                  size={"sm"}
                  borderRadius={"2rem"}
                  backgroundColor={"#97D0BB"}
                  color={"#416D5B"}
                  leftIcon={<DownloadIcon />}
                >
                  Download
                </Button>
              </Td>
              <Td>
                <Button
                  size={"sm"}
                  borderRadius={"2rem"}
                  backgroundColor={"#97D0BB"}
                  color={"#416D5B"}
                  leftIcon={<DownloadIcon />}
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
                  leftIcon={<DownloadIcon />}
                >
                  Download
                </Button>
              </Td>
              <Td>
                {/* <InfoIcon cursor={"pointer"} color={"#3259E4"} /> */}
                <Flex gap={3}>
                <FaUndoAlt onClick={()=>handleUndo(el)} color="#3259e4" cursor={"pointer"} />
                <DeleteIcon onClick={()=>handleDelete(el.id)} cursor={"pointer"}  color={"red"} />

                </Flex>
              </Td>
            </Tr>
                )
            }) : <TableCaption>No Data Found</TableCaption>}
            
  
           
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
  
  export default DeletedTable;
  