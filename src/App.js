import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Browse from "./pages/Browse";
import Register from "./pages/Register";
import Error from "./components/Error.js";

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
