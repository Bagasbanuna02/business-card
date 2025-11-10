/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ProfileForm } from "@/components/ProfileForm";
import ProfileForm2 from "@/components/ProfileForm2";
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
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEye, IconLogout } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Profile {
  id?: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  // socials: Array<{
  //   id: string;
  //   type: string;
  //   url: string;
  // }>;
}

export default function DashboardPage() {
  const { status, data } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile>({
    name: "",
    bio: "",
    avatarUrl: "",
  });
  const [haveProfile, setHaveProfile] = useState(false);

  useEffect(() => {
    onLoadData();
  }, [data?.user.id]);

  const onLoadData = async () => {
    const response = await fetch("/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    // console.log("[RES GET]", result);

    if (response.status === 404) {
      setProfile({
        name: data?.user?.name || "",
        bio: data?.user?.email || "",
        avatarUrl:
          data?.user?.image ||
          "https://tamilnaducouncil.ac.in/wp-content/uploads/2020/04/dummy-avatar.jpg",
      });

      setHaveProfile(false);
      return;
    }

    if (response.status === 200) {
      setProfile({
        id: result.data.id,
        name: result.data.name,
        bio: result.data.bio,
        avatarUrl: result.data.avatarUrl,
      });

      setHaveProfile(true);
      return;
    }
  };

  const handleProfileSave = async (data: {
    name: string;
    bio?: string;
    avatarUrl?: string;
  }) => {

    if (!data.name || !data.bio || !data.avatarUrl) {
      notifications.show({
        title: "Error",
        message: "Please fill all fields",
        color: "red",
      });
      return;
    }

    const response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status === 200) {
      notifications.show({
        title: "Success",
        message: "Profile updated successfully",
        color: "green",
      });

      setProfile((prev: any) => (prev ? { ...prev, ...data } : null));
    }
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
            {/* {JSON.stringify(profile, null, 2)} */}
            <Text c="dimmed">Manage your digital business card</Text>
          </div>
          <Group>
            {haveProfile && (
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
                signOut();
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
                  <ProfileForm2
                    setProfile={setProfile}
                    profile={profile as any}
                    onSave={handleProfileSave}
                  />
                  {/* <ProfileForm
                    initialData={profile ? (profile as any) : undefined}
                    onSave={handleProfileSave}
                  /> */}
                </div>

                <Divider />

                {/* <SocialLinks
                  socialLinks={profile?.socials || []}
                  onAdd={handleSocialAdd}
                  onDelete={handleSocialDelete}
                /> */}
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            {haveProfile && profileUrl && (
              <QRCodeCard
                profileUrl={profileUrl}
                profileName={profile?.name || ""}
              />
            )}
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
