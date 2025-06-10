import React, { useEffect, useState } from 'react';

function Lista() {
  const [dietasUsuarios, setDietasUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/dietas-usuarios')
      .then(res => res.json())
      .then(data => {
        setDietasUsuarios(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="container py-4">Carregando...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Dietas Criadas</h2>
      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle shadow rounded-4 overflow-hidden">
          <thead style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
            <tr>
              <th className="rounded-start-4">#</th>
              <th>Email</th>
              <th>Dieta</th>
              <th>Objetivo</th>
              <th>Peso (kg)</th>
              <th>Altura (cm)</th>
              <th>Idade</th>
              <th>Sexo</th>
              <th>Preferências</th>
              <th className="rounded-end-4">Alergias</th>
            </tr>
          </thead>
          <tbody>
            {dietasUsuarios.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center text-muted">
                  Nenhuma dieta cadastrada.
                </td>
              </tr>
            ) : (
              dietasUsuarios.map((item) => (
                <tr key={item.idDietaUsuario} className="bg-white">
                  <td className="fw-bold">{item.idDietaUsuario}</td>
                  <td>
                    <span className="d-inline-block px-2 py-1 rounded-pill bg-light border">
                      {item.emailUsuario || <span className="text-muted fst-italic">Não informado</span>}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-success bg-opacity-75 fs-6">{item.nomeDieta}</span>
                  </td>
                  <td>
                    <span className="badge bg-primary bg-opacity-75 fs-6">{item.objetivo}</span>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border">{item.peso}</span>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border">{item.altura}</span>
                  </td>
                  <td>
                    <span className="badge bg-light text-dark border">{item.idade}</span>
                  </td>
                  <td>
                    <span className="badge bg-secondary rounded-pill px-3">{item.sexo}</span>
                  </td>
                  <td>
                    {item.preferencias
                      ? item.preferencias.split(';').map((pref, idx) => (
                          <span key={idx} className="badge bg-info text-dark me-1 mb-1 rounded-pill px-3">{pref}</span>
                        ))
                      : <span className="text-muted">-</span>
                    }
                  </td>
                  <td>
                    {item.alergias
                      ? item.alergias.split(';').map((alg, idx) => (
                          <span key={idx} className="badge bg-warning text-dark me-1 mb-1 rounded-pill px-3">{alg}</span>
                        ))
                      : <span className="text-muted">-</span>
                    }
                  </td>
                </tr>
              )))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Lista;