/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from "next/navigation";
import {
  Container,
  Avatar,
  Title,
  Text,
  Stack,
  Button,
  Paper,
  Badge,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandGithub,
  IconWorld,
  IconExternalLink,
} from "@tabler/icons-react";
import { prisma } from "@/lib/prisma";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

const socialIcons = {
  twitter: IconBrandTwitter,
  linkedin: IconBrandLinkedin,
  instagram: IconBrandInstagram,
  github: IconBrandGithub,
  website: IconWorld,
};

async function getProfile(id: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return profile;
  } catch (error) {
    return null;
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profile = await getProfile(params.id);

  if (!profile) {
    notFound();
  }

  const getSocialIcon = (type: string) => {
    const Icon = socialIcons[type as keyof typeof socialIcons] || IconWorld;
    return Icon;
  };

  const getSocialLabel = (type: string) => {
    const labels = {
      twitter: "Twitter",
      linkedin: "LinkedIn",
      instagram: "Instagram",
      github: "GitHub",
      website: "Website",
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Container size="sm" py="xl">
      <Paper shadow="lg" p="xl" radius="lg">
        <Stack align="center" gap="xl">
          {/* Profile Header */}
          <Stack align="center" gap="md">
            {/* <Avatar
              src={profile.avatarUrl || profile.user.image}
              size={120}
              radius="xl"
            /> */}
            <Stack align="center" gap="xs">
              <Title order={1} ta="center">
                {profile.name}
              </Title>
              {profile.bio && (
                <Text size="lg" c="dimmed" ta="center" maw={400}>
                  {profile.bio}
                </Text>
              )}
            </Stack>
          </Stack>

          {/* Social Links */}
          {/* {profile.socials.length > 0 && (
            <Stack gap="sm" w="100%" maw={400}>
              <Text fw={500} ta="center" size="lg">
                Connect with me
              </Text>
              <Stack gap="xs">
                {profile.socials.map((social: any) => {
                  const Icon = getSocialIcon(social.type);
                  return (
                    <Button
                      key={social.id}
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      size="md"
                      fullWidth
                      leftSection={<Icon size={20} />}
                      rightSection={<IconExternalLink size={16} />}
                    >
                      {getSocialLabel(social.type)}
                    </Button>
                  );
                })}
              </Stack>
            </Stack>
          )} */}

          {/* Footer */}
          <Stack align="center" gap="xs">
            <Badge variant="light" size="sm">
              Digital Business Card
            </Badge>
            <Text size="xs" c="dimmed">
              Create your own at Digital Business Card
            </Text>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const profile = await getProfile(params.id);

  if (!profile) {
    return {
      title: "Profile Not Found",
    };
  }

  return {
    title: `${profile.name} - Digital Business Card`,
    description: profile.bio || `Connect with ${profile.name}`,
    openGraph: {
      title: `${profile.name} - Digital Business Card`,
      description: profile.bio || `Connect with ${profile.name}`,
      images: profile.avatarUrl ? [profile.avatarUrl] : [],
    },
  };
}
