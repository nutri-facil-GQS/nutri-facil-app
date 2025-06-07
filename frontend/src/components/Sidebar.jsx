import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
            Dietas criadas
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
            to="/agua"
            className={`nav-link${location.pathname === '/agua' ? ' active bg-light text-primary' : ' text-white'}`}
            style={{ fontWeight: 500 }}
          >
            Água Diária
          </Link>
        </li>
        <li>
          <Link
            to="/tmb"
            className={`nav-link${location.pathname === '/tmb' ? ' active bg-light text-primary' : ' text-white'}`}
            style={{ fontWeight: 500 }}
          >
            TMB
          </Link>
        </li>
      </ul>
      <hr className="border-light" />
      <button 
        onClick={handleLogout}
        className="btn btn-outline-light w-100"
      >
        Sair
      </button>
    </div>
  );
}

export default Sidebar;