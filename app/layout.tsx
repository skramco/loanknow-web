import type { Metadata, Viewport } from "next";
import { HistoryProvider } from "@/components/HistoryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoanKnow — Ask any mortgage question",
  description:
    "Free, no-account mortgage Q&A in plain language. Powered by Owen AI; calculations by dett.io.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HistoryProvider>{children}</HistoryProvider>
      </body>
    </html>
  );
}