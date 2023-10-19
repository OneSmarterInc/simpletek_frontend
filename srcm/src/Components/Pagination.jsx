import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const pageNumbers = Math.ceil(totalItems / itemsPerPage);

  // Create an array of page numbers to display
  const pages = [];
  for (let i = 1; i <= pageNumbers; i++) {
    pages.push(i);
  }

  // Define the number of page numbers to display on each side of the current page
  const displayRange = 2; // Adjust as needed

  // Calculate the start and end of the displayed page numbers
  const startPage = Math.max(1, currentPage - displayRange);
  const endPage = Math.min(pageNumbers, currentPage + displayRange);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageNumbers) {
      onPageChange(newPage);
    }
  };

  return (
    <Flex justify="center" align="center" mt={4}>
      <Box>
        <Button
          colorScheme="teal"
          size="sm"
          isDisabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
      </Box>
      <Box mx={4}>
        {pages.map((page) => (
          <Button
            key={page}
            colorScheme={currentPage === page ? "teal" : "gray"}
            size="sm"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}
      </Box>
      <Box>
        <Button
          colorScheme="teal"
          size="sm"
          isDisabled={currentPage === pageNumbers}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </Box>
    </Flex>
  );
};

export default Pagination;
