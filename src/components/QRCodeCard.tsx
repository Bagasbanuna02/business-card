/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
  Paper,
  Stack,
  Text,
  Button,
  Group,
  CopyButton,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconDownload,
  IconCopy,
  IconCheck,
  IconShare,
} from "@tabler/icons-react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeCardProps {
  profileUrl: string;
  profileName: string;
}

export function QRCodeCard({ profileUrl, profileName }: QRCodeCardProps) {
  const [qrSize, setQrSize] = useState(200);

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg") as unknown as SVGElement;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = qrSize;
    canvas.height = qrSize;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        const link = document.createElement("a");
        link.download = `${profileName
          .replace(/\s+/g, "-")
          .toLowerCase()}-qr-code.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const shareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileName}'s Digital Business Card`,
          text: `Check out ${profileName}'s digital business card`,
          url: profileUrl,
        });
      } catch (error) {
        // Fallback to copy URL
        navigator.clipboard.writeText(profileUrl);
      }
    } else {
      // Fallback to copy URL
      navigator.clipboard.writeText(profileUrl);
    }
  };

  return (
    <Paper
      p="lg"
      radius="lg"
      shadow="xl"
      withBorder
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        borderColor: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Stack align="center" gap="md">
        <Text fw={600} size="lg">
          Share Your Profile
        </Text>

        <div
          style={{
            padding: "16px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          <QRCodeSVG
            id="qr-code-svg"
            value={profileUrl}
            size={qrSize}
            level="M"
            includeMargin={false}
          />
        </div>

        <Stack gap="xs" w="100%">
          <Text size="sm" c="dimmed" ta="center">
            Scan to view my profile
          </Text>
          <Text
            size="xs"
            c="dimmed"
            ta="center"
            style={{ wordBreak: "break-all" }}
          >
            {profileUrl}
          </Text>
        </Stack>

        <Group justify="center" gap="sm">
          <Button
            leftSection={<IconDownload size={16} />}
            variant="gradient"
            gradient={{ from: "#2AF598", to: "#009EFD", deg: 45 }}
            size="sm"
            radius="xl"
            onClick={downloadQR}
            style={{ boxShadow: "0 2px 8px rgba(0,158,253,0.25)" }}
          >
            Download
          </Button>

          <CopyButton value={profileUrl}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? "Copied!" : "Copy URL"}>
                <ActionIcon
                  color={copied ? "teal" : "gray"}
                  variant="light"
                  radius="xl"
                  onClick={copy}
                >
                  {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>

          <Tooltip label="Share">
            <ActionIcon
              variant="light"
              radius="xl"
              onClick={shareProfile}
              color="blue"
            >
              <IconShare size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Stack>
    </Paper>
  );
}
