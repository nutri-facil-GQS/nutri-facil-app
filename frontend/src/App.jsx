import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Imc from './pages/Imc'
import CadastrarDieta from './pages/CadastrarDieta'
import Lista from './pages/Lista'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'

function AppContent() {
  const location = useLocation();

  // Se estiver na rota /login, renderiza só o Login
  if (location.pathname === '/login') {
    return <Login />;
  }

  // Caso contrário, renderiza o layout da aplicação
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3" style={{ marginLeft: 220 }}>
        <Routes>
          <Route path="/" element={<Lista />} />
          <Route path="/imc" element={<Imc />} />
          <Route path="/cadastrar-dieta" element={<CadastrarDieta />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App
 