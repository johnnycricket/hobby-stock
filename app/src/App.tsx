import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Inventory } from "./pages/Inventory";
import { TestConnection } from "./pages/TestConnection";
import { AddEditInventory } from "./pages/AddEditInventory";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/new" element={<AddEditInventory />} />
        <Route path="/test" element={<TestConnection />} />
      </Routes>
    </Layout>
  );
}

export default App;
