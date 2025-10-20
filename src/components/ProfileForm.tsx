"use client";

import {
  Avatar,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

interface ProfileFormProps {
  initialData?: {
    name: string;
    bio?: string;
    avatarUrl?: string;
  };
  onSave: (data: {
    name: string;
    bio?: string;
    avatarUrl?: string;
  }) => Promise<void>;
}

export function ProfileForm({ initialData, onSave }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: initialData?.name || "",
      bio: initialData?.bio || "",
      avatarUrl: initialData?.avatarUrl || "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 characters" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      console.log("[VALUE]", values);

      await onSave(values);
      notifications.show({
        title: "Success",
        message: "Profile updated successfully",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update profile",
        color: "red",
      });
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <Group>
          <Avatar src={form.values.avatarUrl} size="lg" />
          <Stack gap="xs">
            <Text fw={500}>Profile Picture</Text>
            <TextInput
              placeholder="Avatar URL"
              value={form.values.avatarUrl}
              {...form.getInputProps("avatarUrl")}
            />
          </Stack>
        </Group>

        <TextInput
          label="Full Name"
          placeholder="Your full name"
          required
          value={form.values.name}
          {...form.getInputProps("name")}
        />

        <Textarea
          label="Bio"
          placeholder="Tell people about yourself..."
          rows={4}
          value={form.values.bio}
          {...form.getInputProps("bio")}
        />

        <Button type="submit" loading={loading}>
          Save Profile
        </Button>
      </Stack>
    </form>
  );
}
