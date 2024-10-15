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
Textarea,
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
import React, { useContext, useEffect } from "react";
import axios from "axios";
import MyContext from "./ContextApi/MyContext";
import Pagination from "./Pagination";
import { useState } from "react";
import Loader from "./Loader";
import { FaPlane, FaPlus, FaSave } from "react-icons/fa";

const HomeTable = ({ selectedClient }) => {
  const { globalState, setGlobalState, api_domain } = useContext(MyContext);
  let data = globalState.bills;
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState({});
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = selectedClient
    ? data.filter((item) => item.client_name === selectedClient)
    : data;

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchBills = async () => {
    try {
      let data = await axios.get(`${api_domain}processedfiles/`);
      setGlobalState((globalState) => ({ ...globalState, bills: data.data }));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${api_domain}delete-client-processed-file/?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Handle success
        console.log("Record deleted successfully");
        fetchBills();
        // You can update your UI as needed.
      } else {
        // Handle error
        console.error("Failed to delete record");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRemarkSubmit = async (id) => {
    const remark = remarks[id] || "";
    try {
      await axios.post(`${api_domain}remarks/`, {
        id: id,
        remark: remark,
      });
      console.log("Remark added successfully!");

      // Show success toast
      toast({
        title: "Success.",
        description: "Remark added successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding remark:", error);

      // Show error toast
      toast({
        title: "Error.",
        description: "Failed to add remark.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                          href={`${api_domain}api/${el.original_pdf}`}
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
                            href={`${api_domain}api/${el.excel_summary}`}
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
                            href={`${api_domain}api/${el.excel_details}`}
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
                      <Td>
                        <InputGroup>
                          <Input
                            minWidth={"120px"}
                            placeholder="Write your remark"
                            defaultValue={el.remark}
                            onChange={(e) => {
                              setRemarks((prevRemarks) => ({
                                ...prevRemarks,
                                [el.id]: e.target.value,
                              }));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.keyCode === 13) {
                                handleRemarkSubmit(el.id);
                              }
                            }}
                          />

                          <InputRightElement>
                            <Button
                              size={"s"}
                              padding={"0.2rem"}
                              borderRadius={"0.1rem"}
                              backgroundColor={"grey"}
                              color={"white"}
                              fontSize={"0.7rem"}
                              onClick={() => handleRemarkSubmit(el.id)}
                            >
                              {" "}
                              <FaPlus />
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </Td>

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
      )}
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
