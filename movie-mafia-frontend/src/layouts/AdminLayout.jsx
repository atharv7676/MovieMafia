import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <Sidebar />

      <Outlet />
    </>
  );
}

export default AdminLayout;
