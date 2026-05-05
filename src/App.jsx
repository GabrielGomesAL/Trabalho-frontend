import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Home from "./pages/Home.jsx";
import Listagem from "./pages/Listagem.jsx";
import NaoEncontrada from "./pages/NaoEncontrada.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="listagem" element={<Listagem />} />
        <Route path="inicio" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}
