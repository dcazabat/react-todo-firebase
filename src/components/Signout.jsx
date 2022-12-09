import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "./AuthProvider";

import { logout } from "../firebase/firebase";

export default function SignOut() {
  useEffect(() => {}, []);
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
