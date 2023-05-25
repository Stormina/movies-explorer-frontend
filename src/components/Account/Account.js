import { Link } from 'react-router-dom';

function Account() {

  return (
    <Link to="/profile" className="account">
      <p className="account__text">Аккаунт</p>
      <div className="account__icon"></div>
    </Link>
  )
}

export default Account;