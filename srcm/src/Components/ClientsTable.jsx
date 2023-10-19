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

import React, { useContext, useEffect } from "react";
import MyContext from "./ContextApi/MyContext";
import axios from "axios";
import Pagination from "./Pagination"; // Adjust the import path as needed
import { useState } from "react";
import Loader from "./Loader";


const ClientsTable = () => {
  
  const { globalState, setGlobalState, api_domain } = useContext(MyContext);
  let data = globalState.client;
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchClient = async () => {
    try {
      let data = await axios.get(`${api_domain}allclients/`);
      setGlobalState({ ...globalState, client: data.data })
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteClient = async (id) => {
    try {

      await axios.delete(`http://localhost:3000/client/${id}`)
        .then(() => {
          fetchClient();
        })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchClient();
  },[])

  return (
    <>
    {loading ? <Loader/> :
    <TableContainer w={"100%"} m={"auto"} mt={3} pr={6}>
      <Table variant="striped">
        <Thead backgroundColor={"#3259E4"}>
          <Tr border={"0px solid red"}>
            <Th color={"white"}>#</Th>
            <Th color={"white"}>Client Name</Th>
            <Th color={"white"}>Email</Th>
            <Th color={"white"}>Created</Th>
            <Th color={"white"}>Status</Th>
            <Th color={"white"}>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentItems.length > 0 ? currentItems.map((el, i) => {
            return (
              <Tr key={el.id}>
                <Td>{i + 1}</Td>
                <Td>{el.name}</Td>
                <Td>{el.email}</Td>
                <Td>08-31-2023</Td>
                <Td>
                  <AiOutlineCheckCircle color="green" size={"2em"} />
                </Td>
                <Td>
                  {/* <InfoIcon cursor={"pointer"} color={"#3259E4"} /> */}
                  <DeleteIcon onClick={() => deleteClient(el.id)} cursor={"pointer"} ml={4} color={"red"} />
                </Td>
              </Tr>
            )
          }) : <TableCaption>No Data Found</TableCaption>}
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

export default ClientsTable;
