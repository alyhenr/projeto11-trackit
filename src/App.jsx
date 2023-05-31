import { useRoutes } from "react-router-dom";

import Auth from './pages/Home/Auth';

const App = () => {

  const AuthRoutes = useRoutes(["/", "/cadastro"].map(path => ({ path, element: <Auth /> })));

  return (
    <>
      {AuthRoutes}
    </>
  )
}

export default App;