import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sensors from "./pages/Sensors";
import Alerts from "./pages/Alerts";
import Incidents from "./pages/Incidents";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sensors" element={<Sensors />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/incidents" element={<Incidents />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}

export default App;