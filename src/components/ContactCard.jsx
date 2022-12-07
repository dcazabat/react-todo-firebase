import { Link } from "react-router-dom";
import user from "../assets/images/user.png";
import { FcFullTrash } from 'react-icons/fc'

export default function ContactCard(props) {
  const { id, name, email } = props.contact;
  return (
    <div className="card m-3" key={id}>
      <Link to={{ pathname: `/contact/${id}` }}>
        <img className="card-img-top card_img" src={user} alt="Photo" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{email}</p>

        <button className="btn btn-danger" onClick={() => props.clickHander(id)} >
          <FcFullTrash size={30}/>
        </button>
      </div>
    </div>
  );
};