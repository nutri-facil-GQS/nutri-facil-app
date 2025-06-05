import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  senha: z.string().min(4, { message: 'A senha deve ter pelo menos 4 caracteres' }),
});

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, senha });

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    // Lógica de autenticação pode ser adicionada aqui
    navigate('/');
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow p-4 border-0">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">Acessar Conta</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input
                    type="email"
                    className={`form-control${errors.email ? ' is-invalid' : ''}`}
                    id="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="senha" className="form-label">Senha</label>
                  <input
                    type="password"
                    className={`form-control${errors.senha ? ' is-invalid' : ''}`}
                    id="senha"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                  />
                  {errors.senha && (
                    <div className="invalid-feedback">{errors.senha}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">Entrar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;