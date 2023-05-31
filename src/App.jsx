import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Auth from "./pages/Home/Auth";

export const AuthContext = createContext(null);

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <AuthContext.Provider
        value={{ isLogin, setIsLogin }}
      >
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/cadastro" element={<Auth />} />
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App