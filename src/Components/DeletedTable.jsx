import {
  Alert,
  Box,
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Input,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import {
  ChatIcon,
  DeleteIcon,
  DownloadIcon,
  NotAllowedIcon,
  QuestionIcon,
  TimeIcon,
} from "@chakra-ui/icons";





import Loader from "./Loader";
import { FaPlane, FaPlus, FaSave } from "react-icons/fa";
import React, { useContext, useEffect } from "react";
import MyContext from "./ContextApi/MyContext";
import axios from "axios";
import Pagination from "./Pagination";
import { useState } from "react";

const DeletedTable = () => {
  const { globalState, setGlobalState, api_domain } = useContext(MyContext);
  let data = globalState.deletedBill;
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchDeletedBills = async () => {
    try {
      let data = await axios.get(`${api_domain}deletedfiles/`);
      setGlobalState({ ...globalState, deletedBill: data.data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUndo = (el) => {};

  const handleDelete = async (id) => {};
  useEffect(() => {
    fetchDeletedBills();
  }, []);

  return (
   
    <>
      
        <TableContainer
          mt={6}
          pr={6}
          boxShadow={"2px 2px 25px #686868"}
          w={"98%"}
          borderRadius={"10px"}
        >
          <Table variant="striped" w={"102%"}>
            <Thead backgroundColor={"#3259E4"} w={"100%"}>
              <Tr border={"0px solid red"} w={"100%"}>
                <Th color={"white"}>Sr. no.</Th>
                <Th color={"white"}>Clients</Th>
                <Th color={"white"}>Carriers</Th>
                <Th color={"white"}>Created</Th>
                <Th color={"white"}>pdf</Th>
                <Th color={"white"}>Summary</Th>
                <Th color={"white"}>Detail</Th>
                <Th color={"white"}>Status</Th>
                <Th color={"white"}>Created By</Th>
                <Th color={"white"}>Remark</Th>

                <Th color={"white"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.length > 0 ? (
                currentItems.map((el, i) => {
                  return (
                    <Tr key={el.id}>
                      <Td>{i + 1}</Td>

                      <Td>{el.client_name}</Td>
                      <Td>{el.carrier_name}</Td>

                      <Td>{el.billCycle_date}</Td>

                      {/* <Td>
              <AiOutlineCheckCircle color="green" size={"2em"} />
            </Td> */}
                      <Td>
                        <a
                          target="_blank"
                          href={`http://3.218.73.237/${el.original_pdf}`}
                          download={el.original_pdf}
                        >
                          <Button
                            size={"s"}
                            padding={"0.4rem"}
                            borderRadius={"1rem"}
                            backgroundColor={"#97D0BB"}
                            color={"#416D5B"}
                            fontSize={"0.6rem"}
                            leftIcon={<DownloadIcon />}
                          >
                            Download
                          </Button>
                        </a>
                      </Td>
                      <Td>
                        {el.status === "Pending" ? (
                          <TimeIcon />
                        ) : (
                          <a
                            href={`http://3.218.73.237/${el.excel_summary}`}
                            download={el.excel_summary}
                          >
                            <Button
                              size={"s"}
                              padding={"0.4rem"}
                              borderRadius={"1rem"}
                              backgroundColor={"#97D0BB"}
                              color={"#416D5B"}
                              fontSize={"0.6rem"}
                              leftIcon={<DownloadIcon />}
                            >
                              Download
                            </Button>
                          </a>
                        )}
                      </Td>
                      <Td>
                        {el.status === "Pending" ? (
                          <TimeIcon />
                        ) : (
                          <a
                            href={`http://3.218.73.237/${el.excel_details}`}
                            download={el.excel_details}
                          >
                            <Button
                              size={"s"}
                              padding={"0.4rem"}
                              borderRadius={"1rem"}
                              backgroundColor={"#97D0BB"}
                              color={"#416D5B"}
                              fontSize={"0.6rem"}
                              leftIcon={<DownloadIcon />}
                            >
                              Download
                            </Button>
                          </a>
                        )}
                      </Td>
                      <Td>{el.status}</Td>
                      <Td>{el.created_by}</Td>
                      <Td>{el.remark}</Td>

                      <Td>
                        {/* <InfoIcon cursor={"pointer"} color={"#3259E4"} /> */}
                        <DeleteIcon
                          onClick={() => handleDelete(el.id)}
                          cursor={"pointer"}
                          ml={4}
                          color={"red"}
                        />
                      </Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td fontWeight={"bold"}>No Data Found</Td>
                </Tr>
              )}
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