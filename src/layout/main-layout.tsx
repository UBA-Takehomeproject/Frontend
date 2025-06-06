
import { AppBar } from "@/components/custom-ui/appbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
 
    <main>
      <AppBar />

      <Outlet />
    </main>
  );
}
