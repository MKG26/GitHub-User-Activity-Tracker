import { Box, Heading, Text, Container } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <Box
      bg="gray.800"
      color="white"
      py={8}
      w="100%"
      borderBottom="4px solid"
      borderColor="blue.500"
    >
      <Container maxW="container.xl" px={4}>
        <Box display="flex" alignItems="center" gap={3}>
          <FaGithub size={40} />
          <Box>
            <Heading size="lg">GitHub User Activity Tracker</Heading>
            <Text mt={2} color="gray.300">
              Track and analyze GitHub user activities with ease
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
