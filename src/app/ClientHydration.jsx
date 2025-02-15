// app/components/ClientHydration.jsx
"use client";

import { useEffect, useState } from "react";

export default function ClientHydration({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? children : null;
}
