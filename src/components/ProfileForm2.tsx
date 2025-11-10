"use client";

import { Loader, Stack } from "@mantine/core";
import {
  Avatar,
  Button,
  Group,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useState } from "react";

interface ProfileForm2Props {
  profile: {
    name: string;
    bio?: string;
    avatarUrl?: string;
  };
  setProfile: (profile: {
    name: string;
    bio?: string;
    avatarUrl?: string;
  }) => void;

  onSave: (data: {
    name: string;
    bio?: string;
    avatarUrl?: string;
  }) => Promise<void>;
}

export default function ProfileForm2({
  profile,
  setProfile,
  onSave,
}: ProfileForm2Props) {
  const [loading, setLoading] = useState(false);

  // console.log("PROFILE", profile);

  return (
    <Stack gap="md">
      <Group>
        <Avatar
          onError={() => console.log("Avatar not found")}
          onLoad={() => <Loader />}
          src={profile.avatarUrl}
          size="lg"
        />
        <Stack gap="xs">
          <Text fw={500}>Profile Picture</Text>
          <TextInput
            placeholder="Avatar URL"
            value={profile.avatarUrl}
            onChange={(e) =>
              setProfile({
                ...profile,
                avatarUrl: e.target.value,
              })
            }
          />
        </Stack>
      </Group>

      <TextInput
        label="Full Name"
        placeholder="Your full name"
        required
        value={profile.name}
        onChange={(e) =>
          setProfile({
            ...profile,
            name: e.target.value,
          })
        }
      />

      <Textarea
        label="Bio"
        placeholder="Tell people about yourself..."
        rows={4}
        value={profile.bio}
        onChange={(e) =>
          setProfile({
            ...profile,
            bio: e.target.value,
          })
        }
      />

      <Button type="button" loading={false} onClick={() => onSave(profile)}>
        Save Profile
      </Button>
    </Stack>
  );
}
