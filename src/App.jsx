import Form from "./pages/Form";
import "./App.css";
import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import CheckInPage from "./pages/CheckInPage";

function App() {
  return (
    <>
      <Routes>
        {/* Auth pages without Navbar and Footer */}
        <Route path="" element={<Form />} />
        <Route path="/check-in" element={<CheckInPage />} />
      </Routes>

      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
