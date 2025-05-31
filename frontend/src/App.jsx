import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { DashBoard } from "./pages/DashBoard";
import { SendMoney } from "./pages/SendMoney";
import './index.css'
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <>
      <BrowserRouter>
       <ToastContainer />
       <CookiesProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
        </CookiesProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
