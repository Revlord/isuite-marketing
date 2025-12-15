import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iSuite",
  description: "iSuite ERP. iSuite Software Solutions. iSuite. iSuite Pvt. Ltd.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
