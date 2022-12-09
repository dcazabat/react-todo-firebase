import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'

export default function Header({ isLogged }) {
  return (
    <div className="d-flex flex-row justify-content-around text-center mb-3 text-bg-dark ">
      <div className='p-3'>
        <h2 className="display-3">Lista de Contactos</h2>
        <h4>
          Carga de Variable de Enviroment (.env) : {import.meta.env.VITE_HELLO}
        </h4>
      </div>
      <div className='p-3 align-self-center'>
        {(isLogged) ?
          <a className="btn btn-danger" href='/signout'>
            <AiOutlineLogout size={30} />
          </a>
          :
          <a className="btn btn-success" href='/login'>
            <AiOutlineLogin size={30} />
          </a>}
      </div>
    </div>
  );
};