import { Link } from 'react-router-dom';

function ErrorPage() {
  
  return (
    <section className="error">
      <h2 className="error__status">404</h2>
      <p className="error__message">Страница не найдена</p>
      <Link to="/" className="error__link">Назад</Link>
    </section>
  )
}

export default ErrorPage;