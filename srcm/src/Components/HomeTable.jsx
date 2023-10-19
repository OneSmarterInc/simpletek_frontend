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
import axios from "axios";
import MyContext from "./ContextApi/MyContext";
import Pagination from "./Pagination";
import { useState } from "react";
import Loader from "./Loader";

const HomeTable = ({selectedClient}) => {

  const { globalState, setGlobalState, api_domain } = useContext(MyContext);
  let data = globalState.bills;
   console.log(data);
  const [loading, setLoading] = useState(true);

  // console.log(`${api_domain}processedfiles/`);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const filteredData = selectedClient
    ? data.filter(item => item.client_name === selectedClient)
    : data;

    

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const fetchBills = async () => {
    try {
      let data = await axios.get(`${api_domain}processedfiles/`);
      setGlobalState((globalState) => ({ ...globalState, bills: data.data }))
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // const handleDelete = async (el) => {
  //   try {
  //     await axios.post(`http://localhost:3000/deleted`, el)
  //       .then((res) => {
  //         axios.delete(`http://localhost:3000/bills/${el.id}`)
  //         fetchBills();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${api_domain}delete-client-processed-file/?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle success
        console.log('Record deleted successfully');
        fetchBills();
        // You can update your UI as needed.
      } else {
        // Handle error
        console.error('Failed to delete record');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  useEffect(() => {
    fetchBills();
  }, [])

  return (
    <>
    {loading ? <Loader/> :
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
          {filteredData.length > 0  ? filteredData.map((el, i) => {
            return (
              <Tr key={el.id}>
                <Td>{i + 1}</Td>



                <Td>{el.client_name}</Td>

                <Td>{el.billCycle_date}</Td>
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
                    <a target="_blank" href={`http://3.218.73.237/${el.original_pdf}`} download={el.original_pdf}>
                      Download
                    </a>
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

                  <a target="_blank" href={`http://3.218.73.237/${el.excel_summary}`} download={el.excel_summary}>Download</a>
                
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
                  <a target="_blank" href={`http://3.218.73.237/${el.excel_details}`} download={el.excel_details}>Download</a>
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
                    Start
                  </Button>
                </Td>
                <Td>
                  {/* <InfoIcon cursor={"pointer"} color={"#3259E4"} /> */}
                  <DeleteIcon onClick={() => handleDelete(el.id)} cursor={"pointer"} ml={4} color={"red"} />
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

export default HomeTable;
