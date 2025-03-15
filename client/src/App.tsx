import { ChakraProvider, Box, Container } from "@chakra-ui/react";
import { useState } from "react";
import Header from "./components/Header";
import UserSearch from "./components/UserSearch";
import ActivityDisplay from "./components/ActivityDisplay";

interface Event {
  eventId?: string;
  eventType?: string;
  type?: string;
  user?: string;
  repoUrl?: string;
  repoName?: string;
  commitMessage?: string;
}

interface ActivityResponse {
  message: string;
  assembledData?: Event[];
  EventList?: Event[];
  eventCount?: Record<string, number>;
}

function App() {
  const [username, setUsername] = useState("");
  const [activities, setActivities] = useState<ActivityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserActivity = async (option: number) => {
    setLoading(true);
    setError("");
    try {
      let endpoint;
      let method;

      switch (option) {
        case 1:
          endpoint = "listEventsForUses";
          method = "POST";
          break;
        case 2:
          endpoint = `publicEventsForAUser/${username}`;
          method = "GET";
          break;
        case 3:
          endpoint = `getEventListForUser/${username}`;
          method = "GET";
          break;
        default:
          throw new Error("Invalid option");
      }

      const response = await fetch(
        `http://localhost:3000/api/github/${endpoint}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          ...(method === "POST" && { body: JSON.stringify({ username }) }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setActivities(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch user activities"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Box
        minH="100vh"
        w="100vw"
        bg="gray.50"
        display="flex"
        flexDirection="column"
      >
        <Header />
        <Container
          maxW="container.xl"
          py={8}
          px={4}
          flex="1"
          display="flex"
          flexDirection="column"
          gap={8}
        >
          <UserSearch
            username={username}
            setUsername={setUsername}
            onSearch={fetchUserActivity}
          />
          <ActivityDisplay
            activities={activities}
            loading={loading}
            error={error}
          />
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
