import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./restaurant.css";
import "./website.css";
export const metadata: Metadata = {
  title: "Italiano Bari · Italian Restaurant in Dammam",
  description: "A little Italy. A lot of flavour. Explore Italiano Bari’s pizza, pasta, salads and drinks menu in Dammam, and join our loyalty club for free treats.",
  applicationName: "Italiano Bari",
  icons: { icon: "/images/italiano-bari-logo.png", apple: "/icon-192.png" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#1E4430" };
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
