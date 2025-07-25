import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Pacientes } from "./pages/Pacientes";
import { Agendamentos } from "./pages/Agendamentos";
import { Medicos } from "./pages/Medicos";
import { Consultas } from "./pages/Consultas";
import { Cadastro } from "./pages/Cadastro";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota independente para cadastro (sem layout) */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas com layout padrão */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/pacientes" element={<Pacientes />} />
                <Route path="/agendamentos" element={<Agendamentos />} />
                <Route path="/medicos" element={<Medicos />} />
                <Route path="/consultas" element={<Consultas />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
