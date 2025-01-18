import { Button, Row } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { FieldValues } from "react-hook-form";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };

  // Handle form submission
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = { id: data.id, password: data.password };

      // Attempt login and extract user data
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      // Store user data and token in state
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });

      // Navigate based on the user role
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
        background: "#ffffff",
        padding: "20px",
      }}>
      <div
        style={{
          background: "#f9f9f9",
          padding: "50px",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "450px",
        }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333333",
            fontWeight: 700,
            fontSize: "28px",
            letterSpacing: "1px",
          }}>
          University Management System
        </h2>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}>
          <PHInput
            type="text"
            name="id"
            label={
              <span style={{ fontWeight: "600", color: "#4a4a4a" }}>ID:</span>
            }
            placeholder="Enter your ID"></PHInput>

          <PHInput
            type="password"
            name="password"
            label={
              <span style={{ fontWeight: "600", color: "#4a4a4a" }}>
                Password:
              </span>
            }
            placeholder="Enter your password"></PHInput>

          <Button
            htmlType="submit"
            className="submit-button"
            type="primary"
            block>
            Login
          </Button>
        </PHForm>
      </div>
    </Row>
  );
};

export default Login;
