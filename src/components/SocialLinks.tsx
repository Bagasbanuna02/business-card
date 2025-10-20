/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
  Stack,
  Group,
  Text,
  Button,
  TextInput,
  Select,
  ActionIcon,
  Paper,
  Badge,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconTrash,
  IconPlus,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandGithub,
  IconWorld,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

interface SocialLink {
  id: string;
  type: string;
  url: string;
}

interface SocialLinksProps {
  socialLinks: SocialLink[];
  onAdd: (data: { type: string; url: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const socialTypes = [
  { value: "twitter", label: "Twitter", icon: IconBrandTwitter },
  { value: "linkedin", label: "LinkedIn", icon: IconBrandLinkedin },
  { value: "instagram", label: "Instagram", icon: IconBrandInstagram },
  { value: "github", label: "GitHub", icon: IconBrandGithub },
  { value: "website", label: "Website", icon: IconWorld },
];

export function SocialLinks({
  socialLinks,
  onAdd,
  onDelete,
}: SocialLinksProps) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const form = useForm({
    initialValues: {
      type: "",
      url: "",
    },
    validate: {
      type: (value) => (value ? null : "Please select a platform"),
      url: (value) => {
        if (!value) return "URL is required";
        try {
          new URL(value);
          return null;
        } catch {
          return "Please enter a valid URL";
        }
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      await onAdd(values);
      form.reset();
      setShowForm(false);
      notifications.show({
        title: "Success",
        message: "Social link added successfully (Mock)",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to add social link (Mock)",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
      notifications.show({
        title: "Success",
        message: "Social link removed successfully (Mock)",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to remove social link (Mock)",
        color: "red",
      });
    }
  };

  const getSocialIcon = (type: string) => {
    const socialType = socialTypes.find((s) => s.value === type);
    const Icon = socialType?.icon || IconWorld;
    return <Icon size={16} />;
  };

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Text fw={600} size="lg">
          Social Links
        </Text>
        <Button
          leftSection={<IconPlus size={16} />}
          variant="gradient"
          gradient={{ from: "#2AF598", to: "#009EFD", deg: 45 }}
          size="sm"
          radius="xl"
          onClick={() => setShowForm(!showForm)}
          style={{ boxShadow: "0 2px 8px rgba(0,158,253,0.25)" }}
        >
          {showForm ? "Close" : "Add Link"}
        </Button>
      </Group>

      {showForm && (
        <Paper
          p="md"
          withBorder
          radius="md"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
            borderColor: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(6px)",
          }}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="sm">
              <Select
                label="Platform"
                placeholder="Choose a platform"
                data={socialTypes}
                {...form.getInputProps("type")}
              />
              <TextInput
                label="URL"
                placeholder="https://example.com/username"
                {...form.getInputProps("url")}
              />
              <Group gap="sm">
                <Button type="submit" loading={loading} size="sm" radius="xl">
                  Add Link
                </Button>
                <Button
                  variant="subtle"
                  size="sm"
                  radius="xl"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      )}

      <Stack gap="xs">
        {socialLinks.map((link) => (
          <Paper
            key={link.id}
            p="sm"
            radius="md"
            withBorder
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <Group justify="space-between">
              <Group gap="sm">
                {getSocialIcon(link.type)}
                <Stack gap={2} style={{ minWidth: 0 }}>
                  <Badge
                    variant="light"
                    size="sm"
                    radius="sm"
                    style={{ alignSelf: "flex-start" }}
                  >
                    {socialTypes.find((s) => s.value === link.type)?.label ||
                      link.type}
                  </Badge>
                  <Text size="sm" c="dimmed" truncate maw={300}>
                    {link.url}
                  </Text>
                </Stack>
              </Group>
              <ActionIcon
                color="red"
                variant="subtle"
                radius="xl"
                onClick={() => onDelete(link.id)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Paper>
        ))}
        {socialLinks.length === 0 && (
          <Text c="dimmed" ta="center" py="md">
            No social links added yet
          </Text>
        )}
      </Stack>
    </Stack>
  );
}
