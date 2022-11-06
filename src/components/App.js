import Navbar from "./navbar/Navbar";
import cl from './App.module.scss'
import {BrowserRouter} from "react-router-dom";
import AppRoute from "./AppRoute";

function App() {
  return (
      <BrowserRouter>
          <div className={cl.app}>
              <Navbar/>
              <AppRoute/>
          </div>
      </BrowserRouter>
  );
}

export default App;
