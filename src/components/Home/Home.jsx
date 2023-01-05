import Header from "../Header/Header";
import './Home.css'

export default function Home() {

    return (
        <>
            <Header />
            <div className="div-container">
                <p className="text-welcome">
                    Estoy en la App, para que funcione, se debe crear un archivo .env dentro de la carpeta src
                    donde los nombres de las constantes de ambiente sean los mismos que los que figuran en
                    la conexion de Firebase.
                </p>
            </div>
        </>
    )
}