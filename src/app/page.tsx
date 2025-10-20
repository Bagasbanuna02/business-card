"use client";

import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container size="md" py="xl">
      <Paper
        p="xl"
        radius="xl"
        shadow="xl"
        withBorder
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          borderColor: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Stack align="center" gap="xl">
          <Stack align="center" gap="md">
            <Image src="/logo.svg" alt="Logo" width={200} height={200} />
            <Title
              order={1}
              size="3rem"
              fw={900}
              ta="center"
              style={{
                background: "linear-gradient(90deg,#2AF598 0%,#009EFD 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Digital Business Card
            </Title>

            <Text
              size="xl"
              c="dimmed"
              ta="center"
              maw={600}
              style={{ lineHeight: 1.6 }}
            >
              Build your personalized digital business card and share it
              instantly with anyone. Seamlessly connect via QR codes and social
              media links.
            </Text>
          </Stack>

          <Group gap="md">
            <Button
              component={Link}
              href={"/dashboard"}
              size="lg"
              radius="xl"
              variant="gradient"
              gradient={{ from: "#2AF598", to: "#009EFD", deg: 45 }}
              style={{ boxShadow: "0 4px 18px rgba(0,158,253,0.3)" }}
            >
              Get Started
            </Button>

            <Button
              component={Link}
              href="/auth/signin"
              size="lg"
              radius="xl"
              variant="outline"
              style={{
                borderColor: "rgba(255,255,255,0.2)",
                color: "#E7F6FF",
              }}
            >
              Sign In
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
