import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { Layout, Menu } from "antd";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);
  const ROLE = {
    FACULTY: "faculty",
    ADMIN: "admin",
    STUDENT: "student",
  };

  let sidebarItems;

  switch (user!.role) {
    case ROLE.FACULTY:
      sidebarItems = sidebarItemGenerator(facultyPaths, ROLE.FACULTY);
      break;
    case ROLE.ADMIN:
      sidebarItems = sidebarItemGenerator(adminPaths, ROLE.ADMIN);
      break;
    case ROLE.STUDENT:
      sidebarItems = sidebarItemGenerator(studentPaths, ROLE.STUDENT);
      break;
    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        backgroundColor: "#001529",
        position: "sticky",
        top: "0",
        left: "0",
        zIndex: 999,
        height: "100vh",
      }}
      zeroWidthTriggerStyle={{
        position: "absolute",
        top: "60px",
        right: "-36px",
        backgroundColor: "#001529",
        borderRadius: "0 4px 4px 0",
        padding: "8px 4px",
        color: "#FFFFFF",
        width: "36px",
        zIndex: 1001,
      }}>
      <div
        style={{
          height: "64px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#001529",
        }}>
        <Link to={`/${user?.role}/dashboard`}>
          <h1
            style={{
              color: "white",
              margin: 0,
              fontSize: "20px",
              fontWeight: "600",
            }}>
            Bitwise University
          </h1>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
