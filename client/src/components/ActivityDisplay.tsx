import {
  Box,
  VStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Badge,
  Link,
} from "@chakra-ui/react";

interface Event {
  eventId?: string;
  eventType?: string;
  type?: string;
  user?: string;
  repoUrl?: string;
  repoName?: string;
  commitMessage?: string;
}

interface ActivityDisplayProps {
  activities: {
    message: string;
    assembledData?: Event[];
    EventList?: Event[];
    eventCount?: Record<string, number>;
  } | null;
  loading: boolean;
  error: string;
}

const ActivityDisplay = ({
  activities,
  loading,
  error,
}: ActivityDisplayProps) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mt={8}>
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!activities) {
    return null;
  }

  const renderEvents = () => {
    if (activities.assembledData) {
      return activities.assembledData.map((event, index) => (
        <Box
          key={event.eventId || index}
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="sm"
          width="100%"
        >
          <Badge colorScheme="blue" mb={2}>
            {event.eventType}
          </Badge>
          <Text>
            <strong>User:</strong> {event.user}
          </Text>
          <Link href={event.repoUrl} color="blue.500" isExternal>
            <Text>
              <strong>Repository URL:</strong> {event.repoUrl}
            </Text>
          </Link>
          {event.commitMessage && (
            <Text>
              <strong>Commit Message:</strong> {event.commitMessage}
            </Text>
          )}
        </Box>
      ));
    }

    if (activities.EventList) {
      return activities.EventList.map((event, index) => (
        <Box
          key={index}
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="sm"
          width="100%"
        >
          <Badge colorScheme="purple" mb={2}>
            {event.type}
          </Badge>
          <Text>
            <strong>Repository:</strong> {event.repoName}
          </Text>
          <Link href={event.repoUrl} color="blue.500" isExternal>
            <Text>
              <strong>Repository URL:</strong> {event.repoUrl}
            </Text>
          </Link>
        </Box>
      ));
    }

    if (activities.eventCount) {
      return (
        <Box p={4} bg="white" borderRadius="md" boxShadow="sm" width="100%">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Event Count Summary
          </Text>
          {Object.entries(activities.eventCount).map(([type, count]) => (
            <Text key={type}>
              <strong>{type}:</strong> {count}
            </Text>
          ))}
        </Box>
      );
    }

    return null;
  };

  return (
    <VStack spacing={4} mt={8} align="stretch">
      <Text fontSize="lg" fontWeight="bold" color="gray.700">
        {activities.message}
      </Text>
      {renderEvents()}
    </VStack>
  );
};

export default ActivityDisplay;
