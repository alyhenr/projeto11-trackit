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
    if (Object.keys({ ...localStorage }).length) {
      // The data from the user was saved in a specif way (adding the -trackIt identifier) so that
      // with there's more local data stored it will not be added to the user info that this app handles,
      // consequently, when retrieving the data from the local storage, it's possible to filter only the data needed,
      // which now is easy, since the indentifier was added, but we need to convert the keys name to the format 
      // asked by the API:
      const userDataArr = Object.keys({ ...localStorage })
        .filter(key => key.includes("trackIt"))
        .map(key => key.split("-")[0])

      const userData = {};
      userDataArr.forEach(cleanedKey => { userData[cleanedKey] = localStorage.getItem(`${cleanedKey}-trackIt`) });
      setUserInfo({ ...userData });
      if (userData.token
        && (window.location.pathname === "/"
          || window.location.pathname === "/hoje")) {
        navigate('/hoje');
      }
    }
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
  )
}

export default App;