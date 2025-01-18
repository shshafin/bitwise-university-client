import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import FooterLayout from "./FooterLayout";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

// Destructuring Layout components
const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();

  // Handle Logout action
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout>
      {/* Sidebar Section */}
      <Sidebar />

      <Layout>
        {/* Header Section */}
        <Header
          style={{
            padding: "0 16px",
            background: "#001529",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: "0",
            zIndex: 1000,
          }}>
          {/* Logout Button */}
          <Button onClick={handleLogout}>Logout</Button>
        </Header>

        {/* Content Section */}
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 760,
              background: "#fbfbfb",
              borderRadius: "4px",
              boxShadow: "0 0px 0px rgba(7, 7, 7, 0.29)", // Subtle shadow for elevation
            }}>
            {/* Outlet for nested routes */}
            <Outlet />
          </div>
        </Content>

        {/* Footer Section */}
        <FooterLayout />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
