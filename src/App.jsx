import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

import Auth from './pages/Home/Auth';
import Today from "./pages/Today/Today";
import Habits from "./pages/Habits/Habits";
import History from "./pages/History/History";

export const DataContext = createContext({});

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  console.log(userInfo);
  return (
    <>
      <DataContext.Provider value={{ userInfo, setUserInfo }}>
        <Routes>
          {["/", "cadastro"].map((path, index) => (
            <Route path={path} element={<Auth />} key={index} />
          ))}
          <Route path="hoje" element={<Today />} />
          <Route path="habitos" element={<Habits />} />
          <Route path="historico" element={<History />} />
        </Routes>
      </DataContext.Provider>
    </>
  )
}

export default App;