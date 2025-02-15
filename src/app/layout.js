"use client";

import "../styles/globals.css";
import { Providers } from "../providers/Providers";
import Navbar from "@/components/layout/Navbar";
import LoginModal from "@/components/LoginModal.js";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <LoginModal />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
