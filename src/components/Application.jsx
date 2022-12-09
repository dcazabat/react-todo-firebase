import { Link } from "react-router-dom";
import Header from "./Header";

export default function Application() {
    return (
        <div className="text-center">
            <Header isLogged={false}></Header>
            <p className="">
                Estoy en la App, para que funcione, se debe crear un archivo .env dentro de la carpeta src
                donde los nombres de las constantes de ambiente sean los mismos que los que figuran en
                la conexion de Firebase.
            </p>
        </div>
    )
}