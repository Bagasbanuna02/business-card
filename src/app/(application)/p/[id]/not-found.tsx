import { Container, Title, Text, Button, Stack } from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="lg">
        <Stack align="center" gap="md">
          <Title order={1} size="3rem">
            404
          </Title>
          <Title order={2}>Profile Not Found</Title>
          <Text size="lg" c="dimmed" ta="center">
            {`The profile you're looking for doesn't exist or has been removed.`}
          </Text>
        </Stack>

        <Button component={Link} href="/" size="lg">
          Go Home
        </Button>
      </Stack>
    </Container>
  );
}
