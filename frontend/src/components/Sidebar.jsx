import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
  const location = useLocation();

  // Corrigido: sempre mantém o texto visível, apenas muda o fundo/texto quando ativo
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-primary text-white vh-100" style={{width: '220px', position: 'fixed', top: 0, left: 0, zIndex: 1030}}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4 fw-bold">NutriFácil</span>
      </Link>
      <hr className="border-light" />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link${location.pathname === '/' ? ' active bg-light text-primary' : ' text-white'}`}
            style={{ fontWeight: 500 }}
          >
            Lista
          </Link>
        </li>
        <li>
          <Link
            to="/imc"
            className={`nav-link${location.pathname === '/imc' ? ' active bg-light text-primary' : ' text-white'}`}
            style={{ fontWeight: 500 }}
          >
            IMC
          </Link>
        </li>
        <li>
          <Link
            to="/cadastrar-dieta"
            className={`nav-link${location.pathname === '/cadastrar-dieta' ? ' active bg-light text-primary' : ' text-white'}`}
            style={{ fontWeight: 500 }}
          >
            Cadastrar Dieta
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;