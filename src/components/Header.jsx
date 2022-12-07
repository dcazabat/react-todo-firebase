import { AiOutlineLogin } from 'react-icons/ai'

export default function Header(props) {
  return (
    <div className="d-flex text-center mb-3 text-bg-dark ">
      <div className='p-3'>
        <h2 className="display-3">Lista de Contactos</h2>
        <h4>
          Carga de Variable de Enviroment (.env) : {import.meta.env.VITE_HELLO}
        </h4>
      </div>
      <div className='p-3 align-self-center'>
        <a className="btn btn-success" href='/login'>Ingresar
          <AiOutlineLogin size={30} />
        </a>
      </div>
    </div>
  );
};