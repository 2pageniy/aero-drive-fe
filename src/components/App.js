import Navbar from "./Navbar/Navbar";
import cl from './App.module.scss'
import {BrowserRouter} from "react-router-dom";
import AppRoute from "./AppRoute";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {auth} from "../http/user";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth())
    }, [])

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
