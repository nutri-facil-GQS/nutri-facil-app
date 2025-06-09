import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import './App.css'

import Imc from './pages/Imc'
import CadastrarDieta from './pages/CadastrarDieta'
import Lista from './pages/Lista'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Agua from './pages/Agua' 
import Tmb from './pages/Tmb'

function ProtectedRoute({ children }) {
  const { email } = useAuth();
  const location = useLocation();

  if (!email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();
  const { email } = useAuth();

  // Se estiver na rota /login, renderiza só o Login
  if (location.pathname === '/login') {
    if (email) {
      return <Navigate to="/" replace />;
    }
    return <Login />;
  }

  // Caso contrário, renderiza o layout da aplicação
  return (
    <ProtectedRoute>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3" style={{ marginLeft: 220 }}>
          <Routes>
            <Route path="/" element={<Lista />} />
            <Route path="/imc" element={<Imc />} />
            <Route path="/cadastrar-dieta" element={<CadastrarDieta />} />
            <Route path="/agua" element={<Agua />} />
            <Route path="/tmb" element={<Tmb />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<AppContent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;