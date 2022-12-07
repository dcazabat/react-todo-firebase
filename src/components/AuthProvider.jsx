import { useEffect, useNavigate } from "react-router-dom";
import { getUserInfo, registerNewUser } from "../firebase/cnx";

export default function AuthProvider({children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered}) {
    const navigate = useNavigate();

    useEffect(() => {
        async function handleUserStateChanged(user) {
            if (user) {
                const isRegister = await userExist(user.uid)
                if (isRegister) {
                    const userInfo = await getUserInfo(user.uid)
                    if (userInfo.processCompleted) {
                        onUserLoggedIn(userInfo)
                    } else {
                        onUserNotRegistered(userInfo)
                    }
                    
                } else {
                    const tmp = {
                        uid : user.uid,
                        displayName : user.displayName,
                        profilePicture: user.profilePicture,
                        username: '',
                        processCompleted: false
                    }
                    await registerNewUser(tmp)
                    onUserNotRegistered(user)
                }
            } else {
                onUserNotLoggedIn();
            }
        }
        onAuthStateChanged(auth, handleUserStateChanged);
    }, []);
    return (
        <div>
            {children}
        </div>
    );
}