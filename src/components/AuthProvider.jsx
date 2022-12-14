import { useEffect } from "react";
import { auth, getUserInfo, userExists, registerNewUser } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children, onUserLoggedIn, onUserNotLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        const exists = await userExists(user.uid);

        if (exists) {
          const loggedUser = await getUserInfo(uid);

          if (!loggedUser.processCompleted) {
            navigate("/username");
          } else {
            // console.log("Usuario logueado completo - AuthProvider");
            onUserLoggedIn(loggedUser);
          }
        } else {
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: "",
            username: "",
            processCompleted: false,
          });
          navigate("/username");
        }
      } else {
        onUserNotLoggedIn();
      }
    });
  }, []);

  return <div>{children}</div>;
};