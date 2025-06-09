import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { AppProvider } from "./context/app";
import "./index.css";
import ThemeRoutes from "./routes";
const queryClient = new QueryClient( );
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <AuthProvider>
          <AppProvider>
            <ThemeRoutes />
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
