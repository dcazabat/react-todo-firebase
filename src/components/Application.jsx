import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";

export default function Application() {
    const [currentUser, setCurrentUser] = useState({username: ""});
    
    return (
        <div className="text-center">
            <Header currentUserLogged={currentUser}></Header>
            <p className="">
                Estoy en la App, para que funcione, se debe crear un archivo .env dentro de la carpeta src
                donde los nombres de las constantes de ambiente sean los mismos que los que figuran en
                la conexion de Firebase.
            </p>
        </div>
    )
}