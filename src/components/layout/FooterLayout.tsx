import { Layout } from "antd";

const { Footer } = Layout;

const FooterLayout = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Bitwise University ©{new Date().getFullYear()} Created by Shafin
    </Footer>
  );
};

export default FooterLayout;
