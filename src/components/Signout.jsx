import { useNavigate } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import { logout } from "../firebase/firebase";

export default function SignOut() {
  const navigate = useNavigate();

  return (
    <AuthProvider
      onUserLoggedIn={async () => {
        await logout();
        navigate("/");
      }}
      onUserNotLoggedIn={() => {
        navigate("/");
      }}
    ></AuthProvider>
  );
}
