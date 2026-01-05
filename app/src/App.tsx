import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Inventory } from "./pages/Inventory";
import { TestConnection } from "./pages/TestConnection";
import { AddEditInventory } from "./pages/AddEditInventory";
import { Projects } from "./pages/Projects";
import { AddEditProject } from "./pages/AddEditProject";
import { ProjectDetails } from "./pages/ProjectDetails";
import { ProjectTemplates } from "./pages/ProjectTemplates";
import { AddEditProjectTemplate } from "./pages/AddEditProjectTemplate";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/new" element={<AddEditInventory />} />
        <Route path="/inventory/:id" element={<AddEditInventory />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new" element={<AddEditProject />} />
        <Route path="/projects/:id/edit" element={<AddEditProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/templates" element={<ProjectTemplates />} />
        <Route path="/templates/new" element={<AddEditProjectTemplate />} />
        <Route
          path="/templates/:id/edit"
          element={<AddEditProjectTemplate />}
        />
        <Route path="/test" element={<TestConnection />} />
      </Routes>
    </Layout>
  );
}

export default App;
