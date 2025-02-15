// src/providers/Providers.jsx
"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store/store";
import { NavigationProvider } from "../context/NavigationContext";
import { AuthProvider } from "../context/AuthContext";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSkeleton />} persistor={persistor}>
        <NavigationProvider>
          <AuthProvider>{children}</AuthProvider>
        </NavigationProvider>
      </PersistGate>
    </Provider>
  );
}
