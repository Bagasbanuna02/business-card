import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
// import Providers from "@/context/providers";
import Providers from "@/context/providers";
import {
  ColorSchemeScript,
  mantineHtmlProps
} from "@mantine/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Business Card",
  description: "Your digital business card now is always ready & updated",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body cz-shortcut-listen="true">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
