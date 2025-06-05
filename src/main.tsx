import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import "./index.css";
import ThemeRoutes from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter basename="/">
        {/* <NotificationContextProvider> */}
        {/* <AppBarContextProvider> */}
        <AuthProvider>
          <ThemeRoutes />
        </AuthProvider>
        {/* </AppBarContextProvider> */}
        {/* </NotificationContextProvider> */}
      </BrowserRouter>
    </QueryClientProvider>
    {/* <BlogHome /> */}
  </StrictMode>
);
