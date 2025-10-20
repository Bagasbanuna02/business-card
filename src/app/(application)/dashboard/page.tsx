/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ProfileForm } from "@/components/ProfileForm";
import { QRCodeCard } from "@/components/QRCodeCard";
import { SocialLinks } from "@/components/SocialLinks";
import {
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { IconEye, IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Profile {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  socials: Array<{
    id: string;
    type: string;
    url: string;
  }>;
}

export default function DashboardPage() {
  const mockSession = {
    user: {
      id: "mock-user-id",
      name: "John Doe",
      email: "john@example.com",
    },
  };

  const router = useRouter();

  const [profile, setProfile] = useState<Profile>({
    id: "mock-profile-id",
    name: "John Doe",
    bio: "Full-stack developer passionate about creating amazing user experiences",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    socials: [
      { id: "1", type: "github", url: "https://github.com/johndoe" },
      { id: "2", type: "linkedin", url: "https://linkedin.com/in/johndoe" },
      { id: "3", type: "twitter", url: "https://twitter.com/johndoe" },
    ],
  });

  const handleProfileSave = async (data: {
    name: string;
    bio?: string;
    avatarUrl?: string;
  }) => {
    console.log("[v0] Mock profile save:", data);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update local state with new data
    setProfile((prev: any) => (prev ? { ...prev, ...data } : null));
  };

  const handleSocialAdd = async (data: { type: string; url: string }) => {
    console.log("[v0] Mock social add:", data);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Add to local state
    const newSocial = {
      id: Date.now().toString(),
      ...data,
    };
    setProfile((prev: any) =>
      prev
        ? {
            ...prev,
            socials: [...prev.socials, newSocial],
          }
        : null
    );
  };

  const handleSocialDelete = async (id: string) => {
    console.log("[v0] Mock social delete:", id);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Remove from local state
    setProfile((prev: any) =>
      prev
        ? {
            ...prev,
            socials: prev.socials.filter((social: any) => social.id !== id),
          }
        : null
    );
  };

  const profileUrl = profile
    ? `${
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000"
      }/p/${profile.id}`
    : "";


  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Group justify="space-between">
          <div>
            <Title order={1}>Dashboard</Title>
            <Text c="dimmed">Manage your digital business card</Text>
          </div>
          <Group>
            {profile && (
              <Button
                leftSection={<IconEye size={16} />}
                variant="outline"
                onClick={() => router.push(`/p/${profile.id}`)}
              >
                View Profile
              </Button>
            )}
            <Button
              leftSection={<IconLogout size={16} />}
              variant="subtle"
              color="red"
              onClick={async () => {
                console.log("[v0] Mock sign out");
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 500));
              }}
            >
              Sign Out
            </Button>
          </Group>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper shadow="sm" p="xl" radius="md">
              <Stack gap="xl">
                <div>
                  <Title order={2} size="h3" mb="md">
                    Profile Information
                  </Title>
                  <ProfileForm
                    initialData={profile || undefined}
                    onSave={handleProfileSave}
                  />
                </div>

                <Divider />

                <SocialLinks
                  socialLinks={profile?.socials || []}
                  onAdd={handleSocialAdd}
                  onDelete={handleSocialDelete}
                />
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            {profile && profileUrl && (
              <QRCodeCard profileUrl={profileUrl} profileName={profile.name} />
            )}
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
