"use client";

import { Providers } from "../providers/Providers";
import { NavigationProvider } from "../context/NavigationContext";
import Navbar from "@/components/layout/Navbar";
import LoginModal from "@/components/LoginModal.js";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function ClientLayout({ children }) {
  return (
    <Providers>
      <NavigationProvider>
        <Navbar />
        <LoginModal />
        <main>{children}</main>
        <GoogleAnalytics />
      </NavigationProvider>
    </Providers>
  );
}
