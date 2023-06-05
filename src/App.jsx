import { Route, Routes, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import Auth from './pages/Home/Auth';
import Today from "./pages/Today/Today";
import Habits from "./pages/Habits/Habits";
import History from "./pages/History/History";
import HabitsWrapper from "./components/LoggedUser/HabitsWrapper";

export const DataContext = createContext({});

const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem('trackIt_userdata');
    if (loggedUser) {
      setUserInfo(JSON.parse(loggedUser));
      //Check if the user was alreay logged in and redirect to /hoje page
      if (loggedUser.token
        && (window.location.pathname === "/" || window.location.pathname === "/cadastro")) {
        navigate('/hoje');
      }
    } else if (window.location.pathname !== "/" && window.location.pathname !== "/cadastro") { navigate("/") }
  }, []);

  return (
    <>
      <DataContext.Provider value={{ userInfo, setUserInfo }}>
        <Routes>
          {["/", "cadastro"].map((path, index) => (
            <Route path={path} element={<Auth />} key={index} />
          ))}
          <Route path="hoje" element={<HabitsWrapper><Today /></HabitsWrapper>} />
          <Route path="habitos" element={<HabitsWrapper><Habits /></HabitsWrapper>} />
          <Route path="historico" element={<HabitsWrapper><History /></HabitsWrapper>} />
        </Routes>
      </DataContext.Provider>
    </>
  );
};

export default App;