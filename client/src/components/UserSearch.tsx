import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  useToast,
  Text,
} from "@chakra-ui/react";

interface UserSearchProps {
  username: string;
  setUsername: (username: string) => void;
  onSearch: (option: number) => Promise<void>;
}

const UserSearch = ({ username, setUsername, onSearch }: UserSearchProps) => {
  const toast = useToast();

  const handleSearch = (option: number) => {
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Please enter a GitHub username",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onSearch(option);
  };

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.200"
    >
      <VStack spacing={6} align="stretch">
        <Box>
          <Text mb={2} fontSize="sm" fontWeight="medium" color="gray.700">
            Enter GitHub Username
          </Text>
          <Input
            placeholder="e.g., octocat"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="lg"
            borderRadius="md"
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
            }}
          />
        </Box>

        <Box>
          <Text mb={3} fontSize="sm" fontWeight="medium" color="gray.700">
            Select an option to fetch:
          </Text>
          <HStack spacing={4} width="100%">
            <Button
              colorScheme="blue"
              onClick={() => handleSearch(1)}
              flex={1}
              size="lg"
              _hover={{ transform: "translateY(-1px)" }}
              transition="all 0.2s"
            >
              List All Events
            </Button>
            <Button
              colorScheme="green"
              onClick={() => handleSearch(2)}
              flex={1}
              size="lg"
              _hover={{ transform: "translateY(-1px)" }}
              transition="all 0.2s"
            >
              Public Events
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => handleSearch(3)}
              flex={1}
              size="lg"
              _hover={{ transform: "translateY(-1px)" }}
              transition="all 0.2s"
            >
              Event List
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default UserSearch;
