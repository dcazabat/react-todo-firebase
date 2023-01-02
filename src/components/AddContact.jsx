import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddContact(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function add() {
    props.addContactHandler({ "name": name, "email": email });
    navigate("/contacts");
  };
  
  return (
    <>
      <h2>Agregar Contacto</h2>
      <form onSubmit={() => add()}>
        <div className="mb-3">
          <label htmlFor="field_name" className="form-label">Nombre</label>
          <input
            id="field_name"
            className="form-control"
            placeholder="Nombre"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="field_email" className="form-label">Correo Electronico</label>
          <input
            id="field_email"
            className="form-control"
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success mt-2">Agregar</button>
        <button type="reset" className="btn btn-danger mt-2 mx-2" onClick={() => navigate("/contacts")}>Cancelar</button>
      </form>
    </>
  );
};