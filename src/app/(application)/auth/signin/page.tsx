"use client";

import { Button, Container, Paper, Stack, Text, Title } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function SignInPage() {
  return (
    <Container size="xs" py="xl">
      <Paper
        shadow="xl"
        p="xl"
        radius="lg"
        withBorder
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          borderColor: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack align="center" gap="lg">
          <Stack align="center" gap="xs">
            <Title
              order={2}
              style={{
                background: "linear-gradient(90deg,#2AF598 0%,#009EFD 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome Back
            </Title>
            <Text c="dimmed" ta="center" size="sm">
              Sign in to manage your digital business card
            </Text>
          </Stack>

          <Button
            leftSection={<IconBrandGoogle size={20} />}
            variant="gradient"
            gradient={{ from: "#2AF598", to: "#009EFD", deg: 45 }}
            size="lg"
            fullWidth
            radius="xl"
            onClick={() => {
              //   handleGoogleSignIn();
            }}
            style={{ boxShadow: "0 4px 14px rgba(0,158,253,0.25)" }}
          >
            Continue with Google
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
