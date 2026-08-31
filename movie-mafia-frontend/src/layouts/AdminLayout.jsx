import { Outlet } from "react-router-dom";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

function AdminLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <StarsBackground pointerEvents={false} />
      </div>

      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;